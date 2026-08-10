/**
 * routes/index.jsx
 * ------------------------------------------------------
 * Định nghĩa toàn bộ route của hệ thống:
 * - Client routes: trang chủ, sản phẩm, giỏ hàng, tin tức, auth...
 * - Admin routes: dashboard, quản lý sản phẩm/danh mục/banner/tin tức/user/giao diện
 *   (được bảo vệ bởi ProtectedRoute, chỉ admin/superadmin/editor tùy trang)
 * ------------------------------------------------------
 */

import { createBrowserRouter } from 'react-router-dom';

import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Client pages
import HomePage from '../pages/client/HomePage';
import ProductListPage from '../pages/client/ProductListPage';
import ProductDetailPage from '../pages/client/ProductDetailPage';
import CartPage from '../pages/client/CartPage';
import NewsListPage from '../pages/client/NewsListPage';
import NewsDetailPage from '../pages/client/NewsDetailPage';
import CheckoutPage from '../pages/client/CheckoutPage';
import SepayPaymentPage from '../pages/client/SepayPaymentPage';
import OrderListPage from '../pages/client/OrderListPage';
import OrderDetailPage from '../pages/client/OrderDetailPage';

// Auth pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Admin pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import OrderManagePage from '../pages/admin/OrderManagePage';
import ProductManagePage from '../pages/admin/ProductManagePage';
import CategoryManagePage from '../pages/admin/CategoryManagePage';
import BannerManagePage from '../pages/admin/BannerManagePage';
import NewsManagePage from '../pages/admin/NewsManagePage';
import UserManagePage from '../pages/admin/UserManagePage';
import SettingsManagePage from '../pages/admin/SettingsManagePage';

import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  // ============ CLIENT ============
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'san-pham', element: <ProductListPage /> },
      { path: 'san-pham/:slug', element: <ProductDetailPage /> },
      { path: 'tin-tuc', element: <NewsListPage /> },
      { path: 'tin-tuc/:slug', element: <NewsDetailPage /> },
      { path: 'dang-nhap', element: <LoginPage /> },
      { path: 'dang-ky', element: <RegisterPage /> },
      {
        // Giỏ hàng, Thanh toán, Đơn hàng yêu cầu đăng nhập
        element: <ProtectedRoute redirectTo="/dang-nhap" />,
        children: [
          { path: 'gio-hang', element: <CartPage /> },
          { path: 'thanh-toan', element: <CheckoutPage /> },
          { path: 'thanh-toan/sepay/:orderCode', element: <SepayPaymentPage /> },
          { path: 'don-hang', element: <OrderListPage /> },
          { path: 'don-hang/:orderCode', element: <OrderDetailPage /> },
        ],
      },
    ],
  },

  // ============ ADMIN ============
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['superadmin', 'admin', 'editor']} redirectTo="/admin/login" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'orders', element: <OrderManagePage /> },
          { path: 'products', element: <ProductManagePage /> },
          { path: 'categories', element: <CategoryManagePage /> },
          { path: 'banners', element: <BannerManagePage /> },
          { path: 'news', element: <NewsManagePage /> },
          {
            // Quản lý user: CHỈ admin/superadmin (editor không được vào)
            element: <ProtectedRoute allowedRoles={['superadmin', 'admin']} redirectTo="/admin" />,
            children: [
              { path: 'users', element: <UserManagePage /> },
              { path: 'settings', element: <SettingsManagePage /> },
            ],
          },
        ],
      },
    ],
  },

  // ============ 404 ============
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
