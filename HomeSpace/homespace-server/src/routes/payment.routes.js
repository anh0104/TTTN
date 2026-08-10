/**
 * routes/payment.routes.js
 * ------------------------------------------------------
 * Định nghĩa router cho SePay Webhook và thông tin ngân hàng
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Endpoints Webhook SePay (hỗ trợ các URL: /api/payment/webhook, /api/Webhook/sepay, /api/webhook/sepay)
router.post('/webhook', paymentController.handleSepayWebhook);
router.post('/webhook/sepay', paymentController.handleSepayWebhook);
router.post('/sepay', paymentController.handleSepayWebhook);
router.post('/', paymentController.handleSepayWebhook);

// Endpoint lấy thông tin ngân hàng SePay (GET /api/payment/sepay-info)
router.get('/sepay-info', paymentController.getSepayInfo);

module.exports = router;
