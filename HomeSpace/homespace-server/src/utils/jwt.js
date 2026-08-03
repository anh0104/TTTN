/**
 * utils/jwt.js
 * ------------------------------------------------------
 * Hàm tiện ích tạo và xác thực JWT Access Token / Refresh Token.
 * Access Token: sống ngắn, gửi kèm mỗi request để xác thực.
 * Refresh Token: sống dài, dùng để cấp lại Access Token mới,
 * được lưu trong DB (users.refresh_token) để có thể thu hồi.
 * ------------------------------------------------------
 */

const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  });

const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);

const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
