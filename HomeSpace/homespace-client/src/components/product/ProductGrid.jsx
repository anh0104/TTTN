/**
 * components/product/ProductGrid.jsx
 * ------------------------------------------------------
 */

import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products, loading, onAddToCart, emptyText = 'Không có sản phẩm nào' }) => {
  if (loading) {
    return <Loader fullScreen />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center text-dark/50 dark:text-gray-light/50">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductGrid;
