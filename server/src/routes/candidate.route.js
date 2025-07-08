const router = require("express").Router();
const controller = require("../controllers/candidate.controller");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/multer");

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
router.post(
  "/apply-job/:id",
  userAuthentication,
  upload.fields([{ name: "cv", maxCount: 1 }]),
  controller.applyForJob.bind(controller)
);
router.get(
  "/get-applications",
  userAuthentication,
  controller.getAllApplications.bind(controller)
);
router.get(
  "/get-application/:id",
  userAuthentication,
  controller.getApplicationById.bind(controller)
);

module.exports = router;
