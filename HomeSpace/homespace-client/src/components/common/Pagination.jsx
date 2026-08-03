/**
 * components/common/Pagination.jsx
 * ------------------------------------------------------
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  const baseBtn =
    'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors';

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} disabled:opacity-30 hover:bg-gray-light dark:hover:bg-white/10`}
        aria-label="Trang trước"
      >
        <ChevronLeft size={16} />
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`${baseBtn} hover:bg-gray-light dark:hover:bg-white/10`}>1</button>
          {start > 2 && <span className="px-1 text-dark/40 dark:text-gray-light/40">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseBtn} ${
            page === currentPage
              ? 'bg-wood text-white dark:bg-accent dark:text-dark'
              : 'hover:bg-gray-light dark:hover:bg-white/10'
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-dark/40 dark:text-gray-light/40">…</span>}
          <button onClick={() => onPageChange(totalPages)} className={`${baseBtn} hover:bg-gray-light dark:hover:bg-white/10`}>
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} disabled:opacity-30 hover:bg-gray-light dark:hover:bg-white/10`}
        aria-label="Trang sau"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
