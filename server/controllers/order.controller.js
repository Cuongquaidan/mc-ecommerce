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
            firstDetail: orderDetails[0],
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
        const orders = await orderModel
            .find({ user: user._id })
            .populate("firstDetail.product")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Get orders successfully",
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
async function getOrdersByAdmin(req, res) {
    try {
        const user = req.user;
        const { page, limit } = req.query;
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized",
                error: true,
                success: false,
            });
        }
        const orders = await orderModel
            .find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            message: "Get orders successfully",
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

module.exports = { createOrder, getOrders, getOrdersByAdmin };
