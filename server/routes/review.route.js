const reviewController = require("../controllers/review.controller");

const router = require("express").Router();

router.post("/create", reviewController.createReview);
router.get("/product/:productId", reviewController.getReviewsByProductId);

module.exports = router;
