const express = require('express');
const router = express.Router();
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require('../../../controllers/ecommerce/category/categoryController')

router.route("/category-create").post(createCategory)
router.route("/categories").get(getAllCategory)
router.route("/category/:id").get(getCategoryById)
router.route("/category/update/:id").put(updateCategory)
router.route("/category/delete/:id").delete(deleteCategory)

module.exports = router /** exporting all routes in a single line */