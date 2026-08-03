/**
 * controllers/upload.controller.js
 * ------------------------------------------------------
 * Endpoint upload ảnh tổng quát POST /api/upload
 * (Dùng cho các trường hợp upload đơn lẻ không gắn với
 * form CRUD cụ thể, VD: upload logo trong Quản lý giao diện).
 * Query ?folder=products|banners|news|avatars quyết định nơi lưu.
 * ------------------------------------------------------
 */

const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

const uploadSingle = catchAsync(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('Vui lòng chọn file để upload');

  const folder = req.uploadFolder || 'products';
  const url = `/uploads/${folder}/${req.file.filename}`;

  return success(res, {
    statusCode: 201,
    message: 'Upload thành công',
    data: { url, filename: req.file.filename, size: req.file.size },
  });
});

const uploadMultiple = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) throw ApiError.badRequest('Vui lòng chọn ít nhất 1 file');

  const folder = req.uploadFolder || 'products';
  const files = req.files.map((file) => ({
    url: `/uploads/${folder}/${file.filename}`,
    filename: file.filename,
    size: file.size,
  }));

  return success(res, { statusCode: 201, message: 'Upload thành công', data: files });
});

module.exports = { uploadSingle, uploadMultiple };
