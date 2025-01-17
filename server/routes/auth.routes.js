import express from "express";
import {
  getUser,
  registerUser,
  SignInUser,
  logoutUser,
  sendEmailOtp,
} from "../controllers/user.controller.js";
import {
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidator.js";
import { tokenAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", tokenAuthentication, getUser);
router.post("/register", signUpValidation, registerUser);
router.post("/login", signInValidation, SignInUser);
router.post("/logout", logoutUser);
router.post("/send-email-otp", sendEmailOtp);

export default router;
