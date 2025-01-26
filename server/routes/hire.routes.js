import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import { organizationAuthorization } from "../middlewares/organizationAuthorization.js";
import {
  getRecruiters,
  getRecruiterById,
  hireRecruiter,
  getRequestStatus,
} from "../controllers/hire.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, organizationAuthorization, getRecruiters);
router.get(
  "/:recruiterId",
  tokenAuthentication,
  organizationAuthorization,
  getRecruiterById
);
router.post(
  "/onboard",
  tokenAuthentication,
  organizationAuthorization,
  hireRecruiter
);
router.get(
  "/request/:requestId",
  tokenAuthentication,
  organizationAuthorization,
  getRequestStatus
);

export default router;
