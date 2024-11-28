const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/authToken");
const userController = require("../controllers/user.controller");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/get-info").get(authToken, userController.getInfo);

router.route("/logout").get(userController.logout);

module.exports = router;
