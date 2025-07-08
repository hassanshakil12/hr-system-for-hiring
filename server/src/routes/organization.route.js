const router = require("express").Router();
const controller = require("../controllers/organization.controller");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/multer");

router.post(
  "/create-job",
  userAuthentication,
  controller.createJob.bind(controller)
);
router.get(
  "/get-jobs",
  userAuthentication,
  controller.getAllJobs.bind(controller)
);
router.get(
  "/get-job/:id",
  userAuthentication,
  controller.getJobById.bind(controller)
);
router.put(
  "/update-job/:id",
  userAuthentication,
  controller.updateJob.bind(controller)
);
router.delete(
  "/delete-job/:id",
  userAuthentication,
  controller.deleteJob.bind(controller)
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
router.get(
  "/get-recruiters",
  userAuthentication,
  controller.getRecruiters.bind(controller)
);
router.get(
  "/get-recruiter/:id",
  userAuthentication,
  controller.getRecruiterById.bind(controller)
);
router.post(
  "/send-request/:recruiterId",
  userAuthentication,
  controller.sendRequestToRecruiter.bind(controller)
);
router.get(
  "/get-accepted-requests",
  userAuthentication,
  controller.getAcceptedRequests.bind(controller)
);

module.exports = router;
