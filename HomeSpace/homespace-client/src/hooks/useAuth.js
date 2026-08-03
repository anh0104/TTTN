/**
 * hooks/useAuth.js
 * ------------------------------------------------------
 * Hook tiện ích để lấy nhanh thông tin đăng nhập từ Redux store
 * mà không cần import useSelector + auth state path ở mọi nơi.
 * ------------------------------------------------------
 */

import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, accessToken, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const hasRole = (...roles) => isAuthenticated && user && roles.includes(user.role);
  const isAdmin = hasRole('superadmin', 'admin');

  return { user, accessToken, isAuthenticated, loading, error, hasRole, isAdmin };
};

export default useAuth;
