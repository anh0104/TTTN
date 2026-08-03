/**
 * services/cartService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const cartService = {
  getCart: () => axiosClient.get('/cart'),
  addItem: (payload) => axiosClient.post('/cart/items', payload),
  updateItem: (itemId, quantity) => axiosClient.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => axiosClient.delete(`/cart/items/${itemId}`),
  clearCart: () => axiosClient.delete('/cart'),
};

export default cartService;
