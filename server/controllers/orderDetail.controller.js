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
        console.log(user);
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
async function getOrderDetailsByMonthAndYear(req, res) {
    try {
        const { month, year } = req.query;
        const user = req.user;
        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false,
            });
        }

        // Validate month and year input
        if (!month || !year) {
            return res.status(400).json({
                message: "Month and year are required.",
                error: true,
                success: false,
            });
        }

        // Calculate the start and end dates for the given month and year
        const startDate = new Date(year, month - 1, 1); // Month is zero-based
        const endDate = new Date(year, month, 0); // Last day of the month

        // Fetch order details and populate references
        const categoryQuantities = await orderDetailModel.aggregate([
            // Lookup product details to get the category
            {
                $lookup: {
                    from: "products", // Name of the products collection
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails", // Decompose array from $lookup
            },
            // Match orders within the specified date range
            {
                $lookup: {
                    from: "orders",
                    localField: "order",
                    foreignField: "_id",
                    as: "orderInfo",
                },
            },
            {
                $unwind: "$orderInfo",
            },
            {
                $match: {
                    "orderInfo.createdAt": {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
        ]);

        return res.status(200).json({
            message: "Order details retrieved successfully.",
            error: false,
            success: true,
            data: categoryQuantities,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error.message ||
                "An error occurred while fetching order details.",
            error: true,
            success: false,
        });
    }
}

module.exports = {
    createOrderDetails,
    getOrderDetailsByOrderId,
    getOrderDetailsByMonthAndYear,
};
