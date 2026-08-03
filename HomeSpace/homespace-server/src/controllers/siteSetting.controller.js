/**
 * controllers/siteSetting.controller.js
 * ------------------------------------------------------
 * Quản lý cấu hình giao diện: logo, banner, màu chủ đạo,
 * dark mode mặc định, bật/tắt các section trang chủ.
 * Lưu dạng key-value trong bảng site_settings.
 * ------------------------------------------------------
 */

const { SiteSetting } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

/**
 * GET /api/settings
 * Public - client cần đọc để hiển thị logo/màu/bật-tắt section.
 * Trả về dạng object phẳng { key: value } cho dễ dùng ở Frontend.
 */
const getSettings = catchAsync(async (req, res) => {
  const settings = await SiteSetting.findAll();
  const settingsObject = settings.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {});

  return success(res, { message: 'Lấy cấu hình giao diện thành công', data: settingsObject });
});

/**
 * PUT /api/settings
 * Admin/SuperAdmin - cập nhật hàng loạt (body: { key: value, ... }).
 * Dùng upsert: key nào chưa có sẽ tự tạo mới.
 */
const updateSettings = catchAsync(async (req, res) => {
  const updates = req.body; // VD: { primary_color: '#C89B5B', show_news: 'false' }

  const keys = Object.keys(updates);
  await Promise.all(
    keys.map((key) =>
      SiteSetting.upsert({ key, value: String(updates[key]) })
    )
  );

  const settings = await SiteSetting.findAll();
  const settingsObject = settings.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {});

  return success(res, { message: 'Cập nhật cấu hình giao diện thành công', data: settingsObject });
});

module.exports = { getSettings, updateSettings };
