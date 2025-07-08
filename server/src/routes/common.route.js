const router = require("express").Router();
const controller = require("../controllers/common.controller");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/multer");

router.get(
  "/get-profile",
  userAuthentication,
  controller.getProfile.bind(controller)
);
router.put(
  "/update-profile",
  userAuthentication,
  upload.fields([{ name: "image", maxCount: 1 }]),
  controller.updateProfile.bind(controller)
);

module.exports = router;
