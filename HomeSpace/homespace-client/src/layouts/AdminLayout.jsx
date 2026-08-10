/**
 * layouts/AdminLayout.jsx
 * ------------------------------------------------------
 * Layout bao ngoài toàn bộ trang Admin (Sidebar + Topbar + nội dung).
 * Responsive: sidebar cố định trên desktop/tablet (md+), chuyển thành
 * drawer trượt ra khi bấm hamburger trên mobile (<md).
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Image,
  Newspaper,
  Users,
  Settings,
  Sun,
  Moon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
} from 'lucide-react';

import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { logoutUser } from '../redux/slices/authSlice';
import { getImageUrl } from '../utils/format';
import AutoLogo from '../components/common/AutoLogo';
import NotificationBroadcastModal from '../components/admin/NotificationBroadcastModal';

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/orders', label: 'Đơn hàng', icon: ShoppingBag, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/products', label: 'Sản phẩm', icon: Package, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/categories', label: 'Danh mục', icon: FolderTree, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/banners', label: 'Banner', icon: Image, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/news', label: 'Tin tức', icon: Newspaper, roles: ['superadmin', 'admin', 'editor'] },
  { to: '/admin/users', label: 'Người dùng', icon: Users, roles: ['superadmin', 'admin'] },
  { to: '/admin/settings', label: 'Giao diện', icon: Settings, roles: ['superadmin', 'admin'] },
];

const SidebarContent = ({ visibleMenu, onNavigate }) => {
  const logo = useSelector((state) => state.setting?.settings?.logo);

  return (
    <>
      <div className="flex h-20 items-center justify-center px-4 border-b border-wood/10 dark:border-gray-light/10">
        <AutoLogo
          src={getImageUrl(logo)}
          alt="HomeSpace Admin Logo"
          className="h-12 w-auto object-contain max-h-[85%]"
          fallbackText="HomeSpace Admin"
        />
      </div>
      <nav className="mt-4 space-y-1 px-3">
        {visibleMenu.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-wood text-white shadow-sm dark:bg-accent dark:text-dark font-bold'
                  : 'text-dark/70 hover:bg-gray-light hover:text-wood dark:text-gray-light/70 dark:hover:bg-white/10 dark:hover:text-accent'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-wood/10 dark:border-gray-light/10">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 text-xs font-medium text-dark/60 hover:text-wood dark:text-gray-light/60 dark:hover:text-accent"
        >
          <ExternalLink size={14} /> Xem website
        </Link>
      </div>
    </>
  );
};

const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = user?.role || 'superadmin';
  const visibleMenu = menuItems.filter((item) => item.roles.includes(userRole));

  // Đóng drawer mobile mỗi khi chuyển trang
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/admin/login');
  };

  const currentLabel = visibleMenu.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))?.label;

  return (
    <div className="flex min-h-screen bg-gray-light dark:bg-dark">
      {/* Sidebar - desktop/tablet: luôn hiện. Mobile: ẩn mặc định */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-wood/15 bg-white dark:border-gray-light/10 dark:bg-neutral-900 md:flex">
        <SidebarContent visibleMenu={visibleMenu} />
      </aside>

      {/* Sidebar drawer - chỉ hiện trên mobile khi bấm hamburger */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-dark/50" onClick={closeMobileSidebar} />
          <div className="absolute left-0 top-0 flex h-full w-64 max-w-[85vw] animate-slide-up flex-col bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between px-4 pt-3">
              <span className="text-xs uppercase tracking-wide text-dark/40 dark:text-gray-light/40">Menu</span>
              <button onClick={closeMobileSidebar} aria-label="Đóng menu" className="p-1">
                <X size={20} />
              </button>
            </div>
            <SidebarContent visibleMenu={visibleMenu} onNavigate={closeMobileSidebar} />
          </div>
        </div>
      )}

      {/* Nội dung chính */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-2 border-b border-wood/15 bg-white px-4 dark:border-gray-light/10 dark:bg-neutral-900 sm:px-6">
          {/* Hamburger - chỉ hiện trên mobile */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-dark/60 hover:bg-gray-light dark:text-gray-light/60 dark:hover:bg-white/10 md:hidden"
            aria-label="Mở menu"
          >
            <Menu size={19} />
          </button>

          {/* Tiêu đề trang hiện tại - chỉ hiện trên mobile thay cho tên đầy đủ */}
          <span className="truncate font-medium md:hidden">{currentLabel}</span>

          <div className="ml-auto flex items-center gap-3">
            {/* Nút phát thông báo của Admin */}
            <button
              onClick={() => setBroadcastModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-wood/10 px-3.5 py-1.5 text-xs font-bold text-wood hover:bg-wood hover:text-white dark:bg-accent/20 dark:text-accent dark:hover:bg-accent dark:hover:text-dark transition-all shadow-sm"
              title="Phát thông báo cho người dùng"
            >
              <Bell size={14} />
              <span>Phát thông báo</span>
            </button>

            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-full text-dark/60 hover:bg-gray-light dark:text-gray-light/60 dark:hover:bg-white/10"
              aria-label="Chuyển đổi giao diện"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div className="mx-1 hidden h-6 w-px bg-wood/10 dark:bg-gray-light/10 sm:block" />

            <span className="hidden text-sm text-dark/70 dark:text-gray-light/70 sm:inline">
              Xin chào, <strong>{user?.name}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full text-dark/60 hover:bg-red-50 hover:text-red-600 dark:text-gray-light/60 dark:hover:bg-red-950"
              aria-label="Đăng xuất"
            >
              <LogOut size={17} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Modal Admin Phát Hành Thông Báo */}
      <NotificationBroadcastModal
        isOpen={broadcastModalOpen}
        onClose={() => setBroadcastModalOpen(false)}
      />
    </div>
  );
};

export default AdminLayout;
