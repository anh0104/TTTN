/**
 * components/home/ProductSection.jsx
 * ------------------------------------------------------
 * Section tái sử dụng cho trang chủ: tiêu đề + "Xem tất cả" + ProductGrid.
 * Dùng chung cho Sản phẩm mới / Best Seller / Flash Sale.
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../product/ProductGrid';

const ProductSection = ({ title, subtitle, products, loading, viewAllLink, onAddToCart, accentClass = '' }) => {
  return (
    <section className="container-custom section-padding">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className={`heading-display text-2xl font-semibold md:text-3xl ${accentClass}`}>{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-dark/60 dark:text-gray-light/60">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-wood hover:underline dark:text-accent sm:flex"
          >
            Xem tất cả <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <ProductGrid products={products} loading={loading} onAddToCart={onAddToCart} />

      {viewAllLink && (
        <div className="mt-6 flex justify-center sm:hidden">
          <Link to={viewAllLink} className="flex items-center gap-1 text-sm font-medium text-wood dark:text-accent">
            Xem tất cả <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
