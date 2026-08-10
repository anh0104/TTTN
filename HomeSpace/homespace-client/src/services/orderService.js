/**
 * services/orderService.js
 * ------------------------------------------------------
 * Service xử lý gọi API Đơn hàng
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const orderService = {
  createOrder: (data) => axiosClient.post('/orders', data),
  getMyOrders: () => axiosClient.get('/orders/my-orders'),
  getOrderByCode: (orderCode) => axiosClient.get(`/orders/${orderCode}`),
  cancelOrder: (orderCode) => axiosClient.put(`/orders/${orderCode}/cancel`),

  // Admin APIs
  getAllOrdersAdmin: (params) => axiosClient.get('/orders/admin/all', { params }),
  updateOrderStatusAdmin: (id, data) => axiosClient.put(`/orders/admin/${id}/status`, data),
};

export default orderService;
