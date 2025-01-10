const { error } = require("jquery");
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

async function getProductCategory(req, res) {
    try {
        const productCategory = await productModel.distinct("category");

        const productByCategory = [];

        for (category of productCategory) {
            const product = await productModel.findOne({ category: category });
            productByCategory.push(product);
        }

        return res.status(200).json({
            message: "All products by all categories",
            error: false,
            success: true,
            data: productByCategory,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}
async function getCategoryWiseProduct(req, res) {
    try {
        const { category } = req.body;
        const productCategory = await productModel.find({ category: category });
        return res.status(200).json({
            message: "All products by category",
            error: false,
            success: true,
            data: productCategory,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getProductDetails(req, res) {
    try {
        const { productId } = req.body;
        const productDetails = await productModel.findById(productId);
        return res.status(200).json({
            message: "Product details",
            error: false,
            success: true,
            data: productDetails,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function searchProduct(req, res) {
    try {
        const query = req.query.q;

        const regex = new RegExp(query, "i", "g");

        const products = await productModel.find({
            $or: [
                {
                    productName: regex,
                },
                {
                    category: regex,
                },
                {
                    brandName: regex,
                },
                {
                    description: regex,
                },
            ],
        });

        return res.status(200).json({
            message: "All products by search",
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

async function filterProduct(req, res) {
    try {
        const categoryList = req?.body?.category || [];

        const product = await productModel.find({
            category: {
                $in: categoryList,
            },
        });

        return res.json({
            data: product,
            message: "product",
            error: false,
            success: true,
        });
    } catch (err) {
        return res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

async function getBrands(req, res) {
    try {
        const brands = await productModel.distinct("brandName");
        return res.status(200).json({
            message: "All brands",
            error: false,
            success: true,
            data: brands,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function updateSomething(req, res) {
    try {
        const { stock, numSold, numReviews, rating } = req.body;
        const updatedProduct = await productModel.updateMany(
            {},
            {
                $set: {
                    stock,
                    numReviews,
                    numSold,
                    rating,
                },
            }
        );

        return res.status(200).json({
            message: "updated",
            error: false,
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
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
    getProductCategory,
    getCategoryWiseProduct,
    getProductDetails,
    searchProduct,
    filterProduct,
    getBrands,
    updateSomething,
};
