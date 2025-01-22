const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authToken } = require("../middlewares/authToken");

router.route("/create").post(authToken, orderController.createOrder);
router.route("/get").get(authToken, orderController.getOrders);
router
    .route("/getOrdersByAdmin")
    .get(authToken, orderController.getOrdersByAdmin);

module.exports = router;
