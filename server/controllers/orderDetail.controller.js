const orderDetailModel = require("../models/orderDetail.model");
const productModel = require("../models/product.model");
async function createOrderDetails(orderDetails, orderId) {
    try {
        orderDetails.forEach(async (orderDetail) => {
            const newOrderDetail = new orderDetailModel({
                order: orderId,
                product: orderDetail.product,
                quantity: orderDetail.quantity,
                selling: orderDetail.selling,
                sellingPriceAfterPromo: orderDetail.sellingPriceAfterPromo,
            });
            await newOrderDetail.save();
            await productModel.findByIdAndUpdate(orderDetail.product, {
                $inc: {
                    numSold: orderDetail.quantity,
                    stock: -orderDetail.quantity,
                },
            });
        });
    } catch (error) {
        return error;
    }
}

module.exports = { createOrderDetails };
