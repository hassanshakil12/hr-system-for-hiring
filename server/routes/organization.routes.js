import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getOrganizationJobs,
  createJob,
  getJobById
} from "../controllers/organization.controller.js";

const router = express.Router();

router.get("/jobs", tokenAuthentication, getOrganizationJobs);
router.post("/add-job", tokenAuthentication, createJob);
router.get("/:jobId", tokenAuthentication, getJobById);

export default router;
