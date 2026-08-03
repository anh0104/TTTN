/**
 * pages/client/ProductDetailPage.jsx
 * ------------------------------------------------------
 * Chi tiết sản phẩm: Gallery nhiều ảnh + Zoom, đầy đủ thông tin
 * (tên, giá, giá giảm, mô tả, chất liệu, màu sắc, kích thước, số lượng,
 * danh mục), sản phẩm liên quan.
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Package, Palette, Ruler, Tag } from 'lucide-react';

import productService from '../../services/productService';
import ProductGallery from '../../components/product/ProductGallery';
import ProductGrid from '../../components/product/ProductGrid';
import ProductBadge from '../../components/product/ProductBadge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import useCart from '../../hooks/useCart';
import { formatCurrency, calculateDiscountPercent } from '../../utils/format';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    productService
      .getBySlug(slug)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error('Lỗi tải chi tiết sản phẩm:', err))
      .finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) return <Loader fullScreen />;

  if (!product) {
    return (
      <div className="container-custom section-padding text-center">
        <p className="text-dark/60 dark:text-gray-light/60">Không tìm thấy sản phẩm.</p>
        <Link to="/san-pham" className="mt-3 inline-block text-wood underline dark:text-accent">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const discount = calculateDiscountPercent(product.price, product.salePrice);
  const maxQuantity = product.quantity || 0;

  const changeQuantity = (delta) => {
    setQuantity((q) => Math.min(Math.max(1, q + delta), maxQuantity || 99));
  };

  return (
    <div className="container-custom section-padding animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-dark/50 dark:text-gray-light/50">
        <Link to="/" className="hover:text-wood dark:hover:text-accent">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link to="/san-pham" className="hover:text-wood dark:hover:text-accent">Sản phẩm</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/san-pham?category=${product.category.id}`} className="hover:text-wood dark:hover:text-accent">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-dark dark:text-gray-light">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery thumbnail={product.thumbnail} images={product.images} />

        {/* Thông tin sản phẩm */}
        <div>
          <div className="mb-2 flex gap-2">
            {product.isNew && <ProductBadge type="new" />}
            {product.isSale && <ProductBadge type="sale" />}
            {product.isBest && <ProductBadge type="best" />}
          </div>

          <h1 className="heading-display text-2xl font-semibold md:text-3xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold text-wood dark:text-accent">
              {formatCurrency(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <>
                <span className="text-lg text-dark/40 line-through dark:text-gray-light/40">
                  {formatCurrency(product.price)}
                </span>
                <span className="rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-600 dark:bg-red-950">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-dark/70 dark:text-gray-light/70">{product.description}</p>

          {/* Thông số */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {product.material && (
              <div className="flex items-center gap-2 text-dark/70 dark:text-gray-light/70">
                <Package size={16} className="text-wood dark:text-accent" /> Chất liệu: {product.material}
              </div>
            )}
            {product.color && (
              <div className="flex items-center gap-2 text-dark/70 dark:text-gray-light/70">
                <Palette size={16} className="text-wood dark:text-accent" /> Màu sắc: {product.color}
              </div>
            )}
            {product.size && (
              <div className="flex items-center gap-2 text-dark/70 dark:text-gray-light/70">
                <Ruler size={16} className="text-wood dark:text-accent" /> Kích thước: {product.size}
              </div>
            )}
            {product.category && (
              <div className="flex items-center gap-2 text-dark/70 dark:text-gray-light/70">
                <Tag size={16} className="text-wood dark:text-accent" /> Danh mục: {product.category.name}
              </div>
            )}
          </div>

          <p className="mt-4 text-sm">
            Tình trạng kho:{' '}
            {maxQuantity > 0 ? (
              <span className="font-medium text-emerald-600">Còn {maxQuantity} sản phẩm</span>
            ) : (
              <span className="font-medium text-red-600">Hết hàng</span>
            )}
          </p>

          {/* Số lượng + Thêm vào giỏ */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-wood/20 dark:border-gray-light/15">
              <button onClick={() => changeQuantity(-1)} className="flex h-11 w-11 items-center justify-center hover:bg-gray-light dark:hover:bg-white/5" aria-label="Giảm số lượng">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => changeQuantity(1)} className="flex h-11 w-11 items-center justify-center hover:bg-gray-light dark:hover:bg-white/5" aria-label="Tăng số lượng">
                <Plus size={16} />
              </button>
            </div>

            <Button
              size="lg"
              disabled={maxQuantity === 0}
              onClick={() => handleAddToCart(product, quantity)}
              className="flex-1"
            >
              <ShoppingCart size={18} /> Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="heading-display mb-6 text-2xl font-semibold">Sản phẩm liên quan</h2>
          <ProductGrid products={product.relatedProducts} onAddToCart={handleAddToCart} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
