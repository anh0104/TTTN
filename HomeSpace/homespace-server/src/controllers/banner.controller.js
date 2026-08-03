/**
 * controllers/banner.controller.js
 * ------------------------------------------------------
 * CRUD banner trang chủ.
 * ------------------------------------------------------
 */

const { Banner } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

const getBanners = catchAsync(async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;

  const banners = await Banner.findAll({ where, order: [['sortOrder', 'ASC']] });
  return success(res, { message: 'Lấy danh sách banner thành công', data: banners });
});

const getBannerById = catchAsync(async (req, res) => {
  const banner = await Banner.findByPk(req.params.id);
  if (!banner) throw ApiError.notFound('Không tìm thấy banner');
  return success(res, { message: 'Lấy banner thành công', data: banner });
});

const createBanner = catchAsync(async (req, res) => {
  const { title, link, sortOrder, status } = req.body;
  const file = req.file;

  if (!file) throw ApiError.badRequest('Vui lòng tải lên ảnh banner');

  const banner = await Banner.create({
    title,
    link,
    sortOrder: sortOrder || 0,
    status: status || 'active',
    image: `/uploads/banners/${file.filename}`,
  });

  return success(res, { statusCode: 201, message: 'Tạo banner thành công', data: banner });
});

const updateBanner = catchAsync(async (req, res) => {
  const banner = await Banner.findByPk(req.params.id);
  if (!banner) throw ApiError.notFound('Không tìm thấy banner');

  const { title, link, sortOrder, status } = req.body;
  if (title !== undefined) banner.title = title;
  if (link !== undefined) banner.link = link;
  if (sortOrder !== undefined) banner.sortOrder = sortOrder;
  if (status !== undefined) banner.status = status;
  if (req.file) banner.image = `/uploads/banners/${req.file.filename}`;

  await banner.save();
  return success(res, { message: 'Cập nhật banner thành công', data: banner });
});

const deleteBanner = catchAsync(async (req, res) => {
  const banner = await Banner.findByPk(req.params.id);
  if (!banner) throw ApiError.notFound('Không tìm thấy banner');

  await banner.destroy();
  return success(res, { message: 'Xóa banner thành công' });
});

module.exports = { getBanners, getBannerById, createBanner, updateBanner, deleteBanner };
