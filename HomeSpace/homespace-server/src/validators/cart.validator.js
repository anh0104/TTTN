/**
 * validators/cart.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const addToCartValidator = [
  body('productId').notEmpty().withMessage('Sản phẩm không được để trống').isInt().withMessage('productId không hợp lệ'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Số lượng phải >= 1'),
];

const updateCartItemValidator = [
  body('quantity').notEmpty().withMessage('Số lượng không được để trống').isInt({ min: 1 }).withMessage('Số lượng phải >= 1'),
];

module.exports = { addToCartValidator, updateCartItemValidator };
