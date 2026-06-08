const { check , body} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../midelewares/validatorMiddleware');


exports.createSubCategoryValidator = [
  // 1- rules
  check('name')
    .notEmpty().withMessage('SubCategory required')
    .isLength({ min: 2 }).withMessage('To short SubCategory name')
    .isLength({ max: 32 }).withMessage('To long SubCategory name'),
  check('category').isMongoId().withMessage('Invalid Category id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  // 2- middleware
  validatorMiddleware
];

exports.getSubCategoryValidator = [
  // 1- rules
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  // 2- middleware
  validatorMiddleware
];


exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
];

exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validatorMiddleware
];
