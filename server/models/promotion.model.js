const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    discountType: {
        type: String,
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    isExp: {
        type: Boolean,
        default: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
        },
    ],
    brands: [
        {
            type: String,
        },
    ],
    promotionType: {
        type: String,
        required: true,
    },
});

const PromotionModel =
    mongoose.models.promotion || mongoose.model("promotion", promotionSchema);

module.exports = PromotionModel;
