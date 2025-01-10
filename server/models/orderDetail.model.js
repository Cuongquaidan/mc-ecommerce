const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    selling: {
        type: Number,
        required: true,
    },
    sellingPriceAfterPromo: {
        type: Number,
    },
});

const orderDetailModel =
    mongoose.models.orderDetail ||
    mongoose.model("orderDetail", orderDetailSchema);

module.exports = orderDetailModel;
