const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/multer");

router.post(
  "/sign-up",
  upload.fields([{ name: "image", maxCount: 1 }]),
  controller.signUp.bind(controller)
);

router.post("/sign-in", controller.signIn.bind(controller));

router.post(
  "/sign-out",
  userAuthentication,
  controller.signOut.bind(controller)
);

module.exports = router;
