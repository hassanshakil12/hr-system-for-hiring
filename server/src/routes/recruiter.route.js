const router = require("express").Router();
const controller = require("../controllers/recruiter.controller");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/multer");

router.get(
  "/get-requests",
  userAuthentication,
  controller.getHiringRequests.bind(controller)
);
router.get(
  "/get-request/:id",
  userAuthentication,
  controller.getHiringRequestById.bind(controller)
);
router.put(
  "/update-request/:id",
  userAuthentication,
  controller.updateRequestStatus.bind(controller)
);
router.get(
  "/get-accepted",
  userAuthentication,
  controller.getAcceptedRequests.bind(controller)
);
router.get(
  "/get-applications",
  userAuthentication,
  controller.getAllApplications.bind(controller)
);
router.get(
  "/get-applications/:jobId",
  userAuthentication,
  controller.getApplicationsByJobId.bind(controller)
);
router.get(
  "/get-application/:id",
  userAuthentication,
  controller.getApplicationById.bind(controller)
);
router.put(
  "/update-application/:applicationId",
  userAuthentication,
  controller.updateApplicationStatus.bind(controller)
);

module.exports = router;
