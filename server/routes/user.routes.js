import express from "express";
import { getUser, registerUser } from "../controllers/user.controller.js"

const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser)

export default router;
