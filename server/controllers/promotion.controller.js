const PromotionModel = require("../models/promotion.model");

async function addPromotion(req, res) {
    try {
        const newPromotion = new PromotionModel(req.body);
        const promotion = await newPromotion.save();
        return res.status(201).json({
            message: "Promotion added successfully",
            error: false,
            success: true,
            data: promotion,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getAllPromotions(req, res) {
    try {
        const promotions = await PromotionModel.find();

        console.log(promotions);

        return res.status(200).json({
            message: "All promotions",
            error: false,
            success: true,
            data: promotions,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function disabledPromotion(req, res) {
    try {
        const promotionId = req.params.id;
        const promotion = await PromotionModel.findById(promotionId);
        promotion.disabled = !promotion.disabled;
        await promotion.save();
        return res.status(200).json({
            message: "Promotion disabled successfully",
            error: false,
            success: true,
            data: promotion,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getPromotion(req, res) {
    try {
        const promotionType = req.query.type;
        console.log(promotionType);
        const promotions = await PromotionModel.find({ promotionType })
            .populate("brands") // Populate thông tin từ bảng `BrandModel`
            .populate("categories") // Populate thông tin từ bảng `CategoryModel`
            .populate("products"); // Populate thông tin từ bảng `ProductModel`

        console.log(promotions);
        return res.status(200).json({
            message: "All promotions",
            error: false,
            success: true,
            data: promotions,
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
    addPromotion,
    getAllPromotions,
    disabledPromotion,
    getPromotion,
};
