const express = require('express');
const router = express.Router();
const { createProduct, getAllSellerProduct, getAllProduct, deleteProductGallery, getProductById, getProductsBySellerCategory,
    getProductsByCategory, updateProduct, deleteProduct } = require('../../../controllers/ecommerce/products/productController')


router.route("/product-create").post(createProduct)
router.route("/products/:seller_id").get(getAllSellerProduct)
router.route("/products").get(getAllProduct)
router.route("/product/delete-gallery/:product_id/:id").post(deleteProductGallery)
router.route("/product/:id").get(getProductById)
router.route("/products/:seller_id/:category_id").get(getProductsBySellerCategory)
router.route("/products-by-category").get(getProductsByCategory)
router.route("/product/update/:id").put(updateProduct)
router.route("/product/delete/:id").delete(deleteProduct)

module.exports = router /** exporting all routes in a single line */