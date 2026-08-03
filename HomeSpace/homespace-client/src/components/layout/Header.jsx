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
import { Search, ShoppingCart, Sun, Moon, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import useCart from '../../hooks/useCart';
import { logoutUser } from '../../redux/slices/authSlice';
import { resetCart } from '../../redux/slices/cartSlice';

const navLinks = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/tin-tuc', label: 'Tin tức' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user, isAdmin } = useAuth();
  const { isDark, toggle } = useTheme();
  const { totalItems } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-wood dark:text-accent'
        : 'text-dark/70 hover:text-wood dark:text-gray-light/70 dark:hover:text-accent'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow dark:bg-dark/95 ${
        scrolled ? 'shadow-sm' : ''
      } border-b border-wood/10 dark:border-gray-light/10`}
    >
      <div className="container-custom flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="heading-display shrink-0 text-xl font-semibold text-wood dark:text-accent">
          HomeSpace
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 md:flex">
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            aria-label="Chuyển đổi giao diện sáng/tối"
            className="flex h-10 w-10 items-center justify-center rounded-full text-dark/70 transition-colors hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/10"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

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
            >
              <User size={19} />
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-52 animate-slide-up rounded-xl border border-wood/10 bg-white py-2 shadow-lg dark:border-gray-light/10 dark:bg-neutral-900">
                  {isAuthenticated ? (
                    <>
                      <div className="border-b border-wood/10 px-4 py-2 dark:border-gray-light/10">
                        <p className="truncate text-sm font-medium">{user?.name}</p>
                        <p className="truncate text-xs text-dark/50 dark:text-gray-light/50">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-light dark:hover:bg-white/5"
                        >
                          <LayoutDashboard size={15} /> Trang quản trị
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        <LogOut size={15} /> Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dang-nhap"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        to="/dang-ky"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-light dark:hover:bg-white/5"
                      >
                        Đăng ký
                      </Link>
                    </>
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
              <span className="heading-display text-lg font-semibold text-wood dark:text-accent">HomeSpace</span>
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
