import express from "express";
import {
  getUser,
  registerUser,
  SignInUser,
} from "../controllers/user.controller.js";
import { signUpValidation, signInValidation } from "../middlewares/authValidator.js";
import { tokenAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", tokenAuthentication , getUser);
router.post("/register", signUpValidation, registerUser)
router.post("/signin", signInValidation, SignInUser);

export default router;
