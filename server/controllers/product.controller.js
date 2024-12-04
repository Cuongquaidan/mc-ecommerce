const { adminPermission } = require("../helper/permission");
const productModel = require("../models/product.model");

async function addProduct(req, res) {
    try {
        // const sessionUserId = req.user._id;

        // if (!adminPermission(sessionUserId)) {
        //     return res.status(401).json({
        //         message: "Unauthorized",
        //         error: true,
        //         success: false,
        //     });
        // }
        console.log(req.body);
        console.log("Pass permission");

        const uploadProduct = new productModel(req.body);
        const newProduct = await uploadProduct.save();

        return res.status(201).json({
            message: "Product added successfully",
            error: false,
            success: true,
            data: newProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "All products",
            error: false,
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}
async function updateProduct(req, res) {
    try {
        const sessionUserId = req.user._id;

        if (!adminPermission(sessionUserId)) {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false,
            });
        }

        const productId = req.body._id;
        console.log(productId);
        console.log(req.body);

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            req.body
        );
        return res.status(200).json({
            message: "Product updated successfully",
            error: false,
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
};
