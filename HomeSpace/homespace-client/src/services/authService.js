/**
 * services/authService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const authService = {
  register: (payload) => axiosClient.post('/auth/register', payload),
  login: (payload) => axiosClient.post('/auth/login', payload),
  logout: () => axiosClient.post('/auth/logout'),
  getMe: () => axiosClient.get('/auth/me'),
  changePassword: (payload) => axiosClient.put('/auth/change-password', payload),
};

export default authService;
