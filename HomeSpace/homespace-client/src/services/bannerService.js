/**
 * services/bannerService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const bannerService = {
  getAll: (params) => axiosClient.get('/banners', { params }),
  getById: (id) => axiosClient.get(`/banners/${id}`),
  create: (formData) =>
    axiosClient.post('/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) =>
    axiosClient.put(`/banners/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => axiosClient.delete(`/banners/${id}`),
};

export default bannerService;
