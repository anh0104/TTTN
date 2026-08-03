/**
 * services/settingService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const settingService = {
  getSettings: () => axiosClient.get('/settings'),
  updateSettings: (payload) => axiosClient.put('/settings', payload),
};

export default settingService;
