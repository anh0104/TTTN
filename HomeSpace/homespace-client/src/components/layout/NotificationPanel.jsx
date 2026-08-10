/**
 * components/layout/NotificationPanel.jsx
 * ------------------------------------------------------
 * Panel Thông Báo Chi Tiết dạng Overlay đè lên trang:
 * - Chế độ 1: Danh sách thông báo (Phân loại theo tabs)
 * - Chế độ 2: Chi tiết thông báo chọn xem (Chuyển mượt trong cùng container, có nút Quay lại)
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
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
  ChevronLeft,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { formatDate } from '../../utils/format';
import notificationService from '../../services/notificationService';

const TABS = [
  { key: 'all', label: 'Tất cả', icon: Bell },
  { key: 'order', label: 'Đơn hàng', icon: Package },
  { key: 'system', label: 'Hệ thống', icon: Info },
  { key: 'promo', label: 'Khuyến mãi', icon: Sparkles },
];

/* Icon theo loại thông báo */
const getNotifIcon = (type, title = '') => {
  const lowerTitle = (title || '').toLowerCase();
  if (type === 'order') {
    if (lowerTitle.includes('đang giao') || lowerTitle.includes('shipping')) return <Truck size={22} className="text-blue-500" />;
    if (lowerTitle.includes('hoàn tất') || lowerTitle.includes('completed')) return <CircleCheck size={22} className="text-emerald-500" />;
    if (lowerTitle.includes('hủy') || lowerTitle.includes('cancel')) return <XCircle size={22} className="text-red-500" />;
    if (lowerTitle.includes('xác nhận') || lowerTitle.includes('confirmed')) return <CheckCheck size={22} className="text-wood dark:text-accent" />;
    return <ShoppingBag size={22} className="text-wood dark:text-accent" />;
  }
  if (type === 'promo') return <Sparkles size={22} className="text-amber-500" />;
  return <Bell size={22} className="text-blue-500" />;
};

/* Badge trạng thái đơn hàng */
const getStatusBadge = (title = '', message = '') => {
  const t = (title + ' ' + message).toLowerCase();
  if (t.includes('đang giao') || t.includes('shipping'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"><Truck size={12} /> Đang giao hàng</span>;
  if (t.includes('hoàn tất') || t.includes('completed') || t.includes('thành công'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"><CircleCheck size={12} /> Hoàn tất đơn hàng</span>;
  if (t.includes('hủy') || t.includes('cancel'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300"><XCircle size={12} /> Đã hủy đơn</span>;
  if (t.includes('xác nhận') || t.includes('confirmed'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-wood/10 px-2.5 py-1 text-xs font-bold text-wood dark:bg-accent/20 dark:text-accent"><CheckCheck size={12} /> Đã xác nhận</span>;
  if (t.includes('thanh toán') || t.includes('payment'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"><CircleCheck size={12} /> Đã thanh toán SePay</span>;
  return null;
};

const NotificationPanel = ({ isOpen, onClose, notifications = [], unreadCount = 0, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotif, setSelectedNotif] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotifClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await notificationService.markAsRead(notif.id);
      } catch (err) {
        console.error(err);
      }
      if (onRefresh) onRefresh();
    }
    setSelectedNotif(notif);
  };

  const handleNavigateDetail = (link) => {
    setSelectedNotif(null);
    onClose();
    if (link) navigate(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Main Container Overlay */}
      <div className="relative w-full max-w-lg animate-slide-up rounded-3xl border border-wood/15 bg-white shadow-2xl dark:border-gray-light/10 dark:bg-neutral-900 overflow-hidden z-10">
        
        {/* ================= VIEW 1: CHI TIẾT THÔNG BÁO ================= */}
        {selectedNotif ? (
          <div className="flex flex-col">
            {/* Header Chi Tiết */}
            <div className="flex items-center justify-between border-b border-wood/10 bg-gradient-to-r from-wood/5 to-transparent px-5 py-4 dark:border-gray-light/10 dark:from-accent/5">
              <button
                onClick={() => setSelectedNotif(null)}
                className="flex items-center gap-1 text-xs font-bold text-wood hover:underline dark:text-accent"
              >
                <ChevronLeft size={18} /> Quay lại danh sách
              </button>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-dark/50 hover:bg-gray-light dark:text-gray-light/50 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Chi Tiết */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-wood/10 text-wood dark:bg-accent/20 dark:text-accent shadow-sm">
                  {getNotifIcon(selectedNotif.type, selectedNotif.title)}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-wood dark:text-accent">
                    {selectedNotif.type === 'order' ? '📦 Thông báo đơn hàng' : selectedNotif.type === 'promo' ? '🎁 Khuyến mãi' : '📢 Thông báo hệ thống'}
                  </span>
                  <h3 className="text-base font-bold text-dark dark:text-white leading-tight mt-0.5">
                    {selectedNotif.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-1">
                {getStatusBadge(selectedNotif.title, selectedNotif.message)}
                <span className="flex items-center gap-1 text-xs text-dark/50 dark:text-gray-light/50">
                  <Clock size={13} /> {formatDate(selectedNotif.createdAt)}
                </span>
              </div>

              <div className="rounded-2xl border border-wood/10 bg-gray-light/50 p-4 dark:border-gray-light/10 dark:bg-neutral-800/70">
                <p className="text-[11px] font-bold uppercase tracking-wider text-dark/40 dark:text-gray-light/40 mb-1.5">
                  Nội dung chi tiết:
                </p>
                <p className="text-sm leading-relaxed text-dark/85 dark:text-gray-light/85 whitespace-pre-line font-medium">
                  {selectedNotif.message}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-wood/10 dark:border-gray-light/10">
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="rounded-xl border border-wood/20 px-4 py-2 text-xs font-bold text-dark/70 hover:bg-gray-light dark:border-gray-light/20 dark:text-gray-light/70 dark:hover:bg-neutral-800 transition-all"
                >
                  Quay lại
                </button>

                {selectedNotif.link && (
                  <button
                    onClick={() => handleNavigateDetail(selectedNotif.link)}
                    className="flex items-center gap-1.5 rounded-xl bg-wood px-5 py-2 text-xs font-bold text-white shadow hover:bg-wood-600 dark:bg-accent dark:text-dark dark:hover:bg-accent-600 transition-all"
                  >
                    <ExternalLink size={14} /> Xem chi tiết liên kết
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ================= VIEW 2: DANH SÁCH THÔNG BÁO ================= */
          <div className="flex flex-col">
            {/* Header Danh Sách */}
            <div className="flex items-center justify-between border-b border-wood/10 bg-gradient-to-r from-wood/5 to-transparent px-5 py-4 dark:border-gray-light/10 dark:from-accent/5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wood/10 text-wood dark:bg-accent/20 dark:text-accent">
                  <Bell size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-dark dark:text-white">Thông báo hệ thống & đơn hàng</h2>
                  <p className="text-[11px] text-dark/50 dark:text-gray-light/50">
                    {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-1 rounded-full bg-wood/10 px-3 py-1.5 text-[11px] font-bold text-wood hover:bg-wood hover:text-white dark:bg-accent/20 dark:text-accent dark:hover:bg-accent dark:hover:text-dark transition-all"
                  >
                    <CheckCheck size={13} /> Đọc tất cả
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-dark/50 hover:bg-gray-light dark:text-gray-light/50 dark:hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs lọc */}
            <div className="flex gap-1 border-b border-wood/10 px-4 py-2 dark:border-gray-light/10 overflow-x-auto">
              {TABS.map((tab) => {
                const count = tab.key === 'all' ? notifications.length : notifications.filter((n) => n.type === tab.key).length;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeTab === tab.key
                        ? 'bg-wood text-white shadow-sm dark:bg-accent dark:text-dark'
                        : 'text-dark/60 hover:bg-gray-light dark:text-gray-light/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <TabIcon size={13} />
                    {tab.label}
                    {count > 0 && (
                      <span className={`ml-0.5 rounded-full px-1.5 text-[10px] font-bold ${
                        activeTab === tab.key
                          ? 'bg-white/25 text-white dark:bg-dark/20 dark:text-dark'
                          : 'bg-wood/10 text-wood dark:bg-accent/15 dark:text-accent'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Danh sách thông báo */}
            <div className="max-h-[55vh] overflow-y-auto p-3">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-light/80 text-dark/30 dark:bg-neutral-800 dark:text-gray-light/30 mb-4">
                    <Bell size={28} />
                  </div>
                  <p className="text-sm font-semibold text-dark/50 dark:text-gray-light/50">
                    {activeTab === 'all' ? 'Chưa có thông báo nào' : `Không có thông báo ${TABS.find((t) => t.key === activeTab)?.label?.toLowerCase()}`}
                  </p>
                  <p className="mt-1 text-xs text-dark/35 dark:text-gray-light/35">
                    Các thông báo mới sẽ xuất hiện tại đây
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotifClick(notif)}
                      className={`group flex gap-3 rounded-2xl p-3.5 transition-all cursor-pointer ${
                        notif.isRead
                          ? 'bg-transparent hover:bg-gray-light/60 dark:hover:bg-white/5'
                          : 'bg-gradient-to-r from-emerald-50/80 to-transparent hover:from-emerald-100 dark:from-emerald-950/30 dark:hover:from-emerald-950/50 border-l-[3px] border-wood dark:border-accent'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        notif.isRead
                          ? 'bg-gray-light/80 dark:bg-neutral-800'
                          : 'bg-wood/10 dark:bg-accent/15'
                      }`}>
                        {getNotifIcon(notif.type, notif.title)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-snug ${
                            notif.isRead
                              ? 'font-medium text-dark/75 dark:text-gray-light/75'
                              : 'font-bold text-dark dark:text-white'
                          }`}>
                            {notif.title}
                          </p>
                          {!notif.isRead && (
                            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500 animate-pulse" />
                          )}
                        </div>

                        <p className={`mt-1 text-xs leading-relaxed ${
                          notif.isRead
                            ? 'text-dark/55 dark:text-gray-light/55'
                            : 'text-dark/70 dark:text-gray-light/70'
                        } line-clamp-2`}>
                          {notif.message}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {getStatusBadge(notif.title, notif.message)}
                            <span className="flex items-center gap-1 text-[10px] text-dark/40 dark:text-gray-light/40">
                              <Clock size={10} /> {formatDate(notif.createdAt)}
                            </span>
                          </div>

                          <span className="flex items-center gap-1 text-xs font-bold text-wood dark:text-accent group-hover:translate-x-0.5 transition-all">
                            Xem chi tiết <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
