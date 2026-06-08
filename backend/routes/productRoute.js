const express = require("express");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utility/validators/productValidator');

const { 
  createProduct, 
  getProduct,
  getSpecificProduct,
  updateProduct,
  uploadProductImages,
  resizeProductImages,
  deleteProduct
} = require("../services/productService");

const authService = require('../services/authService');

const router = express.Router();

router.route('/').post(authService.protect, authService.allowedTo('admin', 'manager'), uploadProductImages, createProductValidator, resizeProductImages, createProduct)
      .get(getProduct);
router.route('/:id')
      .get(getProductValidator, getSpecificProduct)
      .put(authService.protect, authService.allowedTo('admin', 'manager'), uploadProductImages, updateProductValidator, resizeProductImages, updateProduct)
      .delete(authService.protect, authService.allowedTo('admin'), deleteProductValidator, deleteProduct);



module.exports = router;