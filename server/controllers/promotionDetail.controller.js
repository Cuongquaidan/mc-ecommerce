const PromotionDetailModel = require("../models/promotionDetails.model");
const promotionModel = require("../models/promotion.model");
async function removeDetailsExp() {
    try {
        const currentDate = new Date();

        const result = await PromotionDetailModel.deleteMany({
            promotion: {
                $in: await promotionModel
                    .find({
                        endDate: { $lt: currentDate },
                    })
                    .distinct("_id"), // Lấy danh sách các _id của Promotion hết hạn
            },
        });

        return;
    } catch (error) {
        console.error("Error removing expired promotion details:", error);
        throw error;
    }
}

async function getAllTop1PromotionDetailOfAllProduct(req, res) {
    try {
        // await removeDetailsExp();
        const promotionDetails = await PromotionDetailModel.aggregate([
            {
                $lookup: {
                    from: "products", // Tên collection Product
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $lookup: {
                    from: "promotions", // Tên collection Promotion
                    localField: "promotion",
                    foreignField: "_id",
                    as: "promotion",
                },
            },
            {
                $unwind: "$product", // Giải nén mảng product
            },
            {
                $unwind: "$promotion", // Giải nén mảng promotion
            },
            {
                $group: {
                    _id: "$product._id", // Nhóm theo sản phẩm
                    promotionDetail: { $first: "$$ROOT" }, // Lấy bản ghi có discount cao nhất
                },
            },
            {
                $replaceRoot: { newRoot: "$promotionDetail" }, // Thay thế root bằng promotionDetail
            },
            {
                $sort: { "promotion.discount": -1 }, // Sắp xếp theo giá trị giảm giá
            },
        ]);
        return res.status(200).json({
            message: "Top promotions for all products",
            error: false,
            success: true,
            data: promotionDetails,
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
    getAllTop1PromotionDetailOfAllProduct,
    removeDetailsExp,
};
