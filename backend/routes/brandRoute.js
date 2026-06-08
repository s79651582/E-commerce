const express = require("express");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utility/validators/brandValidator');

const { 
  createBrand, 
  getBrand, 
  getSpecificBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage
} = require("../services/brandService");

const authService = require('../services/authService');

const router = express.Router();

router.route('/').post(authService.protect, authService.allowedTo('admin', 'manager'), uploadBrandImage, createBrandValidator, resizeImage, createBrand)
      .get(getBrand);
router.route('/:id')
      .get(getBrandValidator, getSpecificBrand)
      .put(authService.protect, authService.allowedTo('admin', 'manager'), uploadBrandImage, updateBrandValidator, resizeImage, updateBrand)
      .delete(authService.protect, authService.allowedTo('admin'), deleteBrandValidator, deleteBrand);



module.exports = router;