const reviewController = require("../controllers/review.controller");
const { authToken } = require("../middlewares/authToken");

const router = require("express").Router();

router.post("/create", authToken, reviewController.createReview);
router.get("/product/:productId", reviewController.getReviewsByProductId);

module.exports = router;
