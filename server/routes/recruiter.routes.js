import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import {
  getHiringRequests,
  updateRequestStatus,
} from "../controllers/recruiter.controller.js";

const router = express.Router();

router.get("/requests", tokenAuthentication, getHiringRequests);
router.patch("/requests", tokenAuthentication, updateRequestStatus);

export default router;
