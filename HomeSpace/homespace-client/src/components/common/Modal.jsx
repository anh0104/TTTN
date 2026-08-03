/**
 * components/common/Modal.jsx
 * ------------------------------------------------------
 * Modal dùng chung cho toàn bộ form tạo/sửa trong Admin.
 * ------------------------------------------------------
 */

import { X } from 'lucide-react';

const Modal = ({ open, onClose, title, children, size = 'md' }) => {
  if (!open) return null;

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/50" onClick={onClose} />
      <div
        className={`relative max-h-[90vh] w-full ${sizeClass} animate-slide-up overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-dark/50 hover:bg-gray-light dark:text-gray-light/50 dark:hover:bg-white/10"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
