import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getOrganization,
  createJob,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, getOrganization);
router.post("/add-job", tokenAuthentication, createJob);

export default router;
