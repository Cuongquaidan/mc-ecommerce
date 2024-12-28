const productModel = require("../models/product.model");
const PromotionModel = require("../models/promotion.model");
const PromotionDetailModel = require("../models/promotionDetails.model");
async function addPromotion(req, res) {
    try {
        const newPromotion = new PromotionModel(req.body);
        const promotion = await newPromotion.save();

        if (promotion.promotionType === "ALL PRODUCTS") {
            const products = await productModel.find();
            products.forEach(async (product) => {
                let newDiscount = 0;
                if (promotion.discountType === "percentage") {
                    newDiscount =
                        (product.selling * promotion.discountValue) / 100;
                } else {
                    newDiscount = promotion.discountValue;
                }

                const newPromotionDetail = new PromotionDetailModel({
                    promotion: promotion._id,
                    product: product._id,
                    discount: newDiscount,
                });
                await newPromotionDetail.save();
            });
        } else if (promotion.promotionType === "SPECIFIC CATEGORIES") {
            const products = await productModel.find({
                category: { $in: promotion.categories },
            });
            products.forEach(async (product) => {
                let newDiscount = 0;
                if (promotion.discountType === "percentage") {
                    newDiscount =
                        (product.selling * promotion.discountValue) / 100;
                } else {
                    newDiscount = promotion.discountValue;
                }

                const newPromotionDetail = new PromotionDetailModel({
                    promotion: promotion._id,
                    product: product._id,
                    discount: newDiscount,
                });
                await newPromotionDetail.save();
            });
        } else if (promotion.promotionType === "SPECIFIC BRANDS") {
            const products = await productModel.find({
                brandName: { $in: promotion.brands },
            });
            products.forEach(async (product) => {
                let newDiscount = 0;
                if (promotion.discountType === "percentage") {
                    newDiscount =
                        (product.selling * promotion.discountValue) / 100;
                } else {
                    newDiscount = promotion.discountValue;
                }

                const newPromotionDetail = new PromotionDetailModel({
                    promotion: promotion._id,
                    product: product._id,
                    discount: newDiscount,
                });
                await newPromotionDetail.save();
            });
        } else if (promotion.promotionType === "SPECIFIC PRODUCTS") {
            promotion.products.forEach(async (productId) => {
                const product = await productModel.findById(productId);
                let newDiscount = 0;
                if (promotion.discountType === "percentage") {
                    newDiscount =
                        (product.selling * promotion.discountValue) / 100;
                } else {
                    newDiscount = promotion.discountValue;
                }

                const newPromotionDetail = new PromotionDetailModel({
                    promotion: promotion._id,
                    product: product._id,
                    discount: newDiscount,
                });
                await newPromotionDetail.save();
            });
        }

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
        checkExpiredPromotion();

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
async function checkExpiredPromotion() {
    try {
        const promotions = await PromotionModel.find();
        promotions.forEach(async (promotion) => {
            if (promotion.endDate < new Date()) {
                promotion.isExp = true;
                await promotion.save();
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addPromotion,
    getAllPromotions,
    disabledPromotion,
    getPromotion,
};
