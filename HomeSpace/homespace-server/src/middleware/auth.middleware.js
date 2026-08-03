/**
 * middleware/auth.middleware.js
 * ------------------------------------------------------
 * - verifyToken: kiểm tra Access Token trong header Authorization,
 *   gắn thông tin user đã giải mã vào req.user.
 * - authorize(...roles): kiểm tra req.user.role có nằm trong danh sách
 *   role được phép hay không (dùng SAU verifyToken).
 * ------------------------------------------------------
 */

const { verifyAccessToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const verifyToken = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Không tìm thấy token xác thực');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    // decoded = { id, role, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    throw ApiError.unauthorized(
      err.name === 'TokenExpiredError' ? 'Token đã hết hạn, vui lòng đăng nhập lại' : 'Token không hợp lệ'
    );
  }
});

/**
 * Middleware phân quyền - CHỈ dùng sau verifyToken.
 * VD: authorize('superadmin', 'admin') -> chỉ 2 role này được truy cập.
 */
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw ApiError.unauthorized('Bạn cần đăng nhập để thực hiện thao tác này');
  }
  if (!allowedRoles.includes(req.user.role)) {
    throw ApiError.forbidden('Bạn không có quyền thực hiện thao tác này');
  }
  next();
};

/**
 * Middleware xác thực KHÔNG bắt buộc — nếu có token hợp lệ thì gắn req.user,
 * nếu không có/token sai thì vẫn cho qua (dùng cho route public nhưng
 * muốn biết user có đăng nhập hay không, VD: trang chủ cá nhân hoá).
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyAccessToken(token);
  } catch (err) {
    // Bỏ qua lỗi, coi như khách chưa đăng nhập
  }
  next();
};

module.exports = { verifyToken, authorize, optionalAuth };
