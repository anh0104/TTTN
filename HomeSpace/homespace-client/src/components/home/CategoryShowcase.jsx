/**
 * components/home/CategoryShowcase.jsx
 * ------------------------------------------------------
 * Hiển thị danh mục nổi bật dạng lưới icon, click để lọc sản phẩm.
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { Sofa, UtensilsCrossed, BedDouble, Shirt, Lamp, Archive } from 'lucide-react';

// Map icon theo tên danh mục (fallback Archive nếu không khớp)
const iconMap = [
  { keyword: 'sofa', Icon: Sofa },
  { keyword: 'bàn ăn', Icon: UtensilsCrossed },
  { keyword: 'giường', Icon: BedDouble },
  { keyword: 'tủ quần áo', Icon: Shirt },
  { keyword: 'đèn', Icon: Lamp },
];

const getIconFor = (name = '') => {
  const found = iconMap.find(({ keyword }) => name.toLowerCase().includes(keyword));
  return found ? found.Icon : Archive;
};

const CategoryShowcase = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="container-custom section-padding">
      <h2 className="heading-display text-center text-2xl font-semibold md:text-3xl">Danh mục nổi bật</h2>
      <p className="mt-2 text-center text-sm text-dark/60 dark:text-gray-light/60">
        Khám phá các danh mục nội thất được yêu thích nhất
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {categories.slice(0, 6).map((category) => {
          const Icon = getIconFor(category.name);
          return (
            <Link
              key={category.id}
              to={`/san-pham?category=${category.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-wood/10 p-4 text-center transition-all hover:-translate-y-1 hover:border-wood hover:shadow-md dark:border-gray-light/10 dark:hover:border-accent"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wood-50 text-wood transition-colors group-hover:bg-wood group-hover:text-white dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent dark:group-hover:text-dark">
                <Icon size={24} />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryShowcase;
