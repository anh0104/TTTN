/**
 * components/product/ProductBadge.jsx
 * ------------------------------------------------------
 * Nhãn hiển thị trên card sản phẩm: New / Sale / Best Seller.
 * ------------------------------------------------------
 */

const badgeStyles = {
  new: 'bg-emerald-600 text-white',
  sale: 'bg-red-600 text-white',
  best: 'bg-accent text-dark',
};

const badgeLabels = {
  new: 'Mới',
  sale: 'Giảm giá',
  best: 'Bán chạy',
};

const ProductBadge = ({ type }) => (
  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${badgeStyles[type]}`}>
    {badgeLabels[type]}
  </span>
);

export default ProductBadge;
