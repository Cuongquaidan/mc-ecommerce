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
        stock: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0.0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        numSold: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
