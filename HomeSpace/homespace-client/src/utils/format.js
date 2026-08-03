/**
 * utils/format.js
 * ------------------------------------------------------
 * Các hàm định dạng dùng chung: tiền tệ VNĐ, ngày tháng, phần trăm giảm giá.
 * ------------------------------------------------------
 */

/**
 * Định dạng số thành tiền tệ VNĐ. VD: 1500000 -> "1.500.000₫"
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

/**
 * Định dạng ngày theo kiểu Việt Nam. VD: "29/07/2026"
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    new Date(date)
  );
};

/**
 * Tính phần trăm giảm giá từ giá gốc và giá sale. VD: 1000000, 800000 -> 20
 */
export const calculateDiscountPercent = (price, salePrice) => {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
};

/**
 * Ghép đường dẫn ảnh tương đối (VD: "/uploads/products/x.jpg") từ backend
 * thành URL đầy đủ để hiển thị trên trình duyệt.
 */
export const getImageUrl = (path) => {
  if (!path) return '/placeholder-product.svg';
  if (path.startsWith('http')) return path;
  const serverBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(
    '/api',
    ''
  );
  return `${serverBaseUrl}${path}`;
};

/**
 * Rút gọn văn bản dài, thêm dấu "..." (dùng cho mô tả ngắn trong card sản phẩm)
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
};
