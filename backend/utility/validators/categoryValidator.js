const { check , body} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../midelewares/validatorMiddleware');


exports.getCategoryValidator = [
  // 1- rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- middleware
  validatorMiddleware
];

exports.createCategoryValidator = [
  // 1- rules
  check('name')
    .notEmpty().withMessage('Category required')
    .isLength({ min: 3 }).withMessage('Too short category name')
    .isLength({ max: 32 }).withMessage('Too long category name'),
    body('name').custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  // 2- middleware
  validatorMiddleware
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name')
  .optional()
  .custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware
];