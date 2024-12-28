const express = require("express");
const router = express.Router();
const promotionDetailsController = require("../controllers/promotionDetail.controller");

router
    .route("/get-promotion-details")
    .get(promotionDetailsController.getAllTop1PromotionDetailOfAllProduct);

module.exports = router;
