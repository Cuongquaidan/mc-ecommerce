const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotion.controller");
const { authToken } = require("../middlewares/authToken");

router
    .route("/add-promotion")
    .post(authToken, promotionController.addPromotion);
router.route("/get-all").get(promotionController.getAllPromotions);
router
    .route("/disabled")
    .patch(authToken, promotionController.disabledPromotion);

router.route("/get-promotion").get(promotionController.getPromotion);

module.exports = router;
