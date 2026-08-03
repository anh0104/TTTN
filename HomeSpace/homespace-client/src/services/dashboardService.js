/**
 * services/dashboardService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const dashboardService = {
  getStats: () => axiosClient.get('/dashboard/stats'),
  getRevenueChart: (days) => axiosClient.get('/dashboard/revenue-chart', { params: { days } }),
  getOrderStatusChart: () => axiosClient.get('/dashboard/order-status-chart'),
  getTopProducts: (limit) => axiosClient.get('/dashboard/top-products', { params: { limit } }),
  getTopCategories: (limit) => axiosClient.get('/dashboard/top-categories', { params: { limit } }),
};

export default dashboardService;
