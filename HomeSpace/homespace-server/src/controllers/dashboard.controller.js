/**
 * controllers/dashboard.controller.js
 * ------------------------------------------------------
 * Cung cấp số liệu thống kê tổng quan + dữ liệu biểu đồ
 * (Recharts) cho trang Admin Dashboard.
 * ------------------------------------------------------
 */

const { Op, fn, col, literal } = require('sequelize');
const { Product, Category, User, Order, OrderItem } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

/**
 * GET /api/dashboard/stats
 * 4 card thống kê tổng quan: tổng sản phẩm, danh mục, người dùng, đơn hàng.
 */
const getStats = catchAsync(async (req, res) => {
  const [totalProducts, totalCategories, totalUsers, totalOrders, revenueResult] = await Promise.all([
    Product.count(),
    Category.count(),
    User.count(),
    Order.count(),
    Order.sum('totalAmount', { where: { status: { [Op.ne]: 'cancelled' } } }),
  ]);

  return success(res, {
    message: 'Lấy thống kê tổng quan thành công',
    data: {
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue: revenueResult || 0,
    },
  });
});

/**
 * GET /api/dashboard/revenue-chart?period=month
 * Biểu đồ doanh thu theo ngày trong 30 ngày gần nhất (mặc định).
 */
const getRevenueChart = catchAsync(async (req, res) => {
  const days = Number(req.query.days) || 30;
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const rows = await Order.findAll({
    attributes: [
      [fn('DATE', col('created_at')), 'date'],
      [fn('SUM', col('total_amount')), 'revenue'],
      [fn('COUNT', col('id')), 'orderCount'],
    ],
    where: {
      created_at: { [Op.gte]: fromDate },
      status: { [Op.ne]: 'cancelled' },
    },
    group: [fn('DATE', col('created_at'))],
    order: [[fn('DATE', col('created_at')), 'ASC']],
    raw: true,
  });

  return success(res, { message: 'Lấy dữ liệu biểu đồ doanh thu thành công', data: rows });
});

/**
 * GET /api/dashboard/order-status-chart
 * Biểu đồ phân bổ đơn hàng theo trạng thái (pending/confirmed/shipping/completed/cancelled).
 */
const getOrderStatusChart = catchAsync(async (req, res) => {
  const rows = await Order.findAll({
    attributes: ['status', [fn('COUNT', col('id')), 'count']],
    group: ['status'],
    raw: true,
  });

  return success(res, { message: 'Lấy dữ liệu biểu đồ đơn hàng thành công', data: rows });
});

/**
 * GET /api/dashboard/top-products?limit=5
 * Top sản phẩm bán chạy nhất (dựa trên order_items).
 */
const getTopProducts = catchAsync(async (req, res) => {
  const limit = Number(req.query.limit) || 5;

  const rows = await OrderItem.findAll({
    attributes: [
      'productId',
      [fn('SUM', col('OrderItem.quantity')), 'totalSold'],
      [fn('SUM', literal('`OrderItem`.`quantity` * `OrderItem`.`price`')), 'totalRevenue'],
    ],
    include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'thumbnail', 'slug'] }],
    group: ['productId', 'product.id'],
    order: [[literal('totalSold'), 'DESC']],
    limit,
  });

  return success(res, { message: 'Lấy top sản phẩm bán chạy thành công', data: rows });
});

/**
 * GET /api/dashboard/top-categories?limit=5
 * Top danh mục bán chạy nhất (dựa trên order_items join products).
 */
const getTopCategories = catchAsync(async (req, res) => {
  const limit = Number(req.query.limit) || 5;

  const rows = await OrderItem.findAll({
    attributes: [[fn('SUM', col('OrderItem.quantity')), 'totalSold']],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: [],
        include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
      },
    ],
    group: ['product.category.id'],
    order: [[literal('totalSold'), 'DESC']],
    limit,
    raw: true,
    nest: true,
  });

  return success(res, { message: 'Lấy top danh mục bán chạy thành công', data: rows });
});

module.exports = { getStats, getRevenueChart, getOrderStatusChart, getTopProducts, getTopCategories };
