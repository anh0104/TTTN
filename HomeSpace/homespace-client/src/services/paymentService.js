/**
 * services/paymentService.js
 * ------------------------------------------------------
 * Service gọi API liên quan đến SePay / Cổng thanh toán
 * ------------------------------------------------------
 */

import axiosClient from './axiosClient';

const paymentService = {
  getSepayInfo: () => axiosClient.get('/payment/sepay-info'),
};

export default paymentService;
