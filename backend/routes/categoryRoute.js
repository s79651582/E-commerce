const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utility/validators/categoryValidator');

const { 
  createCategory, 
  getCategory, 
  getSpecificCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage
} = require("../services/categoryService");

const authService = require('../services/authService');

const subCategoryRoute = require('./subCategoryRoute');


const router = express.Router();

// Nested route 
router.use( '/:categoryId/subcategories' , subCategoryRoute);  // نعطيه اي دي الكاتيجوري فيرسل كل الاقسام المندرجه تحتها

// authService.protect --> يجب ان يسجل المستخدم الدخول قبل كل شيء
router.route('/').post(authService.protect, authService.allowedTo('admin', 'manager'), uploadCategoryImage, createCategoryValidator, resizeImage, createCategory)
      .get(getCategory);
router.route('/:id')
      .get(getCategoryValidator, getSpecificCategory)
      .put(authService.protect, authService.allowedTo('admin', 'manager'), uploadCategoryImage, updateCategoryValidator, resizeImage, updateCategory)
      .delete(authService.protect, authService.allowedTo('admin'), deleteCategoryValidator, deleteCategory);



/* or
router.route('/').post(createCategory).get(getCategory);
router.route('/:id').get(getSpecificCategory).put(updateCategory).delete(deleteCategory);

or
router.post('/' , createCategory);
router.get('/' , getCategory);
router.get('/:id' , getSpecificCategory);
router.put('/:id' , updateCategory);
router.delete('/:id' , deleteCategory);
*/

module.exports = router;