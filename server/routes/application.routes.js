import express from "express";
import { tokenAuthentication } from "../middlewares/auth.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";
import { organizationAuthorization } from "../middlewares/organizationAuthorization.js";
import {
  getAllJobApplications,
  getJobApplicationById,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get(
  "/",
  tokenAuthentication,
  organizationAuthorization,
  getAllJobApplications
);
router.get(
  "/:applicationId",
  tokenAuthentication,
  validateObjectId,
  organizationAuthorization,
  getJobApplicationById
);

export default router;
