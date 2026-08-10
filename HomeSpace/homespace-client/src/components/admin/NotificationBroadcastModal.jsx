/**
 * components/admin/NotificationBroadcastModal.jsx
 * ------------------------------------------------------
 * Modal phát hành Thông báo hệ thống / Ưu đãi mới của Admin
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Bell, Send, X } from 'lucide-react';
import { toast } from 'react-toastify';
import notificationService from '../../services/notificationService';
import Button from '../common/Button';

const NotificationBroadcastModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('system');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error('Vui lòng nhập đầy đủ Tiêu đề và Nội dung thông báo!');
      return;
    }

    setSubmitting(true);
    try {
      const res = await notificationService.sendBroadcast({
        title: title.trim(),
        message: message.trim(),
        type,
        link: link.trim() || null,
      });

      if (res.data.success) {
        toast.success('Phát hành thông báo thành công cho toàn bộ khách hàng!');
        setTitle('');
        setMessage('');
        setLink('');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi khi phát hành thông báo');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-wood/15 bg-white p-6 shadow-2xl dark:border-gray-light/10 dark:bg-neutral-900">
        <div className="flex items-center justify-between border-b border-wood/10 pb-4 dark:border-gray-light/10">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wood/10 text-wood dark:bg-accent/20 dark:text-accent font-bold">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-wood dark:text-accent">Phát Hành Thông Báo Mới</h3>
              <p className="text-xs text-dark/60 dark:text-gray-light/60">Gửi thông báo tới toàn bộ người dùng website</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-light dark:hover:bg-neutral-800">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-dark/70 dark:text-gray-light/70 mb-1">
              Loại thông báo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-wood/20 bg-gray-light/50 px-3.5 py-2 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800 dark:focus:border-accent"
            >
              <option value="system">📢 Thông báo hệ thống</option>
              <option value="promo">🎁 Khuyến mãi / Ưu đãi</option>
              <option value="order">📦 Cập nhật đơn hàng</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark/70 dark:text-gray-light/70 mb-1">
              Tiêu đề thông báo *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Chương trình tri ân khách hàng tháng 8..."
              className="w-full rounded-xl border border-wood/20 bg-gray-light/50 px-3.5 py-2 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800 dark:focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark/70 dark:text-gray-light/70 mb-1">
              Nội dung thông báo *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập nội dung thông báo chi tiết..."
              className="w-full rounded-xl border border-wood/20 bg-gray-light/50 px-3.5 py-2 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800 dark:focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark/70 dark:text-gray-light/70 mb-1">
              Đường dẫn liên kết (Tùy chọn)
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="VD: /san-pham hoặc /tin-tuc"
              className="w-full rounded-xl border border-wood/20 bg-gray-light/50 px-3.5 py-2 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800 dark:focus:border-accent"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-wood/20 px-4 py-2 text-sm font-semibold text-dark/70 hover:bg-gray-light dark:border-gray-light/20 dark:text-gray-light/70 dark:hover:bg-neutral-800"
            >
              Hủy
            </button>
            <Button type="submit" disabled={submitting} className="flex items-center gap-2 font-bold">
              <Send size={16} />
              {submitting ? 'Đang phát hành...' : 'Phát hành thông báo'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationBroadcastModal;
