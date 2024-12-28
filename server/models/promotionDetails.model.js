const mongoose = require("mongoose");

const promotionDetailsSchema = new mongoose.Schema({
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "promotion",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

const PromotionDetailsModel =
    mongoose.models.promotionDetails ||
    mongoose.model("promotionDetails", promotionDetailsSchema);

module.exports = PromotionDetailsModel;
