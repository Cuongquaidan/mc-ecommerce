const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

// Add to cart

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user;

        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Product not found",
            });
        }

        const cart = await CartModel.findOne({ user: user._id });

        if (!cart) {
            const newCart = new CartModel({
                user: user._id,
                products: [{ product: productId, quantity: quantity }],
            });

            await newCart.save();

            return res.status(201).json({
                error: false,
                success: true,
                data: newCart,
                message: "Product added to cart",
            });
        }

        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );

        if (productIndex > -1) {
            return res.status(500).json({
                error: true,
                success: false,
                data: [],
                message: "Product already exists in cart",
            });
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }

        await cart.save();

        return res.status(200).json({
            error: false,
            success: true,
            data: cart,
            message: "Product added to cart",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: [],
            message: error.message || error,
        });
    }
};

const getCart = async (req, res) => {
    try {
        const user = req.user;

        const cart = await CartModel.findOne({ user: user._id }).populate(
            "products.product"
        );

        if (!cart) {
            return res.status(404).json({
                error: false,
                success: true,
                data: [],
                message: "Cart is empty",
            });
        }
        const numOfProducts = cart.products.length;

        return res.status(200).json({
            error: false,
            success: true,
            data: { ...cart._doc, numOfProducts },
            message: "Cart fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: [],
            message: error.message || error,
        });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user;

        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Product not found",
            });
        }

        const cart = await CartModel.findOne({ user: user._id });

        if (!cart) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Cart not found",
            });
        }

        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Product not found in cart",
            });
        }

        cart.products[productIndex].quantity = quantity;

        await cart.save();

        return res.status(200).json({
            error: false,
            success: true,
            data: cart,
            message: "Quantity updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: [],
            message: error.message || error,
        });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Product not found",
            });
        }

        const cart = await CartModel.findOne({ user: user._id });

        if (!cart) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Cart not found",
            });
        }

        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                error: true,
                success: false,
                data: [],
                message: "Product not found in cart",
            });
        }

        cart.products.splice(productIndex, 1);

        await cart.save();

        return res.status(200).json({
            error: false,
            success: true,
            data: cart,
            message: "Product removed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: [],
            message: error.message || error,
        });
    }
};

module.exports = { addToCart, getCart, updateQuantity, removeProduct };
