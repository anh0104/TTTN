/**
 * components/layout/NotificationDropdown.jsx
 * ------------------------------------------------------
 * Dropdown Menu Thông Báo gắn ngay bên dưới icon Chuông (Bell Icon) trên Header.
 * - Không làm mờ Header hay toàn trang.
 * - Hiển thị danh sách thông báo theo tabs.
 * - Khi click vào 1 thông báo -> Gọi callback onSelectNotification(notif) để mở Modal Chi tiết giữa màn hình.
 * ------------------------------------------------------
 */

import { useState } from 'react';
import {
  Bell,
  Package,
  Sparkles,
  CheckCheck,
  Clock,
  Truck,
  ShoppingBag,
  CircleCheck,
  XCircle,
  Info,
  ArrowRight,
} from 'lucide-react';
import { formatDate } from '../../utils/format';
import notificationService from '../../services/notificationService';

const TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'order', label: 'Đơn hàng' },
  { key: 'system', label: 'Hệ thống' },
  { key: 'promo', label: 'Ưu đãi' },
];

/* Icon nhỏ gọn trong danh sách */
const getNotifIcon = (type, title = '') => {
  const lowerTitle = (title || '').toLowerCase();
  if (type === 'order') {
    if (lowerTitle.includes('đang giao') || lowerTitle.includes('shipping')) return <Truck size={16} className="text-blue-500" />;
    if (lowerTitle.includes('hoàn tất') || lowerTitle.includes('completed')) return <CircleCheck size={16} className="text-emerald-500" />;
    if (lowerTitle.includes('hủy') || lowerTitle.includes('cancel')) return <XCircle size={16} className="text-red-500" />;
    return <ShoppingBag size={16} className="text-wood dark:text-accent" />;
  }
  if (type === 'promo') return <Sparkles size={16} className="text-amber-500" />;
  return <Bell size={16} className="text-blue-500" />;
};

const NotificationDropdown = ({
  isOpen,
  onClose,
  notifications = [],
  unreadCount = 0,
  onRefresh,
  onSelectNotification,
}) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    try {
      await notificationService.markAllAsRead();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleItemClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await notificationService.markAsRead(notif.id);
      } catch (err) {
        console.error(err);
      }
      if (onRefresh) onRefresh();
    }
    onClose(); // Đóng dropdown menu bên góc icon
    if (onSelectNotification) onSelectNotification(notif); // Mở Modal Chi tiết giữa màn hình
  };

  return (
    <>
      {/* Click outside backdrop để đóng dropdown */}
      <div className="fixed inset-0 z-20" onClick={onClose} />

      {/* Dropdown Menu thả xuống ngay dưới Icon Chuông */}
      <div className="absolute right-0 top-full z-30 mt-2.5 w-84 sm:w-96 animate-slide-up rounded-2xl border border-wood/15 bg-white p-3.5 shadow-2xl dark:border-gray-light/10 dark:bg-neutral-900">
        {/* Header Dropdown */}
        <div className="flex items-center justify-between border-b border-wood/10 pb-2.5 px-1 dark:border-gray-light/10">
          <span className="text-xs font-bold uppercase tracking-wider text-wood dark:text-accent flex items-center gap-1.5">
            <Bell size={15} /> Thông báo {unreadCount > 0 && `(${unreadCount} chưa đọc)`}
          </span>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 text-[11px] font-semibold text-wood hover:underline dark:text-accent"
            >
              <CheckCheck size={13} /> Đánh dấu đã đọc
            </button>
          )}
        </div>

        {/* Tabs Lọc Nhanh */}
        <div className="mt-2.5 flex gap-1 border-b border-wood/10 pb-2 dark:border-gray-light/10 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-wood text-white dark:bg-accent dark:text-dark'
                  : 'text-dark/60 hover:bg-gray-light dark:text-gray-light/60 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Danh sách các thông báo */}
        <div className="mt-2 max-h-80 overflow-y-auto space-y-2 pr-0.5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-dark/50 dark:text-gray-light/50">
              Không có thông báo nào
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleItemClick(notif)}
                className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all cursor-pointer ${
                  notif.isRead
                    ? 'bg-gray-light/40 hover:bg-gray-light/80 dark:bg-neutral-800/40 dark:hover:bg-neutral-800'
                    : 'bg-emerald-50/90 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border-l-3 border-wood dark:border-accent'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {getNotifIcon(notif.type, notif.title)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs truncate ${
                      notif.isRead ? 'font-medium text-dark/80 dark:text-gray-light/80' : 'font-bold text-wood dark:text-accent'
                    }`}>
                      {notif.title}
                    </p>
                    {!notif.isRead && (
                      <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-dark/70 dark:text-gray-light/70 line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-dark/40 dark:text-gray-light/40">
                      <Clock size={10} /> {formatDate(notif.createdAt)}
                    </span>
                    <span className="text-[10px] font-bold text-wood dark:text-accent flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Xem <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
