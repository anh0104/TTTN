/**
 * routes/index.js
 * ------------------------------------------------------
 * Router gốc, tổng hợp toàn bộ các route con của hệ thống.
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chào mừng đến với HomeSpace API',
    version: '1.0.0',
  });
});

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/categories', require('./category.routes'));
router.use('/products', require('./product.routes'));
router.use('/banners', require('./banner.routes'));
router.use('/news', require('./news.routes'));
router.use('/cart', require('./cart.routes'));
router.use('/orders', require('./order.routes'));
router.use('/payment', require('./payment.routes'));
router.use('/webhook', require('./payment.routes'));
router.use('/Webhook', require('./payment.routes'));
router.use('/upload', require('./upload.routes'));
router.use('/dashboard', require('./dashboard.routes'));
router.use('/settings', require('./siteSetting.routes'));
router.use('/notifications', require('./notification.routes'));

module.exports = router;
