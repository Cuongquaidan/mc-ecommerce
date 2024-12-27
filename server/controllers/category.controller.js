const categoryModel = require("../models/category.model");

async function addCategory(req, res) {
    try {
        const newCategory = new categoryModel(req.body);
        const category = await newCategory.save();
        return res.status(201).json({
            message: "Category added successfully",
            error: false,
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await categoryModel.find();
        return res.status(200).json({
            message: "All categories",
            error: false,
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            message: error || error.message,
            error: true,
            success: false,
        });
    }
}

module.exports = { addCategory, getAllCategories };
