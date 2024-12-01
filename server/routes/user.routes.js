import express from "express";
import { getUser, registerUser } from "../controllers/user.controller.js"
import { signUpValidation, signInValidation } from "../middlewares/authValidator.js";

const router = express.Router();

router.get("/", getUser);
router.post("/register", signUpValidation, registerUser)

export default router;
