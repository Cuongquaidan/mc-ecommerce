const reviewModel = require("../models/review.model");
const productModel = require("../models/product.model");

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

        const avgRating = await calculateAvgRating(product);
        await productModel.findByIdAndUpdate(product, {
            rating: avgRating,
        });

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
        const numOfRatings = await getNumOfReviewRatings(productId);
        return res.status(200).json({
            message: "Get Reviews successfully",
            error: false,
            success: true,
            data: reviews,
            numOfRatings,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}
async function getNumOfReviewRatings(productId) {
    try {
        const reviews = await reviewModel.find({ product: productId });
        const numOfRatings = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };
        reviews.forEach((review) => {
            numOfRatings[review.rating] += 1;
        });
        return numOfRatings;
    } catch (error) {
        return error;
    }
}

async function calculateAvgRating(productId) {
    try {
        const reviews = await reviewModel.find({ product: productId });
        let totalRating = 0;
        reviews.forEach((review) => {
            totalRating += review.rating;
        });
        const avgRating = totalRating / reviews.length;
        return avgRating;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createReview,
    getReviewsByProductId,
};
