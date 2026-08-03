/**
 * services/productService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const productService = {
  getAll: (params) => axiosClient.get('/products', { params }),
  getBySlug: (slug) => axiosClient.get(`/products/${slug}`),
  create: (formData) =>
    axiosClient.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) =>
    axiosClient.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => axiosClient.delete(`/products/${id}`),
  deleteImage: (id, imageId) => axiosClient.delete(`/products/${id}/images/${imageId}`),
};

export default productService;
