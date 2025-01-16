const orderModel = require("../models/order.model");
const orderDetailController = require("./orderDetail.controller");
async function createOrder(req, res) {
    try {
        const order = req.body;
        const user = req.user;
        const { orderDetails, ...orderWithNoOD } = order;
        const newOrder = new orderModel({
            ...orderWithNoOD,
            user: user._id,
        });
        const savedOrder = await newOrder.save();
        await orderDetailController.createOrderDetails(
            order.orderDetails,
            savedOrder._id
        );

        return res.status(201).json({
            message: "Order successfully",
            error: false,
            success: true,
            data: savedOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getOrders(req, res) {
    try {
        const user = req.user;
        const orders = await orderModel.find({ user: user._id });
        return res.status(200).json({
            message: "Orders successfully",
            error: false,
            success: true,
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = { createOrder, getOrders };
