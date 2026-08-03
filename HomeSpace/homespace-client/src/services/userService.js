/**
 * services/userService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const userService = {
  getAll: (params) => axiosClient.get('/users', { params }),
  getById: (id) => axiosClient.get(`/users/${id}`),
  create: (payload) => axiosClient.post('/users', payload),
  update: (id, formData) =>
    axiosClient.put(`/users/${id}`, formData, {
      headers: { 'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json' },
    }),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userService;
