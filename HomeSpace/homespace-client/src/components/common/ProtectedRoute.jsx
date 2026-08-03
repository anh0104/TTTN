/**
 * components/common/ProtectedRoute.jsx
 * ------------------------------------------------------
 * Bọc quanh các route cần đăng nhập (và tùy chọn giới hạn role).
 * - Chưa đăng nhập -> chuyển tới trang login tương ứng.
 * - Đã đăng nhập nhưng sai role -> chuyển về trang chủ (403 tại phía UI).
 * ------------------------------------------------------
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * @param {string[]} allowedRoles - Danh sách role được phép, để trống = chỉ cần đăng nhập.
 * @param {string} redirectTo - Đường dẫn chuyển hướng khi chưa đăng nhập.
 */
const ProtectedRoute = ({ allowedRoles = [], redirectTo = '/dang-nhap' }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
