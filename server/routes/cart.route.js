const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const { authToken } = require("../middlewares/authToken");

router.route("/add-to-cart").post(authToken, cartController.addToCart);
router.route("/get-cart").get(authToken, cartController.getCart);
router
    .route("/update-quantity")
    .patch(authToken, cartController.updateQuantity);
router.route("/remove-product").patch(authToken, cartController.removeProduct);
router.route("/clear-cart").patch(authToken, cartController.clearCart);
router
    .route("/remove-items")
    .patch(authToken, cartController.removeItemsFromCart);

module.exports = router;
