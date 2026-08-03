/**
 * middleware/rateLimiter.middleware.js
 * ------------------------------------------------------
 * Giới hạn số lần gọi API để chống tấn công brute-force
 * (dò mật khẩu) vào các endpoint đăng nhập/đăng ký.
 * ------------------------------------------------------
 */

const rateLimit = require('express-rate-limit');

/**
 * Giới hạn đăng nhập: tối đa 10 lần / 15 phút / mỗi IP.
 * Không đếm các request thành công, chỉ đếm request thất bại
 * (để không khóa user đang dùng bình thường).
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.',
  },
});

/**
 * Giới hạn đăng ký: tối đa 5 lần / giờ / mỗi IP (chống spam tạo tài khoản ảo).
 */
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Bạn đã tạo tài khoản quá nhiều lần. Vui lòng thử lại sau.',
  },
});

module.exports = { loginLimiter, registerLimiter };
