/**
 * services/newsService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const newsService = {
  getAll: (params) => axiosClient.get('/news', { params }),
  getBySlug: (slug) => axiosClient.get(`/news/${slug}`),
  create: (formData) =>
    axiosClient.post('/news', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) =>
    axiosClient.put(`/news/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => axiosClient.delete(`/news/${id}`),
};

export default newsService;
