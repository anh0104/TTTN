/**
 * components/product/FilterSidebar.jsx
 * ------------------------------------------------------
 * Sidebar lọc sản phẩm: theo danh mục, khoảng giá.
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import Button from '../common/Button';

const priceRanges = [
  { label: 'Dưới 2 triệu', min: 0, max: 2000000 },
  { label: '2 - 5 triệu', min: 2000000, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: 'Trên 20 triệu', min: 20000000, max: null },
];

const FilterSidebar = ({ categories, filters, onChange, onReset }) => {
  const [customMin, setCustomMin] = useState(filters.minPrice || '');
  const [customMax, setCustomMax] = useState(filters.maxPrice || '');

  useEffect(() => {
    setCustomMin(filters.minPrice || '');
    setCustomMax(filters.maxPrice || '');
  }, [filters.minPrice, filters.maxPrice]);

  const applyCustomPrice = (e) => {
    e.preventDefault();
    onChange({ minPrice: customMin || undefined, maxPrice: customMax || undefined });
  };

  return (
    <aside className="w-full shrink-0 space-y-8 md:w-64">
      {/* Danh mục */}
      <div>
        <h3 className="font-semibold text-dark dark:text-gray-light">Danh mục</h3>
        <div className="mt-3 space-y-2">
          <button
            onClick={() => onChange({ category: undefined })}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              !filters.category
                ? 'bg-wood/10 font-medium text-wood dark:bg-accent/15 dark:text-accent'
                : 'text-dark/70 hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/5'
            }`}
          >
            Tất cả danh mục
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ category: String(cat.id) })}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                filters.category === String(cat.id)
                  ? 'bg-wood/10 font-medium text-wood dark:bg-accent/15 dark:text-accent'
                  : 'text-dark/70 hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Khoảng giá */}
      <div>
        <h3 className="font-semibold text-dark dark:text-gray-light">Khoảng giá</h3>
        <div className="mt-3 space-y-2">
          {priceRanges.map((range) => {
            const active =
              String(filters.minPrice || '') === String(range.min) &&
              String(filters.maxPrice || '') === String(range.max || '');
            return (
              <button
                key={range.label}
                onClick={() => onChange({ minPrice: range.min, maxPrice: range.max || undefined })}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? 'bg-wood/10 font-medium text-wood dark:bg-accent/15 dark:text-accent'
                    : 'text-dark/70 hover:bg-gray-light dark:text-gray-light/70 dark:hover:bg-white/5'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Khoảng giá tùy chỉnh */}
        <form onSubmit={applyCustomPrice} className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Từ"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            className="w-full rounded-lg border border-wood/20 px-2 py-1.5 text-xs outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
          />
          <span className="text-dark/40">-</span>
          <input
            type="number"
            min="0"
            placeholder="Đến"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            className="w-full rounded-lg border border-wood/20 px-2 py-1.5 text-xs outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
          />
          <Button type="submit" size="sm" variant="outline" className="shrink-0 px-3">
            Lọc
          </Button>
        </form>
      </div>

      <Button variant="ghost" size="sm" onClick={onReset} className="w-full justify-center">
        Xóa tất cả bộ lọc
      </Button>
    </aside>
  );
};

export default FilterSidebar;
