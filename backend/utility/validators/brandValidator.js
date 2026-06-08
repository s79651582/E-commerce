const { check , body} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../midelewares/validatorMiddleware');


exports.getBrandValidator = [
  // 1- rules
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  // 2- middleware
  validatorMiddleware
];

exports.createBrandValidator = [
  // 1- rules
  check('name')
    .notEmpty().withMessage('Brand required')
    .isLength({ min: 2 }).withMessage('Too short Brand name')
    .isLength({ max: 32 }).withMessage('Too long Brand name'),
    
    body('name').custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  // 2- middleware
  validatorMiddleware
];

exports.updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  body('name')
  .optional()
  .custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
];

exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware
];