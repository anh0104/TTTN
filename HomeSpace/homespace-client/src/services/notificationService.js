/**
 * services/notificationService.js
 * ------------------------------------------------------
 * Service tương tác API Thông Báo thực tế
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const notificationService = {
  // Lấy danh sách thông báo + số thông báo chưa đọc (unreadCount)
  getNotifications: () => axiosClient.get('/notifications'),

  // Đánh dấu tất cả là đã đọc
  markAllAsRead: () => axiosClient.put('/notifications/read-all'),

  // Đánh dấu 1 thông báo là đã đọc
  markAsRead: (id) => axiosClient.put(`/notifications/${id}/read`),

  // Admin phát hành thông báo mới cho toàn hệ thống
  sendBroadcast: (data) => axiosClient.post('/notifications/broadcast', data),
};

export default notificationService;
