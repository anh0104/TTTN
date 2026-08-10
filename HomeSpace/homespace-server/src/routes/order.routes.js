/**
 * routes/order.routes.js
 * ------------------------------------------------------
 * Định nghĩa router cho các thao tác Đơn hàng
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, authorize, optionalAuth } = require('../middleware/auth.middleware');

// Public or optionalAuth routes
router.post('/', optionalAuth, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getMyOrders);
router.get('/:orderCode', optionalAuth, orderController.getOrderByCode);
router.put('/:orderCode/cancel', optionalAuth, orderController.cancelOrder);

// Admin routes
router.get('/admin/all', verifyToken, authorize('superadmin', 'admin', 'editor'), orderController.getAllOrdersAdmin);
router.put('/admin/:id/status', verifyToken, authorize('superadmin', 'admin'), orderController.updateOrderStatusAdmin);

module.exports = router;
