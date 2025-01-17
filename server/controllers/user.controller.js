import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Candidate from "../models/candidate.model.js";
import Recruiter from "../models/recruiter.model.js";
import Organization from "../models/organization.model.js";
import { generateOtp, saveOtp, verifyOtp } from "../utils/otpHelper.js";
import sendMail from "../utils/emailHelper.js";

const getModel = (entityType) => {
  switch (entityType) {
    case "candidate":
      return Candidate;
    case "recruiter":
      return Recruiter;
    case "organization":
      return Organization;
    default:
      return null;
  }
};

const getUser = (req, res) => {
  try {
    console.log("Hello World", req.user);
    res.status(200).json({ message: `All good` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Not Responding" });
  }
};

const registerUser = async (req, res) => {
  const { entityType, username, email, password } = req.body;
  const Model = getModel(entityType);

  if (!Model) {
    return res
      .status(404)
      .json({ message: "Invalid Entity Type", success: false });
  }

  try {
    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: `${existingUser.username} already exists with the give email!!!`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Model.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: `Registeration Successful ${newUser}`, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const SignInUser = async (req, res) => {
  const { email, password, entityType } = req.body;
  // const Model = User;
  const Model = getModel(entityType);
  const errMsg = "Login Failed!!! Email/Password is incorrect...";

  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const JWTSecret = process.env.JWT_SECRET || "localhost";

    const jwtToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        _id: user._id,
        entityType: user.entityType,
      },
      JWTSecret,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      message: `Login Successful`,
      success: true,
      jwtToken,
      _id: user._id,
      email,
      username: user.username,
      entityType: user.entityType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Logout failed!", success: false });
      }
      
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful!", success: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const sendEmailOtp = async (req, res) => {
  const { email, entityType } = req.body;

  try {
    const otp = generateOtp();
    await saveOtp(email, otp, entityType);
    sendMail(email, "Email verification OTP", `Your OTP is: ${otp}`);

    return res
      .status(200)
      .json({ message: `OTP sent successfully`, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { getUser, registerUser, SignInUser, logoutUser, sendEmailOtp };
