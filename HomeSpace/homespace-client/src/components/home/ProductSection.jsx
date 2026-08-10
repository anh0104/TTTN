/**
 * components/home/ProductSection.jsx
 * ------------------------------------------------------
 * Section hiển thị Đúng 1 Hàng Sản Phẩm (4 sản phẩm) trên trang chủ
 * Có nút "Xem tất cả" ở góc trên & dưới để chuyển sang trang danh sách sản phẩm đầy đủ.
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../product/ProductGrid';

const ProductSection = ({ title, subtitle, products = [], loading, viewAllLink, onAddToCart, accentClass = '' }) => {
  // Chỉ hiển thị đúng 1 hàng (tối đa 4 sản phẩm) trên trang chủ
  const displayProducts = (products || []).slice(0, 4);

  return (
    <section className="container-custom section-padding">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className={`heading-display text-2xl font-bold md:text-3xl ${accentClass}`}>{title}</h2>
          {subtitle && <p className="mt-1 text-xs md:text-sm font-medium text-dark/60 dark:text-gray-light/60">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-bold text-wood hover:text-wood-600 hover:underline dark:text-accent dark:hover:text-accent-600 transition-all"
          >
            Xem tất cả <ArrowRight size={16} />
          </Link>
        )}
      </div>

      <ProductGrid products={displayProducts} loading={loading} onAddToCart={onAddToCart} />


    </section>
  );
};

export default ProductSection;
