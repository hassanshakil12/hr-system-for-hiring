const { handlers } = require("../utils/handlers");
const sendEmail = require("../config/nodemailer");

class Service {
  constructor() {
    this.user = require("../models/User.model");
    this.job = require("../models/Job.model");
    this.application = require("../models/Application.model");
    this.request = require("../models/Request.model");
  }

  async getProfile(req, res) {
    try {
      const user = req.user;
      if (!user._id) {
        return handlers.response.unauthorized({
          res,
          message: "User not authenticated.",
        });
      }

      const profile = await this.user.findById(user._id).select("-password");

      if (!profile) {
        return handlers.response.unavailable({
          res,
          message: "Profile not found.",
        });
      }

      return handlers.response.success({
        res,
        message: "Profile retrieved successfully.",
        data: profile,
      });
    } catch (error) {
      handlers.logger.failed({ message: error });
      return handlers.response.failed({ res, message: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = req.user;

      if (!user || !user._id) {
        return handlers.response.unauthorized({
          res,
          message: "User not authenticated.",
        });
      }

      const allowedFields = [
        "fullName",
        "username",
        "email",
        "phoneNumber",
        "address",
        "bio",
        "age",
        "gender",
        "image",
        "isNotification",
      ];

      const updateData = {};

      // Filter only allowed fields from req.body
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          updateData[key] = req.body[key];
        }
      }

      // ❌ Duplication Check
      const duplicateFields = [];
      const checkFields = ["email", "username", "phoneNumber"];

      for (const field of checkFields) {
        if (updateData[field]) {
          const existing = await this.user.findOne({
            [field]: updateData[field],
            _id: { $ne: user._id }, // exclude current user
          });

          if (existing) duplicateFields.push(field);
        }
      }

      if (duplicateFields.length > 0) {
        return handlers.response.unavailable({
          res,
          message: `The following fields are already in use: ${duplicateFields.join(
            ", "
          )}`,
        });
      }

      // ✅ Handle image file if uploaded (via multer)
      if (req.files?.image?.[0]) {
        const file = req.files.image[0];
        const folder = file.uploadFolder;
        const filename = file.savedFilename;
        updateData.image = `uploads/${folder}/${filename}`.replace(/\\/g, "/");
      }

      const updatedUser = await this.user
        .findByIdAndUpdate(user._id, updateData, {
          new: true,
          runValidators: true,
        })
        .select("-password");

      if (!updatedUser) {
        return handlers.response.unavailable({
          res,
          message: "User not found or update failed.",
        });
      }

      return handlers.response.success({
        res,
        message: "Profile updated successfully.",
        data: updatedUser,
      });
    } catch (error) {
      handlers.logger.failed({
        message: error,
      });

      return handlers.response.failed({
        res,
        message: "Something went wrong while updating profile.",
        error: error.message,
      });
    }
  }
}

module.exports = new Service();
