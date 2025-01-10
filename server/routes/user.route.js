const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/authToken");
const userController = require("../controllers/user.controller");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/get-info").get(authToken, userController.getInfo);
router.route("/get-all").get(authToken, userController.getAll);
router.route("/logout").get(userController.logout);
router.route("/update/:userId").patch(authToken, userController.updateUser);
router.route("/update-info").patch(authToken, userController.updateUserInfo);
module.exports = router;
