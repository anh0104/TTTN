/**
 * controllers/cart.controller.js
 * ------------------------------------------------------
 * Giỏ hàng: thêm, xóa, cập nhật số lượng, tính tổng tiền.
 * Giỏ hàng được lưu trong DB (carts + cart_items), gắn với user_id
 * lấy từ token (yêu cầu đã đăng nhập - verifyToken).
 * ------------------------------------------------------
 */

const { Cart, CartItem, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

/**
 * Helper: lấy (hoặc tự tạo nếu chưa có) giỏ hàng của user hiện tại.
 */
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) cart = await Cart.create({ userId });
  return cart;
};

/**
 * Helper: tính tổng tiền giỏ hàng (dùng giá sale_price nếu có).
 */
const calculateCartTotal = (items) =>
  items.reduce((sum, item) => {
    const unitPrice = item.product.salePrice ?? item.product.price;
    return sum + Number(unitPrice) * item.quantity;
  }, 0);

/**
 * GET /api/cart
 * Lấy giỏ hàng hiện tại của user đã đăng nhập.
 */
const getCart = catchAsync(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);

  const items = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product, as: 'product' }],
    order: [['created_at', 'ASC']],
  });

  return success(res, {
    message: 'Lấy giỏ hàng thành công',
    data: { cartId: cart.id, items, totalAmount: calculateCartTotal(items), totalItems: items.length },
  });
});

/**
 * POST /api/cart/items
 * Thêm sản phẩm vào giỏ. Nếu sản phẩm đã có trong giỏ -> cộng dồn số lượng.
 */
const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findByPk(productId);
  if (!product) throw ApiError.notFound('Không tìm thấy sản phẩm');
  if (product.quantity < quantity) throw ApiError.badRequest('Số lượng sản phẩm trong kho không đủ');

  const cart = await getOrCreateCart(req.user.id);

  let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (cartItem) {
    cartItem.quantity += Number(quantity);
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
  }

  return success(res, { statusCode: 201, message: 'Thêm vào giỏ hàng thành công', data: cartItem });
});

/**
 * PUT /api/cart/items/:itemId
 * Cập nhật số lượng 1 sản phẩm trong giỏ.
 */
const updateCartItem = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const cart = await getOrCreateCart(req.user.id);

  const cartItem = await CartItem.findOne({ where: { id: req.params.itemId, cartId: cart.id } });
  if (!cartItem) throw ApiError.notFound('Không tìm thấy sản phẩm trong giỏ hàng');

  const product = await Product.findByPk(cartItem.productId);
  if (product && product.quantity < quantity) {
    throw ApiError.badRequest('Số lượng sản phẩm trong kho không đủ');
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  return success(res, { message: 'Cập nhật giỏ hàng thành công', data: cartItem });
});

/**
 * DELETE /api/cart/items/:itemId
 * Xóa 1 sản phẩm khỏi giỏ hàng.
 */
const removeCartItem = catchAsync(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);

  const cartItem = await CartItem.findOne({ where: { id: req.params.itemId, cartId: cart.id } });
  if (!cartItem) throw ApiError.notFound('Không tìm thấy sản phẩm trong giỏ hàng');

  await cartItem.destroy();
  return success(res, { message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
});

/**
 * DELETE /api/cart
 * Xóa toàn bộ giỏ hàng (dùng sau khi checkout thành công).
 */
const clearCart = catchAsync(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  await CartItem.destroy({ where: { cartId: cart.id } });
  return success(res, { message: 'Đã xóa toàn bộ giỏ hàng' });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
