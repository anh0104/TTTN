/**
 * controllers/auth.controller.js
 * ------------------------------------------------------
 * Xử lý đăng ký, đăng nhập, refresh token, đăng xuất.
 * ------------------------------------------------------
 */

const bcrypt = require('bcryptjs');
const { User, Cart } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới (mặc định role = 'user'), tự động tạo giỏ hàng rỗng.
 */
const register = catchAsync(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw ApiError.conflict('Email đã được sử dụng');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: 'user',
  });

  // Mỗi user mới sẽ có 1 giỏ hàng rỗng
  await Cart.create({ userId: user.id });

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  return success(res, {
    statusCode: 201,
    message: 'Đăng ký thành công',
    data: {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    },
  });
});

/**
 * POST /api/auth/login
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) {
    throw ApiError.unauthorized('Email hoặc mật khẩu không đúng');
  }

  if (user.status === 'inactive') {
    throw ApiError.forbidden('Tài khoản của bạn đã bị khóa');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized('Email hoặc mật khẩu không đúng');
  }

  const payload = { id: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  return success(res, {
    message: 'Đăng nhập thành công',
    data: {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      accessToken,
      refreshToken,
    },
  });
});

/**
 * POST /api/auth/refresh-token
 * Cấp Access Token mới từ Refresh Token còn hạn.
 */
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken: token } = req.body;

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch (err) {
    throw ApiError.unauthorized('Refresh token không hợp lệ hoặc đã hết hạn');
  }

  const user = await User.scope('withPassword').findByPk(decoded.id);
  if (!user || user.refreshToken !== token) {
    throw ApiError.unauthorized('Refresh token không hợp lệ');
  }

  const payload = { id: user.id, role: user.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Xoay vòng refresh token (refresh token rotation) để tăng bảo mật
  user.refreshToken = newRefreshToken;
  await user.save();

  return success(res, {
    message: 'Làm mới token thành công',
    data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
  });
});

/**
 * POST /api/auth/logout
 * Thu hồi refresh token hiện tại (yêu cầu đã đăng nhập - verifyToken).
 */
const logout = catchAsync(async (req, res) => {
  await User.update({ refreshToken: null }, { where: { id: req.user.id } });
  return success(res, { message: 'Đăng xuất thành công' });
});

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại từ access token.
 */
const getMe = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) throw ApiError.notFound('Không tìm thấy người dùng');
  return success(res, { message: 'Lấy thông tin thành công', data: user });
});

/**
 * PUT /api/auth/change-password
 * Đổi mật khẩu tự phục vụ (yêu cầu đã đăng nhập).
 * Sau khi đổi mật khẩu thành công, thu hồi refresh token hiện tại
 * để bắt buộc đăng nhập lại trên tất cả thiết bị (bảo mật).
 */
const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.scope('withPassword').findByPk(req.user.id);
  if (!user) throw ApiError.notFound('Không tìm thấy người dùng');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw ApiError.badRequest('Mật khẩu hiện tại không đúng');

  user.password = await bcrypt.hash(newPassword, 10);
  user.refreshToken = null; // Thu hồi phiên đăng nhập cũ, bắt buộc login lại
  await user.save();

  return success(res, { message: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại' });
});

module.exports = { register, login, refreshToken, logout, getMe, changePassword };
