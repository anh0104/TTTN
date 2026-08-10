/**
 * components/layout/NotificationDetailModal.jsx
 * ------------------------------------------------------
 * Hộp thoại Modal Chi Tiết Thông Báo hiển thị CHÍNH GIỮA MÀN HÌNH (React Portal):
 * - Phông nền tối nhẹ 40% đè lên TOÀN BỘ TRANG (Bao gồm cả Header, Banner, Body)
 * - Không gây mờ nhòe Header
 * ------------------------------------------------------
 */

import { createPortal } from 'react-dom';
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
  ExternalLink,
} from 'lucide-react';
import { formatDate } from '../../utils/format';

/* Icon theo loại thông báo */
const getNotifIcon = (type, title = '') => {
  const lowerTitle = (title || '').toLowerCase();
  if (type === 'order') {
    if (lowerTitle.includes('đang giao') || lowerTitle.includes('shipping')) return <Truck size={24} className="text-blue-500" />;
    if (lowerTitle.includes('hoàn tất') || lowerTitle.includes('completed')) return <CircleCheck size={24} className="text-emerald-500" />;
    if (lowerTitle.includes('hủy') || lowerTitle.includes('cancel')) return <XCircle size={24} className="text-red-500" />;
    if (lowerTitle.includes('xác nhận') || lowerTitle.includes('confirmed')) return <CheckCheck size={24} className="text-wood dark:text-accent" />;
    return <ShoppingBag size={24} className="text-wood dark:text-accent" />;
  }
  if (type === 'promo') return <Sparkles size={24} className="text-amber-500" />;
  return <Bell size={24} className="text-blue-500" />;
};

/* Badge trạng thái đơn hàng */
const getStatusBadge = (title = '', message = '') => {
  const t = (title + ' ' + message).toLowerCase();
  if (t.includes('đang giao') || t.includes('shipping'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"><Truck size={13} /> Đang giao hàng</span>;
  if (t.includes('hoàn tất') || t.includes('completed') || t.includes('thành công'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"><CircleCheck size={13} /> Hoàn tất đơn hàng</span>;
  if (t.includes('hủy') || t.includes('cancel'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300"><XCircle size={13} /> Đã hủy đơn</span>;
  if (t.includes('xác nhận') || t.includes('confirmed'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-wood/10 px-3 py-1 text-xs font-bold text-wood dark:bg-accent/20 dark:text-accent"><CheckCheck size={13} /> Đã xác nhận</span>;
  if (t.includes('thanh toán') || t.includes('payment'))
    return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"><CircleCheck size={13} /> Đã thanh toán SePay</span>;
  return null;
};

const NotificationDetailModal = ({ notification, onClose }) => {
  const navigate = useNavigate();

  if (!notification) return null;

  const handleGoToLink = () => {
    onClose();
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in">
      {/* Phông nền làm tối nhẹ toàn bộ trang web (40% opacity) */}
      <div className="fixed inset-0 bg-black/45 transition-opacity" onClick={onClose} />

      {/* Thẻ Modal Chi Tiết Nổi Chính Giữa Màn Hình */}
      <div className="relative z-10 w-full max-w-md animate-scale-up rounded-3xl border border-wood/20 bg-white p-6 shadow-2xl dark:border-gray-light/15 dark:bg-neutral-900">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-wood/10 pb-4 dark:border-gray-light/10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wood/10 text-wood dark:bg-accent/20 dark:text-accent shadow-sm">
              {getNotifIcon(notification.type, notification.title)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-wood dark:text-accent">
                {notification.type === 'order' ? '📦 Thông báo đơn hàng' : notification.type === 'promo' ? '🎁 Khuyến mãi' : '📢 Thông báo hệ thống'}
              </span>
              <h3 className="text-base font-bold text-dark dark:text-white leading-tight mt-0.5">
                Chi Tiết Thông Báo
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-dark/60 hover:bg-gray-light dark:text-gray-light/60 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nội dung thông báo */}
        <div className="my-5 space-y-4">
          <div>
            <h4 className="text-base font-bold text-wood dark:text-accent leading-snug">
              {notification.title}
            </h4>
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              {getStatusBadge(notification.title, notification.message)}
              <span className="flex items-center gap-1 text-xs text-dark/50 dark:text-gray-light/50">
                <Clock size={12} /> {formatDate(notification.createdAt)}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-wood/10 bg-gray-light/60 p-4 dark:border-gray-light/10 dark:bg-neutral-800/70">
            <p className="text-[11px] font-bold uppercase tracking-wider text-dark/40 dark:text-gray-light/40 mb-1.5">
              Nội dung thông báo:
            </p>
            <p className="text-sm leading-relaxed text-dark/85 dark:text-gray-light/85 whitespace-pre-line font-medium">
              {notification.message}
            </p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-wood/10 dark:border-gray-light/10">
          <button
            onClick={onClose}
            className="rounded-xl border border-wood/20 px-4.5 py-2 text-xs font-bold text-dark/70 hover:bg-gray-light dark:border-gray-light/20 dark:text-gray-light/70 dark:hover:bg-neutral-800 transition-all"
          >
            Đóng
          </button>

          {notification.link && (
            <button
              onClick={handleGoToLink}
              className="flex items-center gap-1.5 rounded-xl bg-wood px-5 py-2 text-xs font-bold text-white shadow hover:bg-wood-600 dark:bg-accent dark:text-dark dark:hover:bg-accent-600 transition-all"
            >
              <ExternalLink size={14} /> Xem chi tiết đơn / liên kết
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default NotificationDetailModal;
