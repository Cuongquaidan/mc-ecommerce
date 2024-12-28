const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        productName: String,
        brandName: String,
        category: String,
        productImages: [],
        description: String,
        price: Number,
        selling: Number,
    },
    {
        timestamps: true,
    }
);

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
