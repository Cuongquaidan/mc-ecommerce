const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authToken } = require("../middlewares/authToken");

router.route("/add-product").post(authToken, productController.addProduct);
router.route("/get-all").get(productController.getAllProducts);
router.route("/update").patch(authToken, productController.updateProduct);
router.route("/getProductCategory").get(productController.getProductCategory);
router
    .route("/getCategoryWiseProduct")
    .post(productController.getCategoryWiseProduct);

router.route("/getProductDetails").post(productController.getProductDetails);
router.route("/search").get(productController.searchProduct);
router.route("/filter").post(productController.filterProduct);
module.exports = router;
