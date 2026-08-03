/**
 * routes/cart.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const { addToCartValidator, updateCartItemValidator } = require('../validators/cart.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

// Toàn bộ route giỏ hàng yêu cầu đăng nhập
router.use(verifyToken);

router.get('/', cartController.getCart);
router.post('/items', addToCartValidator, validate, cartController.addToCart);
router.put('/items/:itemId', updateCartItemValidator, validate, cartController.updateCartItem);
router.delete('/items/:itemId', cartController.removeCartItem);
router.delete('/', cartController.clearCart);

module.exports = router;
