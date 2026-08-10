/**
 * components/layout/AnnouncementBar.jsx
 * ------------------------------------------------------
 * Thanh Thông Báo Đầu Trang (Top Announcement Bar):
 * - Màu xanh Forest Green & Vàng đồng đậm sắc nét
 * - Tự động trượt các thông báo nổi bật (Khuyến mãi, Vận chuyển, Thanh toán SePay)
 * - Nút đóng an toàn cho người dùng
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, X, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  {
    icon: Sparkles,
    text: 'Bộ sưu tập Minimal Luxury 2026 hoàn toàn mới - Giảm ngay 15% cho đơn hàng đầu tiên!',
    link: '/san-pham?isNew=true',
    badge: 'MỚI',
  },
  {
    icon: Truck,
    text: 'Miễn phí giao hàng & lắp đặt tận nhà toàn quốc cho đơn từ 5.000.000đ',
    link: '/san-pham',
    badge: 'MIỄN PHÍ SHIP',
  },
  {
    icon: ShieldCheck,
    text: 'Thanh toán QR SePay VietinBank tự động 24/7 - Xác nhận đơn hàng tức thì',
    link: '/san-pham',
    badge: 'SEPAY 24/7',
  },
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="relative z-50 bg-[#1e3b2b] text-white border-b border-accent/30 shadow-sm transition-all duration-300">
      <div className="container-custom flex h-10 items-center justify-between gap-4 text-xs sm:text-sm font-medium">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center md:justify-start">
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-dark shadow-sm">
            <Bell size={10} className="animate-bounce" /> {current.badge}
          </span>
          
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <IconComponent size={14} className="shrink-0 text-accent" />
            <span className="truncate font-semibold text-white/95">{current.text}</span>
          </div>

          {current.link && (
            <Link
              to={current.link}
              className="hidden shrink-0 items-center gap-0.5 text-accent hover:underline sm:inline-flex font-bold"
            >
              Xem ngay <ChevronRight size={12} />
            </Link>
          )}
        </div>

        <button
          onClick={() => setVisible(false)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Đóng thông báo"
          title="Đóng thông báo"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
