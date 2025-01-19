import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import { getJobs, applyForJob } from "../controllers/candidate.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", tokenAuthentication, getJobs);
router.post(
  "/apply-for-job",
  tokenAuthentication,
  upload.single("cv"),
  applyForJob
);

export default router;
