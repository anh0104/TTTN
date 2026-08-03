/**
 * controllers/news.controller.js
 * ------------------------------------------------------
 * CRUD tin tức.
 * ------------------------------------------------------
 */

const { News, User } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success, paginate } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/generateSlug');

/**
 * GET /api/news
 * Public - danh sách tin tức, có phân trang.
 */
const getNewsList = catchAsync(async (req, res) => {
  const { page = 1, limit = 9, status = 'published' } = req.query;
  const where = {};
  if (status) where.status = status;

  const perPage = Number(limit);
  const offset = (Number(page) - 1) * perPage;

  const { rows, count } = await News.findAndCountAll({
    where,
    include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
    order: [['created_at', 'DESC']],
    limit: perPage,
    offset,
  });

  return success(res, {
    message: 'Lấy danh sách tin tức thành công',
    data: rows,
    meta: paginate({ page, limit, total: count }),
  });
});

/**
 * GET /api/news/:slug
 * Public - chi tiết tin tức.
 */
const getNewsBySlug = catchAsync(async (req, res) => {
  const news = await News.findOne({
    where: { slug: req.params.slug },
    include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
  });
  if (!news) throw ApiError.notFound('Không tìm thấy tin tức');
  return success(res, { message: 'Lấy chi tiết tin tức thành công', data: news });
});

/**
 * POST /api/news
 * Admin/Editor
 */
const createNews = catchAsync(async (req, res) => {
  const { title, content, status } = req.body;
  const slug = await generateUniqueSlug(title, News);
  const file = req.file;

  const news = await News.create({
    title,
    slug,
    content,
    status: status || 'published',
    authorId: req.user.id,
    image: file ? `/uploads/news/${file.filename}` : null,
  });

  return success(res, { statusCode: 201, message: 'Tạo tin tức thành công', data: news });
});

/**
 * PUT /api/news/:id
 */
const updateNews = catchAsync(async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (!news) throw ApiError.notFound('Không tìm thấy tin tức');

  const { title, content, status } = req.body;

  if (title && title !== news.title) {
    news.slug = await generateUniqueSlug(title, News, news.id);
    news.title = title;
  }
  if (content !== undefined) news.content = content;
  if (status !== undefined) news.status = status;
  if (req.file) news.image = `/uploads/news/${req.file.filename}`;

  await news.save();
  return success(res, { message: 'Cập nhật tin tức thành công', data: news });
});

/**
 * DELETE /api/news/:id
 */
const deleteNews = catchAsync(async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (!news) throw ApiError.notFound('Không tìm thấy tin tức');

  await news.destroy();
  return success(res, { message: 'Xóa tin tức thành công' });
});

module.exports = { getNewsList, getNewsBySlug, createNews, updateNews, deleteNews };
