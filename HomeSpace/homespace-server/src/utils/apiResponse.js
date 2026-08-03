/**
 * utils/apiResponse.js
 * ------------------------------------------------------
 * Chuẩn hóa cấu trúc response trả về cho client.
 * Giúp Frontend luôn nhận được format nhất quán:
 * { success, message, data, meta }
 * ------------------------------------------------------
 */

const success = (res, { statusCode = 200, message = 'Thành công', data = null, meta = null }) => {
  const payload = { success: true, message, data };
  if (meta) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

const error = (res, { statusCode = 500, message = 'Đã có lỗi xảy ra', errors = [] }) => {
  const payload = { success: false, message };
  if (errors && errors.length > 0) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

/**
 * Tính toán meta phân trang, dùng chung cho các API danh sách (products, news, ...)
 */
const paginate = ({ page = 1, limit = 12, total = 0 }) => {
  const currentPage = Number(page);
  const perPage = Number(limit);
  const totalPages = Math.ceil(total / perPage) || 1;

  return {
    currentPage,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

module.exports = { success, error, paginate };
