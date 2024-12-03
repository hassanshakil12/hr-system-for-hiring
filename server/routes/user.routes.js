import express from "express";
import {
  getUser,
  registerUser,
  SignInUser,
  sendEmailOtp,
} from "../controllers/user.controller.js";
import { signUpValidation, signInValidation } from "../middlewares/authValidator.js";
import { tokenAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", tokenAuthentication , getUser);
router.post("/register", signUpValidation, registerUser)
router.post("/signin", signInValidation, SignInUser);
router.post("/send-email-otp", sendEmailOtp);

export default router;
