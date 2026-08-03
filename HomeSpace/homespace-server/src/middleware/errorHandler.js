/**
 * middleware/errorHandler.js
 * ------------------------------------------------------
 * Middleware xử lý lỗi tập trung (global error handler).
 * Bắt toàn bộ lỗi được next(err) từ controllers/services,
 * chuẩn hóa response trả về cho client.
 * ------------------------------------------------------
 */

const { error: errorResponse } = require('../utils/apiResponse');

/**
 * Middleware xử lý route không tồn tại (404)
 * Đặt SAU toàn bộ routes, TRƯỚC errorHandler
 */
const notFoundHandler = (req, res, next) => {
  const err = new Error(`Không tìm thấy đường dẫn: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

/**
 * Middleware xử lý lỗi tổng quát
 * Express nhận diện đây là error handler nhờ có 4 tham số (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
  let errors = err.errors || [];

  // Lỗi trùng dữ liệu (unique constraint) từ Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Dữ liệu đã tồn tại trong hệ thống';
    errors = err.errors?.map((e) => ({ field: e.path, message: e.message })) || [];
  }

  // Lỗi validation từ Sequelize
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = 'Dữ liệu không hợp lệ';
    errors = err.errors?.map((e) => ({ field: e.path, message: e.message })) || [];
  }

  // Lỗi khóa ngoại không tồn tại
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Dữ liệu liên kết không hợp lệ (khóa ngoại không tồn tại)';
  }

  // Lỗi JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token không hợp lệ';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token đã hết hạn, vui lòng đăng nhập lại';
  }

  // Lỗi Multer (upload file)
  if (err.name === 'MulterError') {
    statusCode = 400;
    message = `Lỗi upload file: ${err.message}`;
  }

  // Log lỗi hệ thống (không phải lỗi nghiệp vụ đã biết trước) để dễ debug
  if (!err.isOperational) {
    console.error('🔥 LỖI HỆ THỐNG:', err);
  }

  return errorResponse(res, { statusCode, message, errors });
};

module.exports = { errorHandler, notFoundHandler };
