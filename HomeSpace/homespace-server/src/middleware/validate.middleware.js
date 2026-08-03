/**
 * middleware/validate.middleware.js
 * ------------------------------------------------------
 * Chạy sau các validator (express-validator), kiểm tra nếu có lỗi
 * thì trả về ApiError.badRequest với danh sách lỗi chi tiết.
 * ------------------------------------------------------
 */

const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return next(ApiError.badRequest('Dữ liệu không hợp lệ', formattedErrors));
  }

  next();
};

module.exports = validate;
