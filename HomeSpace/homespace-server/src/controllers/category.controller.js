/**
 * controllers/category.controller.js
 * ------------------------------------------------------
 * CRUD danh mục sản phẩm.
 * ------------------------------------------------------
 */

const { Category, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/generateSlug');

/**
 * GET /api/categories
 * Public - danh sách danh mục (client dùng để hiển thị menu/filter)
 */
const getCategories = catchAsync(async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;

  const categories = await Category.findAll({ where, order: [['id', 'ASC']] });
  return success(res, { message: 'Lấy danh sách danh mục thành công', data: categories });
});

/**
 * GET /api/categories/:id
 */
const getCategoryById = catchAsync(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw ApiError.notFound('Không tìm thấy danh mục');
  return success(res, { message: 'Lấy danh mục thành công', data: category });
});

/**
 * POST /api/categories
 * Admin/SuperAdmin
 */
const createCategory = catchAsync(async (req, res) => {
  const { name, description, status } = req.body;
  const slug = await generateUniqueSlug(name, Category);

  const category = await Category.create({ name, slug, description, status });
  return success(res, { statusCode: 201, message: 'Tạo danh mục thành công', data: category });
});

/**
 * PUT /api/categories/:id
 */
const updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw ApiError.notFound('Không tìm thấy danh mục');

  const { name, description, status } = req.body;

  if (name && name !== category.name) {
    category.slug = await generateUniqueSlug(name, Category, category.id);
    category.name = name;
  }
  if (description !== undefined) category.description = description;
  if (status !== undefined) category.status = status;

  await category.save();
  return success(res, { message: 'Cập nhật danh mục thành công', data: category });
});

/**
 * DELETE /api/categories/:id
 */
const deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw ApiError.notFound('Không tìm thấy danh mục');

  const productCount = await Product.count({ where: { categoryId: category.id } });
  if (productCount > 0) {
    throw ApiError.badRequest(
      `Không thể xóa danh mục vì đang có ${productCount} sản phẩm thuộc danh mục này`
    );
  }

  await category.destroy();
  return success(res, { message: 'Xóa danh mục thành công' });
});

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
