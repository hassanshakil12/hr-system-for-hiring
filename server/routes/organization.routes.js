import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getOrganization,
  createJob,
  getJobById,
  getJobApplications,
  getRecruiters,
  getRecruiterById,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, getOrganization);
router.post("/add-job", tokenAuthentication, createJob);
router.get("/:jobId", tokenAuthentication, getJobById);
router.get("/applications/:jobId", tokenAuthentication, getJobApplications);

router.get("/recruiters", tokenAuthentication, getRecruiters);
router.get("/recruiter/:recruiterId", tokenAuthentication, getRecruiterById);

export default router;
