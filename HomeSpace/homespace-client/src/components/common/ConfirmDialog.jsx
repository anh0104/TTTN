/**
 * components/common/ConfirmDialog.jsx
 * ------------------------------------------------------
 * Hộp thoại xác nhận, dùng trước khi xóa dữ liệu (sản phẩm, danh mục...).
 * ------------------------------------------------------
 */

import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/50" onClick={onCancel} />
      <div className="relative w-full max-w-sm animate-slide-up rounded-xl bg-white p-6 text-center shadow-xl dark:bg-neutral-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950">
          <AlertTriangle size={22} />
        </div>
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-dark/60 dark:text-gray-light/60">{message}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" onClick={onCancel} className="flex-1 justify-center">
            Hủy
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} className="flex-1 justify-center">
            Xác nhận xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
