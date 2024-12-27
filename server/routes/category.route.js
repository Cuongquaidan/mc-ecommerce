const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.route("/add-category").post(categoryController.addCategory);
router.route("/get-categories").get(categoryController.getAllCategories);

module.exports = router;
