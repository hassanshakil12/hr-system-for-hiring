const { handlers } = require("../utils/handlers");
const bcrypt = require("bcrypt");
const sendEmail = require("../config/nodemailer");
const { generateToken } = require("../utils/generators");

class Service {
  constructor() {
    this.user = require("../models/User.model");
  }

  async signUp(req, res) {
    try {
      const {
        fullName,
        address,
        bio,
        role,
        age,
        gender,
        username,
        email,
        password,
        phoneNumber,
      } = req.body;

      // Validate required fields
      if (
        !username ||
        !email ||
        !password ||
        !phoneNumber ||
        !["candidate", "organization", "recruiter"].includes(role)
      ) {
        return handlers.response.error({
          res,
          message:
            "Username, Email, Password, and Phone Number are required...",
        });
      }

      if (gender && !["Male", "Female", "Other"].includes(gender)) {
        return handlers.response.error({
          res,
          message: "Invalid Gender",
        });
      }

      // Check if user already exists
      let user = await this.user.findOne({
        $or: [{ email }, { username }, { phoneNumber }],
      });

      if (user) {
        return handlers.response.error({
          res,
          message: "User already exists...",
        });
      }

      // Handle profile image upload
      let image;
      if (req.files?.image?.[0]) {
        const file = req.files.image[0];
        const folder = file.uploadFolder;
        const filename = file.savedFilename;
        image = `uploads/${folder}/${filename}`.replace(/\\/g, "/");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      user = new this.user({
        fullName,
        address,
        bio,
        role,
        age,
        gender,
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        image,
      });

      user.isCompleted = true;
      // Save user
      await user.save();

      // Send welcome email
      const mailOptions = {
        to: email,
        subject: "Welcome to Our Service",
        text: `Hello ${username},\n\nThank you for signing up! Your account has been created successfully.\n\nBest regards,\nTeam`,
        html: `<p>Hello ${username},</p><p>Thank you for signing up! Your account has been created successfully.</p><p>Best regards,<br>Team</p>`,
      };

      await sendEmail(mailOptions);

      return handlers.response.success({
        res,
        message: "User registered successfully...",
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "API", message: error.message });
      return handlers.response.failed({
        res,
        message: error.message,
      });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return handlers.response.error({
          res,
          message: "All fields are required...",
        });
      }

      let user = await this.user.findOne({ email });

      if (!user) {
        return handlers.response.unavailable({
          res,
          message: "User not found...",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return handlers.response.error({
          res,
          message: "Invalid credentials...",
        });
      }

      user.userAuthToken = generateToken(user._id, user.role);
      await user.save();

      return handlers.response.success({
        res,
        message: "Login successful...",
        data: {
          userAuthToken: user.userAuthToken,
          role: user.role,
        },
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "API", message: error.message });
      return handlers.response.failed({
        res,
        message: error.message,
      });
    }
  }

  async signOut(req, res) {
    try {
      if (!req.user) {
        return handlers.response.unauthorized({
          res,
          message: "Unauthorized access...",
        });
      }

      req.user.userAuthToken = null;
      await req.user.save();

      return handlers.response.success({
        res,
        message: "Logout successful...",
      });
    } catch (error) {
      handlers.logger.failed({ objectType: "API", message: error.message });
      return handlers.response.failed({
        res,
        message: error.message,
      });
    }
  }
}

module.exports = new Service();
