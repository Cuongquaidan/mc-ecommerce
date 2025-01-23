const express = require("express");
const productRoute = require("../routes/product.route");
const userRoute = require("../routes/user.route");
const cartRoute = require("../routes/cart.route");
const categoryRoute = require("../routes/category.route");
const promotionRoute = require("../routes/promotion.route");
const promotionDetailsRoute = require("../routes/promotionDetails.route");
const paymentRoute = require("../routes/payment.route");
const orderRoute = require("../routes/order.route");
const orderDetailRoute = require("../routes/orderDetail.route");
const reviewRoute = require("../routes/review.route");
const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
router.use("/categories", categoryRoute);
router.use("/promotions", promotionRoute);
router.use("/promotion-details", promotionDetailsRoute);
router.use("/payment", paymentRoute);
router.use("/orders", orderRoute);
router.use("/order-details", orderDetailRoute);
router.use("/reviews", reviewRoute);

module.exports = router;
