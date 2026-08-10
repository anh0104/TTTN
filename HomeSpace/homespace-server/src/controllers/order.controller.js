/**
 * controllers/order.controller.js
 * ------------------------------------------------------
 * Controller xử lý Đơn hàng (Order):
 * - Tạo đơn hàng từ Giỏ hàng hoặc danh sách items.
 * - Lấy danh sách đơn hàng của tôi.
 * - Lấy chi tiết đơn hàng theo mã đơn orderCode.
 * - Hủy đơn hàng (khi ở trạng thái pending/unpaid).
 * - Admin: Quản lý toàn bộ đơn hàng và cập nhật trạng thái.
 * ------------------------------------------------------
 */

const { Order, OrderItem, Cart, CartItem, Product, sequelize } = require('../models');
const { Op } = require('sequelize');

// Helper sinh mã đơn hàng unique (VD: HS849201)
const generateOrderCode = () => {
  const dateStr = Date.now().toString().slice(-6);
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `HS${dateStr}${randomNum}`;
};

/**
 * POST /api/orders
 * Tạo đơn hàng mới từ giỏ hàng hoặc items truyền vào
 */
exports.createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user ? req.user.id : null;
    const { fullName, phone, address, note, paymentMethod = 'cod', items: customItems } = req.body;

    if (!fullName || !phone || !address) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ Tên, Số điện thoại và Địa chỉ nhận hàng',
      });
    }

    let orderItemsData = [];
    let totalAmount = 0;

    // 1. Lấy sản phẩm từ customItems hoặc từ Cart trong DB
    if (customItems && Array.isArray(customItems) && customItems.length > 0) {
      for (const item of customItems) {
        const product = await Product.findByPk(item.productId, { transaction });
        if (!product || product.status === 'inactive') {
          await transaction.rollback();
          return res.status(400).json({ success: false, message: `Sản phẩm "${product ? product.name : item.productId}" không hợp lệ hoặc đã ngừng bán` });
        }
        if (product.quantity < item.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Sản phẩm "${product.name}" chỉ còn ${product.quantity} trong kho`,
          });
        }
        const unitPrice = product.salePrice ? parseFloat(product.salePrice) : parseFloat(product.price);
        totalAmount += unitPrice * item.quantity;

        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          price: unitPrice,
          quantity: item.quantity,
        });

        // Trừ tồn kho
        await product.update(
          {
            quantity: Math.max(0, product.quantity - item.quantity),
          },
          { transaction }
        );
      }
    } else {
      // Lấy từ giỏ hàng người dùng
      if (!userId) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Giỏ hàng trống hoặc chưa đăng nhập' });
      }

      const cart = await Cart.findOne({
        where: { userId },
        include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
        transaction,
      });

      if (!cart || !cart.items || cart.items.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Giỏ hàng của bạn đang trống' });
      }

      for (const cItem of cart.items) {
        const product = cItem.product;
        if (!product || product.status === 'inactive') {
          await transaction.rollback();
          return res.status(400).json({ success: false, message: `Sản phẩm "${product ? product.name : cItem.productId}" không hợp lệ hoặc đã ngừng bán` });
        }
        if (product.quantity < cItem.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Sản phẩm "${product.name}" chỉ còn ${product.quantity} sản phẩm`,
          });
        }

        const unitPrice = product.salePrice ? parseFloat(product.salePrice) : parseFloat(product.price);
        totalAmount += unitPrice * cItem.quantity;

        orderItemsData.push({
          productId: product.id,
          productName: product.name,
          price: unitPrice,
          quantity: cItem.quantity,
        });

        // Trừ kho
        await product.update(
          {
            quantity: Math.max(0, product.quantity - cItem.quantity),
          },
          { transaction }
        );
      }

      // Xóa tất cả các món trong giỏ hàng sau khi tạo đơn thành công
      await CartItem.destroy({ where: { cartId: cart.id }, transaction });
    }

    // 2. Tạo Order
    const orderCode = generateOrderCode();
    const order = await Order.create(
      {
        userId,
        orderCode,
        fullName,
        phone,
        address,
        note,
        totalAmount,
        paymentMethod: paymentMethod === 'bank_transfer' ? 'bank_transfer' : 'cod',
        paymentStatus: 'unpaid',
        status: 'pending',
      },
      { transaction }
    );

    // 3. Tạo OrderItems
    const itemsToCreate = orderItemsData.map((item) => ({
      ...item,
      orderId: order.id,
    }));
    await OrderItem.bulkCreate(itemsToCreate, { transaction });

    await transaction.commit();

    // Lấy lại thông tin order đầy đủ kèm items
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'thumbnail'] }],
        },
      ],
    });

    // Tự động gửi thông báo thực tế cho người dùng
    const { createNotificationHelper } = require('./notification.controller');
    await createNotificationHelper({
      userId,
      title: 'Tạo đơn hàng thành công! 🛒',
      message: `Đơn hàng ${orderCode} với tổng tiền ${totalAmount.toLocaleString('vi-VN')}đ đã được tạo thành công.`,
      type: 'order',
      link: `/don-hang/${orderCode}`,
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo đơn hàng thành công!',
      data: fullOrder,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * GET /api/orders/my-orders
 * Lấy danh sách đơn hàng của user đang đăng nhập
 */
exports.getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'thumbnail'] }],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/:orderCode
 * Lấy chi tiết đơn hàng theo orderCode (HS...)
 */
exports.getOrderByCode = async (req, res, next) => {
  try {
    const { orderCode } = req.params;
    const order = await Order.findOne({
      where: { orderCode },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'thumbnail'] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/orders/:orderCode/cancel
 * Hủy đơn hàng nếu chưa xử lý
 */
exports.cancelOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { orderCode } = req.params;
    const userId = req.user ? req.user.id : null;

    const whereCondition = { orderCode };
    if (userId && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      whereCondition.userId = userId;
    }

    const order = await Order.findOne({
      where: whereCondition,
      include: [{ model: OrderItem, as: 'items' }],
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    if (order.status !== 'pending') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Đơn hàng không thể hủy ở trạng thái hiện tại' });
    }

    // Hoàn lại kho sản phẩm
    for (const item of order.items) {
      if (item.productId) {
        const product = await Product.findByPk(item.productId, { transaction });
        if (product) {
          await product.update(
            {
              quantity: product.quantity + item.quantity,
              soldCount: Math.max(0, product.soldCount - item.quantity),
            },
            { transaction }
          );
        }
      }
    }

    await order.update({ status: 'cancelled' }, { transaction });

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: 'Đã hủy đơn hàng thành công',
      data: order,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

/**
 * GET /api/orders/admin/all
 * Admin: Lấy danh sách tất cả các đơn hàng
 */
exports.getAllOrdersAdmin = async (req, res, next) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    if (search) {
      where[Op.or] = [
        { orderCode: { [Op.like]: `%${search}%` } },
        { fullName: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows: orders, count: total } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'thumbnail'] }],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    return res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/orders/admin/:id/status
 * Admin: Cập nhật trạng thái đơn hàng và thanh toán
 */
exports.updateOrderStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === 'paid' && !order.paidAt) {
        updateData.paidAt = new Date();
      }
    }

    const STATUS_MAP = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao hàng 🚚',
      completed: 'Hoàn tất / Đã giao hàng thành công 🎉',
      cancelled: 'Đã hủy ❌',
    };

    if (status && status !== order.status) {
      const { createNotificationHelper } = require('./notification.controller');
      await createNotificationHelper({
        userId: order.userId,
        title: `Cập nhật đơn hàng ${order.orderCode}`,
        message: `Đơn hàng ${order.orderCode} của bạn đã chuyển sang trạng thái: ${STATUS_MAP[status] || status}.`,
        type: 'order',
        link: `/don-hang/${order.orderCode}`,
      });
    }

    await order.update(updateData);

    return res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
