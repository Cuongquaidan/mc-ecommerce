const reviewModel = require("../models/review.model");

async function createReview(req, res) {
    try {
        const user = req.user;
        const { product, rating, comment } = req.body;
        const newReview = new reviewModel({
            user,
            product,
            rating,
            comment,
        });
        const nr = await newReview.save();
        return res.status(201).json({
            message: "Review created successfully",
            error: false,
            success: true,
            data: nr,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getReviewsByProductId(req, res) {
    try {
        const type = req.query.type;
        const productId = req.params.productId;
        let reviews = [];
        if (!type || type === "newest") {
            reviews = await reviewModel
                .find({ product: productId })
                .populate("user")
                .sort({ createdAt: -1 });
        } else if (type === "highest") {
            reviews = await reviewModel
                .find({ product: productId })
                .populate("user")
                .sort({ rating: -1 });
        } else if (type === "lowest") {
            reviews = await reviewModel
                .find({ product: productId })
                .populate("user")
                .sort({ rating: 1 });
        } else if (type === "1") {
            reviews = await reviewModel
                .find({ product: productId, rating: 1 })
                .populate("user");
        } else if (type === "2") {
            reviews = await reviewModel
                .find({ product: productId, rating: 2 })
                .populate("user");
        } else if (type === "3") {
            reviews = await reviewModel
                .find({ product: productId, rating: 3 })
                .populate("user");
        } else if (type === "4") {
            reviews = await reviewModel
                .find({ product: productId, rating: 4 })
                .populate("user");
        } else if (type === "5") {
            reviews = await reviewModel
                .find({ product: productId, rating: 5 })
                .populate("user");
        }
        return res.status(200).json({
            message: "Get Reviews successfully",
            error: false,
            success: true,
            data: reviews,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = {
    createReview,
    getReviewsByProductId,
};
