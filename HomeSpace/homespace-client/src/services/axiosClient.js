/**
 * services/axiosClient.js
 * ------------------------------------------------------
 * Instance Axios dùng chung cho toàn bộ app.
 * - Tự động gắn Access Token vào header Authorization.
 * - Khi gặp lỗi 401 (token hết hạn), tự động gọi API refresh-token
 *   để lấy Access Token mới rồi thử lại request cũ (chỉ 1 lần).
 * - Nếu refresh cũng thất bại -> đăng xuất và chuyển về trang login.
 * ------------------------------------------------------
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ============ REQUEST INTERCEPTOR ============
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('homespace-access-token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ RESPONSE INTERCEPTOR (auto refresh token) ============
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => refreshSubscribers.push(callback);
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Không tự refresh cho chính request login/refresh-token để tránh loop vô hạn
    const isAuthEndpoint =
      originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh-token');

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      const refreshToken = localStorage.getItem('homespace-refresh-token');
      if (!refreshToken) {
        handleLogoutRedirect();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Nếu đang có 1 request refresh khác chạy, chờ nó xong rồi retry
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = data.data;

        localStorage.setItem('homespace-access-token', accessToken);
        localStorage.setItem('homespace-refresh-token', newRefreshToken);

        isRefreshing = false;
        onTokenRefreshed(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        handleLogoutRedirect();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function handleLogoutRedirect() {
  localStorage.removeItem('homespace-access-token');
  localStorage.removeItem('homespace-refresh-token');
  localStorage.removeItem('homespace-user');
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = '/admin/login';
  } else {
    window.location.href = '/dang-nhap';
  }
}

export default axiosClient;
