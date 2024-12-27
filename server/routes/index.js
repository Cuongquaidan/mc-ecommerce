const express = require("express");
const productRoute = require("../routes/product.route");
const userRoute = require("../routes/user.route");
const cartRoute = require("../routes/cart.route");
const categoryRoute = require("../routes/category.route");
const promotionRoute = require("../routes/promotion.route");
const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
router.use("/categories", categoryRoute);
router.use("/promotions", promotionRoute);

module.exports = router;
