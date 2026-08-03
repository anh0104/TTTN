/**
 * services/uploadService.js
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const uploadService = {
  uploadSingle: (file, folder = 'products') => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosClient.post(`/upload?folder=${folder}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default uploadService;
