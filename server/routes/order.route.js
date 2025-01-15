const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authToken } = require("../middlewares/authToken");

router.route("/create").post(authToken, orderController.createOrder);

module.exports = router;
