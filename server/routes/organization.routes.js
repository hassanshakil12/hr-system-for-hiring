import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getOrganizationJobs,
  createJob,
  getJobById,
  getAllJobApplications,
  getJobApplicationById,
  getJobApplications,
  getRecruiters,
  getRecruiterById,
  hireRecruiter,
  getRequestStatus,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.get("/jobs", tokenAuthentication, getOrganizationJobs);
router.post("/add-job", tokenAuthentication, createJob);
router.get("/:jobId", tokenAuthentication, getJobById);

router.get("/applications", tokenAuthentication, getAllJobApplications);
router.get("/:applicationId", tokenAuthentication, getJobApplicationById);
router.get("/applications/:jobId", tokenAuthentication, getJobApplications);

router.get("/recruiters", tokenAuthentication, getRecruiters);
router.get("/recruiter/:recruiterId", tokenAuthentication, getRecruiterById);
router.post("/hire", tokenAuthentication, hireRecruiter);
router.get("/request/:requestId", tokenAuthentication, getRequestStatus);

export default router;