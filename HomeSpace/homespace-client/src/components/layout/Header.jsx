/**
 * components/layout/Header.jsx
 * ------------------------------------------------------
 * Header đầy đủ: logo, menu điều hướng, tìm kiếm, giỏ hàng (badge số lượng),
 * dark mode toggle, user menu (đăng nhập/đăng ký hoặc dropdown tài khoản),
 * responsive với menu mobile dạng drawer.
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Sun, Moon, Menu, X, User, LogOut, LayoutDashboard, Package, Bell, Sparkles, Truck, ShieldCheck, CheckCheck, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import useCart from '../../hooks/useCart';
import { logoutUser } from '../../redux/slices/authSlice';
import { resetCart } from '../../redux/slices/cartSlice';
import { fetchSettings } from '../../redux/slices/settingSlice';
import { getImageUrl, formatDate } from '../../utils/format';
import notificationService from '../../services/notificationService';
import AutoLogo from '../common/AutoLogo';
import NotificationDropdown from './NotificationDropdown';
import NotificationDetailModal from './NotificationDetailModal';

const navLinks = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/tin-tuc', label: 'Tin tức' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Trạng thái thông báo thực tế từ Backend DB
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotif, setSelectedNotif] = useState(null);

  const { isAuthenticated, user, isAdmin } = useAuth();
  const { isDark, toggle } = useTheme();
  const { totalItems } = useCart();
  const logo = useSelector((state) => state.setting?.settings?.logo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await notificationService.getNotifications();
      if (res.data.success) {
        setNotifications(res.data.data || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.warn('Lỗi tải danh sách thông báo:', err);
    }
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
    // Polling tự động 8s/lần để luôn cập nhật số lượng chưa đọc mới nhất
    const interval = setInterval(fetchNotifications, 8000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(searchValue.trim() ? `/san-pham?search=${encodeURIComponent(searchValue.trim())}` : '/san-pham');
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(resetCart());
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await notificationService.markAsRead(notif.id);
        setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error(err);
      }
    }
    setNotifMenuOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-base md:text-lg font-medium transition-all ${
      isActive
        ? 'text-wood dark:text-accent font-semibold border-b-2 border-wood dark:border-accent pb-0.5'
        : 'text-dark/80 hover:text-wood dark:text-gray-light/80 dark:hover:text-accent'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-[#eaf3ec]/95 backdrop-blur-md transition-all duration-300 dark:bg-dark/95 ${
        scrolled ? 'shadow-md border-b border-wood/20 dark:border-gray-light/10 py-1' : 'border-b border-wood/15 dark:border-gray-light/10 py-2'
      }`}
    >
      <div className={`container-custom flex items-center justify-between gap-6 transition-all duration-300 ${
        scrolled ? 'h-16 md:h-18' : 'h-20 md:h-22'
      }`}>
        {/* Logo với tự động xóa nền trắng */}
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <AutoLogo
            src={getImageUrl(logo)}
            alt="HomeSpace Logo"
            className={scrolled ? 'h-10 md:h-12 w-auto object-contain' : 'h-12 md:h-16 w-auto object-contain'}
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Search desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden max-w-xs flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full rounded-full border border-wood/15 bg-gray-light py-2 pl-9 pr-3 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800 dark:focus:border-accent"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Nút & Dropdown Thông Báo (Gắn trực tiếp ngay dưới Icon Chuông) */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifMenuOpen((v) => !v);
                fetchNotifications();
              }}
              aria-label="Thông báo"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-dark/70 transition-colors hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/10"
              title="Thông báo hệ thống & đơn hàng"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow animate-pulse">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Menu thả xuống ngay bên dưới Icon Chuông */}
            <NotificationDropdown
              isOpen={notifMenuOpen}
              onClose={() => setNotifMenuOpen(false)}
              notifications={notifications}
              unreadCount={unreadCount}
              onRefresh={fetchNotifications}
              onSelectNotification={(notif) => setSelectedNotif(notif)}
            />
          </div>

          {/* Modal Chi Tiết Thông Báo (Nổi giữa màn hình + Làm mờ tối phông nền phía sau) */}
          <NotificationDetailModal
            notification={selectedNotif}
            onClose={() => setSelectedNotif(null)}
          />

          <Link
            to="/gio-hang"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-dark/70 transition-colors hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/10"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart size={19} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-wood px-1 text-[10px] font-bold text-white dark:bg-accent dark:text-dark">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-dark/70 transition-colors hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/10"
              aria-label="Tài khoản"
              title="Tài khoản & Cài đặt"
            >
              <User size={19} />
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-56 animate-slide-up rounded-2xl border border-wood/10 bg-white py-2 shadow-xl dark:border-gray-light/10 dark:bg-neutral-900">
                  {isAuthenticated ? (
                    <>
                      <div className="border-b border-wood/10 px-4 py-2.5 dark:border-gray-light/10">
                        <p className="truncate text-sm font-bold text-wood dark:text-accent">{user?.name}</p>
                        <p className="truncate text-xs text-dark/60 dark:text-gray-light/60">{user?.email}</p>
                      </div>
                      <Link
                        to="/don-hang"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-dark/80 hover:bg-gray-light dark:text-gray-light/80 dark:hover:bg-white/5"
                      >
                        <Package size={16} /> Đơn hàng của tôi
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-wood dark:text-accent hover:bg-gray-light dark:hover:bg-white/5"
                        >
                          <LayoutDashboard size={16} /> Trang quản trị
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dang-nhap"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        to="/dang-ky"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}

                  {/* Nút chuyển đổi Giao diện Sáng / Tối */}
                  <div className="border-t border-wood/10 mt-1 pt-1 dark:border-gray-light/10">
                    <button
                      onClick={() => {
                        toggle();
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-dark/80 hover:bg-gray-light dark:text-gray-light/80 dark:hover:bg-white/5"
                      title="Chuyển đổi giao diện sáng / tối"
                    >
                      <span className="flex items-center gap-2.5">
                        {isDark ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-indigo-500" />}
                        {isDark ? 'Giao diện sáng' : 'Giao diện tối'}
                      </span>
                      <span className="text-[10px] font-bold uppercase rounded-md bg-wood/10 px-1.5 py-0.5 text-wood dark:bg-accent/20 dark:text-accent">
                        {isDark ? 'Dark' : 'Light'}
                      </span>
                    </button>
                  </div>

                  {isAuthenticated && (
                    <div className="border-t border-wood/10 pt-1 dark:border-gray-light/10">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-dark/70 hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/10 md:hidden"
            aria-label="Mở menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-dark/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] animate-slide-up flex-col bg-white p-6 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              {logo ? (
                <img src={getImageUrl(logo)} alt="HomeSpace Logo" className="h-10 w-auto object-contain" />
              ) : (
                <span className="heading-display text-xl font-bold text-wood dark:text-accent">HomeSpace</span>
              )}
              <button onClick={() => setMobileOpen(false)} aria-label="Đóng menu">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full rounded-full border border-wood/15 bg-gray-light py-2 pl-9 pr-3 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-800"
                />
              </div>
            </form>

            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-wood/10 pt-6 dark:border-gray-light/10">
              {isAuthenticated ? (
                <>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <Link to="/don-hang" onClick={() => setMobileOpen(false)} className="text-sm font-medium hover:text-wood dark:hover:text-accent">
                    Đơn hàng của tôi
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm text-wood dark:text-accent">
                      Trang quản trị
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-left text-sm text-red-600">
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/dang-nhap" onClick={() => setMobileOpen(false)} className="text-sm">
                    Đăng nhập
                  </Link>
                  <Link to="/dang-ky" onClick={() => setMobileOpen(false)} className="text-sm">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
