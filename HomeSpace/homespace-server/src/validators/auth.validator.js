/**
 * validators/auth.validator.js
 * ------------------------------------------------------
 * Validation rules cho đăng ký / đăng nhập.
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Họ tên không được để trống').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email không được để trống').isEmail().withMessage('Email không hợp lệ'),
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu không được để trống')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('phone').optional({ checkFalsy: true }).isLength({ max: 20 }),
];

const loginValidator = [
  body('email').trim().notEmpty().withMessage('Email không được để trống').isEmail().withMessage('Email không hợp lệ'),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
];

const refreshTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token không được để trống'),
];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại'),
  body('newPassword')
    .notEmpty()
    .withMessage('Vui lòng nhập mật khẩu mới')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự')
    .custom((value, { req }) => value !== req.body.currentPassword)
    .withMessage('Mật khẩu mới phải khác mật khẩu hiện tại'),
];

module.exports = { registerValidator, loginValidator, refreshTokenValidator, changePasswordValidator };
