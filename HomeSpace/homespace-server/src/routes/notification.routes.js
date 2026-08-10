/**
 * routes/notification.routes.js
 * ------------------------------------------------------
 * Định nghĩa các tuyến đường API Thông Báo
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { verifyToken, authorize, optionalAuth } = require('../middleware/auth.middleware');

// Public & Optional Auth routes
router.get('/', optionalAuth, notificationController.getUserNotifications);
router.put('/read-all', optionalAuth, notificationController.markAllAsRead);
router.put('/:id/read', optionalAuth, notificationController.markAsRead);

// Admin routes
router.post('/broadcast', verifyToken, authorize('superadmin', 'admin', 'editor'), notificationController.createBroadcast);

module.exports = router;
