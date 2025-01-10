const mongoose = require("mongoose");
const { paymentMethods } = require("../constants/paymentMethods");
const { shippingStatus } = require("../constants/shippingStatus");
const { paymentStatus } = require("../constants/paymentStatus");
const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        shippingStatus: {
            type: String,
            default: shippingStatus.PREPARING,
        },
        paymentStatus: {
            type: String,
            default: paymentStatus.PENDING,
        },
        paymentMethod: {
            type: String,
            required: true,
            default: paymentMethods.COD,
        },
    },
    {
        timestamps: true,
    }
);

const orderModel =
    mongoose.models.order || mongoose.model("order", orderSchema);

module.exports = orderModel;
