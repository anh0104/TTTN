/**
 * validators/category.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const categoryValidator = [
  body('name').trim().notEmpty().withMessage('Tên danh mục không được để trống').isLength({ max: 100 }),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Trạng thái không hợp lệ'),
];

module.exports = { categoryValidator };
