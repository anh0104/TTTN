/**
 * controllers/notification.controller.js
 * ------------------------------------------------------
 * Controller quản lý Thông báo thực tế cho Người dùng & Admin
 * ------------------------------------------------------
 */

const { Notification, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Hàm Helper tạo thông báo nội bộ (Dùng trong Order, Payment webhook,...)
 */
exports.createNotificationHelper = async ({ userId = null, title, message, type = 'system', link = null }) => {
  try {
    const notif = await Notification.create({
      userId,
      title,
      message,
      type,
      link,
      isRead: false,
    });
    console.log(`🔔 [Notification Created]: "${title}" (User ID: ${userId || 'All'})`);
    return notif;
  } catch (err) {
    console.error('❌ [Create Notification Error]:', err);
    return null;
  }
};

/**
 * GET /api/notifications
 * Lấy danh sách thông báo thực tế của người dùng hiện tại + số thông báo chưa đọc (unreadCount)
 */
exports.getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;

    // Lấy thông báo của user + thông báo chung (userId is null)
    const whereCondition = userId
      ? { [Op.or]: [{ userId }, { userId: null }] }
      : { userId: null };

    const notifications = await Notification.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/read-all
 * Đánh dấu tất cả thông báo là ĐÃ ĐỌC
 */
exports.markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const whereCondition = userId
      ? { [Op.or]: [{ userId }, { userId: null }] }
      : { userId: null };

    await Notification.update(
      { isRead: true },
      { where: whereCondition }
    );

    return res.status(200).json({
      success: true,
      message: 'Đã đánh dấu tất cả thông báo là đã đọc',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/:id/read
 * Đánh dấu 1 thông báo cụ thể là ĐÃ ĐỌC
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông báo' });
    }

    await notification.update({ isRead: true });

    return res.status(200).json({
      success: true,
      message: 'Đã cập nhật trạng thái thông báo',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/notifications/broadcast (Admin)
 * Admin tạo thông báo hệ thống / ưu đãi mới cho toàn bộ người dùng
 */
exports.createBroadcast = async (req, res, next) => {
  try {
    const { title, message, type = 'system', link, targetUserId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Tiêu đề và nội dung là bắt buộc' });
    }

    const notification = await exports.createNotificationHelper({
      userId: targetUserId ? Number(targetUserId) : null,
      title,
      message,
      type,
      link,
    });

    return res.status(201).json({
      success: true,
      message: 'Đã phát hành thông báo thành công!',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};
