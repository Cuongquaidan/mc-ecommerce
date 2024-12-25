const express = require("express");
const productRoute = require("../routes/product.route");
const userRoute = require("../routes/user.route");
const cartRoute = require("../routes/cart.route");
const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);

module.exports = router;
