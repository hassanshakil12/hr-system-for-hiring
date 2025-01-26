import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getJobs,
  applyForJob,
  getJobById,
  getApplications,
} from "../controllers/candidate.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/jobs", tokenAuthentication, getJobs);
router.get("/job/:id", tokenAuthentication, getJobById);
router.post(
  "/apply-for-job",
  tokenAuthentication,
  upload.single("cv"),
  applyForJob
);
router.get("/applications", tokenAuthentication, getApplications);

export default router;
