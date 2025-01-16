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

async function getOrderDetailsByOrderId(req, res) {
    try {
        const orderId = req.params.orderId;
        const user = req.user;
        const orderDetails = await orderDetailModel
            .find({ order: orderId })
            .populate("product");
        if (user._id !== orderDetails[0].order.user && user.role !== "admin") {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Order details successfully",
            error: false,
            success: true,
            data: orderDetails,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = { createOrderDetails, getOrderDetailsByOrderId };
