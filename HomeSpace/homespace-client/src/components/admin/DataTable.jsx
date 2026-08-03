/**
 * components/admin/DataTable.jsx
 * ------------------------------------------------------
 * Bảng dữ liệu dùng chung cho toàn bộ trang quản lý Admin.
 * columns: [{ key, label, render? }]
 * ------------------------------------------------------
 */

import { Pencil, Trash2 } from 'lucide-react';
import Loader from '../common/Loader';

const DataTable = ({ columns, rows, loading, onEdit, onDelete, keyField = 'id' }) => {
  if (loading) return <Loader fullScreen />;

  if (!rows || rows.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center rounded-xl border border-wood/10 text-dark/50 dark:border-gray-light/10 dark:text-gray-light/50">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-wood/10 dark:border-gray-light/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-wood/10 bg-gray-light/60 text-left dark:border-gray-light/10 dark:bg-white/5">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium text-dark/70 dark:text-gray-light/70">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 text-right font-medium text-dark/70 dark:text-gray-light/70">Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              className="border-b border-wood/5 last:border-0 hover:bg-gray-light/40 dark:border-gray-light/5 dark:hover:bg-white/5"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-dark/60 hover:bg-wood/10 hover:text-wood dark:text-gray-light/60 dark:hover:bg-accent/15 dark:hover:text-accent"
                        aria-label="Sửa"
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-dark/60 hover:bg-red-50 hover:text-red-600 dark:text-gray-light/60 dark:hover:bg-red-950"
                        aria-label="Xóa"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
