/**
 * utils/ApiError.js
 * ------------------------------------------------------
 * Class lỗi tuỳ chỉnh, kế thừa từ Error mặc định của JS.
 * Dùng để throw lỗi có statusCode rõ ràng trong controllers/services,
 * sau đó middleware errorHandler sẽ bắt và trả về response chuẩn.
 * ------------------------------------------------------
 */

class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors; // Dùng cho lỗi validation (mảng chi tiết lỗi)
    this.isOperational = true; // Đánh dấu đây là lỗi "biết trước", không phải bug hệ thống

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Yêu cầu không hợp lệ', errors = []) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = 'Bạn cần đăng nhập để thực hiện thao tác này') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Bạn không có quyền thực hiện thao tác này') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Không tìm thấy dữ liệu') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Dữ liệu đã tồn tại') {
    return new ApiError(409, message);
  }

  static internal(message = 'Lỗi hệ thống, vui lòng thử lại sau') {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
