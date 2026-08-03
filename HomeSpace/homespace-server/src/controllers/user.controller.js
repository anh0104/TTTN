/**
 * controllers/user.controller.js
 * ------------------------------------------------------
 * CRUD người dùng - dành cho Admin/SuperAdmin quản lý.
 * ------------------------------------------------------
 */

const bcrypt = require('bcryptjs');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success, paginate } = require('../utils/apiResponse');

/**
 * GET /api/users
 * Admin/SuperAdmin
 */
const getUsers = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, search, role, status } = req.query;
  const { Op } = require('sequelize');

  const where = {};
  if (search) where.name = { [Op.like]: `%${search}%` };
  if (role) where.role = role;
  if (status) where.status = status;

  const perPage = Number(limit);
  const offset = (Number(page) - 1) * perPage;

  const { rows, count } = await User.findAndCountAll({
    where,
    order: [['created_at', 'DESC']],
    limit: perPage,
    offset,
  });

  return success(res, {
    message: 'Lấy danh sách người dùng thành công',
    data: rows,
    meta: paginate({ page, limit, total: count }),
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw ApiError.notFound('Không tìm thấy người dùng');
  return success(res, { message: 'Lấy người dùng thành công', data: user });
});

/**
 * POST /api/users
 * SuperAdmin - tạo tài khoản quản trị (admin/editor) hoặc user.
 */
const createUser = catchAsync(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw ApiError.conflict('Email đã được sử dụng');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, phone, role: role || 'user' });

  return success(res, { statusCode: 201, message: 'Tạo người dùng thành công', data: user });
});

/**
 * PUT /api/users/:id
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw ApiError.notFound('Không tìm thấy người dùng');

  const { name, email, phone, role, status, password } = req.body;

  if (email && email !== user.email) {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw ApiError.conflict('Email đã được sử dụng');
    user.email = email;
  }
  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (role !== undefined) user.role = role;
  if (status !== undefined) user.status = status;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (req.file) user.avatar = `/uploads/avatars/${req.file.filename}`;

  await user.save();
  return success(res, { message: 'Cập nhật người dùng thành công', data: user });
});

/**
 * DELETE /api/users/:id
 */
const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw ApiError.notFound('Không tìm thấy người dùng');

  if (user.id === req.user.id) {
    throw ApiError.badRequest('Không thể tự xóa tài khoản của chính mình');
  }

  await user.destroy();
  return success(res, { message: 'Xóa người dùng thành công' });
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
