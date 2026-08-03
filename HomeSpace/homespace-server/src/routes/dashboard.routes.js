/**
 * routes/dashboard.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

router.use(verifyToken, authorize('superadmin', 'admin'));

router.get('/stats', dashboardController.getStats);
router.get('/revenue-chart', dashboardController.getRevenueChart);
router.get('/order-status-chart', dashboardController.getOrderStatusChart);
router.get('/top-products', dashboardController.getTopProducts);
router.get('/top-categories', dashboardController.getTopCategories);

module.exports = router;
