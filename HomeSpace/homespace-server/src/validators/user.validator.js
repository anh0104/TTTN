/**
 * validators/user.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const createUserValidator = [
  body('name').trim().notEmpty().withMessage('Họ tên không được để trống').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email không được để trống').isEmail().withMessage('Email không hợp lệ'),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống').isLength({ min: 6 }),
  body('role').optional().isIn(['superadmin', 'admin', 'editor', 'user']).withMessage('Vai trò không hợp lệ'),
];

const updateUserValidator = [
  body('name').optional().trim().notEmpty().withMessage('Họ tên không được để trống').isLength({ max: 100 }),
  body('email').optional().trim().isEmail().withMessage('Email không hợp lệ'),
  body('role').optional().isIn(['superadmin', 'admin', 'editor', 'user']).withMessage('Vai trò không hợp lệ'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Trạng thái không hợp lệ'),
];

module.exports = { createUserValidator, updateUserValidator };
