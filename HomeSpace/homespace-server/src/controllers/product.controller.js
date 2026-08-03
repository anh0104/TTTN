/**
 * controllers/product.controller.js
 * ------------------------------------------------------
 * CRUD sản phẩm + danh sách có tìm kiếm/lọc/sắp xếp/phân trang
 * + upload nhiều ảnh (thumbnail + gallery) bằng Multer.
 * ------------------------------------------------------
 */

const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

const { Product, Category, ProductImage } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success, paginate } = require('../utils/apiResponse');
const { generateUniqueSlug } = require('../utils/generateSlug');

/**
 * GET /api/products
 * Public - danh sách sản phẩm với đầy đủ tìm kiếm/lọc/sắp xếp/phân trang.
 *
 * Query params hỗ trợ:
 *  - page, limit (mặc định 1, 12)
 *  - search (tìm theo tên)
 *  - category (id danh mục)
 *  - minPrice, maxPrice
 *  - isNew, isSale, isBest (true/false)
 *  - sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
 */
const getProducts = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    search,
    category,
    minPrice,
    maxPrice,
    isNew,
    isSale,
    isBest,
    sort,
    status = 'active',
  } = req.query;

  const where = {};
  if (status) where.status = status;
  if (category) where.categoryId = category;
  if (isNew !== undefined) where.isNew = isNew === 'true';
  if (isSale !== undefined) where.isSale = isSale === 'true';
  if (isBest !== undefined) where.isBest = isBest === 'true';
  if (search) where.name = { [Op.like]: `%${search}%` };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = Number(minPrice);
    if (maxPrice) where.price[Op.lte] = Number(maxPrice);
  }

  const sortMap = {
    price_asc: [['price', 'ASC']],
    price_desc: [['price', 'DESC']],
    name_asc: [['name', 'ASC']],
    name_desc: [['name', 'DESC']],
    newest: [['created_at', 'DESC']],
  };
  const order = sortMap[sort] || sortMap.newest;

  const perPage = Number(limit);
  const offset = (Number(page) - 1) * perPage;

  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
    order,
    limit: perPage,
    offset,
    distinct: true, // Đảm bảo count chính xác khi có include
  });

  return success(res, {
    message: 'Lấy danh sách sản phẩm thành công',
    data: rows,
    meta: paginate({ page, limit, total: count }),
  });
});

/**
 * GET /api/products/:slug
 * Public - chi tiết sản phẩm theo slug, kèm gallery ảnh + sản phẩm liên quan.
 */
const getProductBySlug = catchAsync(async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.slug },
    include: [
      { model: Category, as: 'category' },
      { model: ProductImage, as: 'images', attributes: ['id', 'image', 'sortOrder'] },
    ],
    order: [[{ model: ProductImage, as: 'images' }, 'sortOrder', 'ASC']],
  });

  if (!product) throw ApiError.notFound('Không tìm thấy sản phẩm');

  const relatedProducts = await Product.findAll({
    where: {
      categoryId: product.categoryId,
      id: { [Op.ne]: product.id },
      status: 'active',
    },
    limit: 4,
    order: [['created_at', 'DESC']],
  });

  return success(res, {
    message: 'Lấy chi tiết sản phẩm thành công',
    data: { ...product.toJSON(), relatedProducts },
  });
});

/**
 * POST /api/products
 * Admin/SuperAdmin - tạo sản phẩm mới, upload thumbnail + nhiều ảnh gallery.
 * Multer field: 'thumbnail' (1 ảnh), 'images' (nhiều ảnh, tối đa 8)
 */
const createProduct = catchAsync(async (req, res) => {
  const {
    name,
    categoryId,
    price,
    salePrice,
    quantity,
    material,
    color,
    size,
    description,
    isNew,
    isSale,
    isBest,
    status,
  } = req.body;

  const slug = await generateUniqueSlug(name, Product);

  const thumbnailFile = req.files?.thumbnail?.[0];
  const galleryFiles = req.files?.images || [];

  const product = await Product.create({
    name,
    slug,
    categoryId: categoryId || null,
    price,
    salePrice: salePrice || null,
    quantity: quantity || 0,
    material,
    color,
    size,
    description,
    thumbnail: thumbnailFile ? `/uploads/products/${thumbnailFile.filename}` : null,
    isNew: isNew === 'true' || isNew === true,
    isSale: isSale === 'true' || isSale === true,
    isBest: isBest === 'true' || isBest === true,
    status: status || 'active',
  });

  if (galleryFiles.length > 0) {
    const imageRecords = galleryFiles.map((file, index) => ({
      productId: product.id,
      image: `/uploads/products/${file.filename}`,
      sortOrder: index + 1,
    }));
    await ProductImage.bulkCreate(imageRecords);
  }

  const fullProduct = await Product.findByPk(product.id, {
    include: [{ model: ProductImage, as: 'images' }, { model: Category, as: 'category' }],
  });

  return success(res, { statusCode: 201, message: 'Tạo sản phẩm thành công', data: fullProduct });
});

/**
 * PUT /api/products/:id
 * Admin/SuperAdmin - cập nhật sản phẩm. Có thể thêm ảnh gallery mới.
 */
const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw ApiError.notFound('Không tìm thấy sản phẩm');

  const {
    name,
    categoryId,
    price,
    salePrice,
    quantity,
    material,
    color,
    size,
    description,
    isNew,
    isSale,
    isBest,
    status,
  } = req.body;

  if (name && name !== product.name) {
    product.slug = await generateUniqueSlug(name, Product, product.id);
    product.name = name;
  }

  if (categoryId !== undefined) product.categoryId = categoryId || null;
  if (price !== undefined) product.price = price;
  if (salePrice !== undefined) product.salePrice = salePrice || null;
  if (quantity !== undefined) product.quantity = quantity;
  if (material !== undefined) product.material = material;
  if (color !== undefined) product.color = color;
  if (size !== undefined) product.size = size;
  if (description !== undefined) product.description = description;
  if (isNew !== undefined) product.isNew = isNew === 'true' || isNew === true;
  if (isSale !== undefined) product.isSale = isSale === 'true' || isSale === true;
  if (isBest !== undefined) product.isBest = isBest === 'true' || isBest === true;
  if (status !== undefined) product.status = status;

  const thumbnailFile = req.files?.thumbnail?.[0];
  if (thumbnailFile) {
    product.thumbnail = `/uploads/products/${thumbnailFile.filename}`;
  }

  await product.save();

  const galleryFiles = req.files?.images || [];
  if (galleryFiles.length > 0) {
    const currentMax = (await ProductImage.max('sortOrder', { where: { productId: product.id } })) || 0;
    const imageRecords = galleryFiles.map((file, index) => ({
      productId: product.id,
      image: `/uploads/products/${file.filename}`,
      sortOrder: currentMax + index + 1,
    }));
    await ProductImage.bulkCreate(imageRecords);
  }

  const fullProduct = await Product.findByPk(product.id, {
    include: [{ model: ProductImage, as: 'images' }, { model: Category, as: 'category' }],
  });

  return success(res, { message: 'Cập nhật sản phẩm thành công', data: fullProduct });
});

/**
 * DELETE /api/products/:id
 */
const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) throw ApiError.notFound('Không tìm thấy sản phẩm');

  await product.destroy(); // Cascade sẽ tự xóa product_images liên quan
  return success(res, { message: 'Xóa sản phẩm thành công' });
});

/**
 * DELETE /api/products/:id/images/:imageId
 * Xóa 1 ảnh cụ thể trong gallery sản phẩm.
 */
const deleteProductImage = catchAsync(async (req, res) => {
  const { id, imageId } = req.params;
  const image = await ProductImage.findOne({ where: { id: imageId, productId: id } });
  if (!image) throw ApiError.notFound('Không tìm thấy ảnh');

  // Xóa file vật lý trên ổ đĩa (nếu tồn tại)
  const filePath = path.join(__dirname, '..', image.image.replace('/uploads', 'uploads'));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await image.destroy();
  return success(res, { message: 'Xóa ảnh thành công' });
});

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};
