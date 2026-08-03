/**
 * components/product/ProductCard.jsx
 * ------------------------------------------------------
 * Card sản phẩm dùng trong grid danh sách + các section trang chủ.
 * Gồm: ảnh, tên, giá, giá khuyến mãi, nhãn New/Sale/Best, hover đẹp.
 * ------------------------------------------------------
 */

import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ProductBadge from './ProductBadge';
import { formatCurrency, calculateDiscountPercent, getImageUrl } from '../../utils/format';

const ProductCard = ({ product, onAddToCart }) => {
  const { name, slug, price, salePrice, thumbnail, isNew, isSale, isBest, category } = product;
  const discount = calculateDiscountPercent(price, salePrice);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-wood/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-wood/10 dark:border-gray-light/10 dark:bg-neutral-900">
      {/* Nhãn */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {isNew && <ProductBadge type="new" />}
        {isSale && <ProductBadge type="sale" />}
        {isBest && <ProductBadge type="best" />}
      </div>

      {/* Ảnh + link chi tiết */}
      <Link to={`/san-pham/${slug}`} className="block aspect-square overflow-hidden bg-gray-light dark:bg-neutral-800">
        <img
          src={getImageUrl(thumbnail)}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Nút thêm vào giỏ - hiện khi hover (desktop) */}
      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-24 right-3 z-10 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-wood opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-wood hover:text-white dark:bg-neutral-800 dark:text-accent dark:hover:bg-accent dark:hover:text-dark"
          aria-label={`Thêm ${name} vào giỏ hàng`}
        >
          <ShoppingCart size={18} />
        </button>
      )}

      {/* Thông tin */}
      <div className="p-4">
        {category?.name && (
          <span className="text-xs uppercase tracking-wide text-dark/40 dark:text-gray-light/40">
            {category.name}
          </span>
        )}
        <Link to={`/san-pham/${slug}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-medium text-dark transition-colors group-hover:text-wood dark:text-gray-light dark:group-hover:text-accent">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-wood dark:text-accent">
            {formatCurrency(salePrice || price)}
          </span>
          {salePrice && (
            <>
              <span className="text-sm text-dark/40 line-through dark:text-gray-light/40">
                {formatCurrency(price)}
              </span>
              <span className="rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-950">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
