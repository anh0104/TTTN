/**
 * validators/banner.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const bannerValidator = [
  body('title').optional({ checkFalsy: true }).isString().isLength({ max: 200 }),
  body('link').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Trạng thái không hợp lệ'),
];

module.exports = { bannerValidator };
