/**
 * validators/product.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const productValidator = [
  body('name').trim().notEmpty().withMessage('Tên sản phẩm không được để trống').isLength({ max: 200 }),
  body('price').notEmpty().withMessage('Giá không được để trống').isFloat({ min: 0 }).withMessage('Giá phải là số >= 0'),
  body('salePrice')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('Giá khuyến mãi phải là số >= 0'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên >= 0'),
  body('categoryId').optional({ checkFalsy: true }).isInt().withMessage('Danh mục không hợp lệ'),
  body('isNew').optional().isBoolean(),
  body('isSale').optional().isBoolean(),
  body('isBest').optional().isBoolean(),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Trạng thái không hợp lệ'),
];

module.exports = { productValidator };
