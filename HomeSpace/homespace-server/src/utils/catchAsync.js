/**
 * utils/catchAsync.js
 * ------------------------------------------------------
 * Bọc các hàm async controller để tự động bắt lỗi (try/catch)
 * và chuyển tới middleware errorHandler thông qua next(err),
 * thay vì phải viết try/catch lặp lại ở mọi controller.
 *
 * Cách dùng:
 *   exports.getProducts = catchAsync(async (req, res) => { ... });
 * ------------------------------------------------------
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
