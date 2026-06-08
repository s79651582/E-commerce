const express = require("express");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utility/validators/subCategoryValidator');

const { 
    createSubCategory, 
    setCategoryIdToBody,
    getSubCategory, 
    createFilterObj,
    getSpecificSubCategory,
    updateSubCategory,
    deleteSubCategory
    } = require("../services/subCategoryService");

const authService = require('../services/authService');


// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });  // { mergeParams: true } ---> تسمح لنا بإحضار الاقسام المندرجة تحت كاتبجوري من خلال اي دي الكاتيجوري .. و عموما اي شيء يندرج تحت شيء اخر


router.route('/').post(authService.protect, authService.allowedTo('admin', 'manager'), setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
      .get(createFilterObj, getSubCategory);
router.route('/:id')
      .get(getSubCategoryValidator, getSpecificSubCategory)
      .put(authService.protect, authService.allowedTo('admin', 'manager'), updateSubCategoryValidator, updateSubCategory)
      .delete(authService.protect, authService.allowedTo('admin'), deleteSubCategoryValidator, deleteSubCategory);


module.exports = router;