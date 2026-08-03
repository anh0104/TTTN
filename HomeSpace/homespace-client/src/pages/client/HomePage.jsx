/**
 * pages/client/HomePage.jsx
 * ------------------------------------------------------
 * Trang chủ: Hero Banner Slider, Danh mục nổi bật, Sản phẩm mới,
 * Best Seller, Flash Sale, Bộ sưu tập, Tin tức mới.
 * (Newsletter + Footer đã nằm trong Footer.jsx dùng chung mọi trang)
 * Các section có thể bị ẩn theo cấu hình "Quản lý giao diện" (site settings).
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';

import bannerService from '../../services/bannerService';
import categoryService from '../../services/categoryService';
import productService from '../../services/productService';
import newsService from '../../services/newsService';
import settingService from '../../services/settingService';

import HeroSlider from '../../components/home/HeroSlider';
import CategoryShowcase from '../../components/home/CategoryShowcase';
import ProductSection from '../../components/home/ProductSection';
import CollectionShowcase from '../../components/home/CollectionShowcase';
import NewsSection from '../../components/home/NewsSection';
import Loader from '../../components/common/Loader';
import useCart from '../../hooks/useCart';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [settings, setSettings] = useState({});

  const { handleAddToCart } = useCart();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [
          bannersRes,
          categoriesRes,
          newRes,
          bestRes,
          saleRes,
          newsRes,
          settingsRes,
        ] = await Promise.all([
          bannerService.getAll({ status: 'active' }),
          categoryService.getAll({ status: 'active' }),
          productService.getAll({ isNew: true, limit: 4, sort: 'newest' }),
          productService.getAll({ isBest: true, limit: 4, sort: 'newest' }),
          productService.getAll({ isSale: true, limit: 4, sort: 'newest' }),
          newsService.getAll({ limit: 3 }),
          settingService.getSettings(),
        ]);

        setBanners(bannersRes.data.data);
        setCategories(categoriesRes.data.data);
        setNewProducts(newRes.data.data);
        setBestProducts(bestRes.data.data);
        setSaleProducts(saleRes.data.data);
        setNewsList(newsRes.data.data);
        setSettings(settingsRes.data.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu trang chủ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <Loader fullScreen />;

  // Bộ sưu tập: lấy 3 danh mục đầu, dùng ảnh sản phẩm đại diện làm hình nền
  const collections = categories.slice(0, 3).map((category) => {
    const representativeProduct =
      [...newProducts, ...bestProducts, ...saleProducts].find((p) => p.categoryId === category.id) || null;
    return { category, image: representativeProduct?.thumbnail };
  });

  return (
    <div className="animate-fade-in">
      <HeroSlider banners={banners} />

      {settings.show_new_products !== 'false' && (
        <ProductSection
          title="Sản phẩm mới"
          subtitle="Những thiết kế mới nhất vừa ra mắt"
          products={newProducts}
          viewAllLink="/san-pham?isNew=true"
          onAddToCart={handleAddToCart}
        />
      )}

      <CategoryShowcase categories={categories} />

      {settings.show_best_seller !== 'false' && (
        <ProductSection
          title="Best Seller"
          subtitle="Sản phẩm bán chạy nhất được khách hàng yêu thích"
          products={bestProducts}
          viewAllLink="/san-pham?isBest=true"
          onAddToCart={handleAddToCart}
          accentClass="text-wood dark:text-accent"
        />
      )}

      {settings.show_flash_sale !== 'false' && (
        <ProductSection
          title="Flash Sale"
          subtitle="Ưu đãi giảm giá có thời hạn - nhanh tay sở hữu"
          products={saleProducts}
          viewAllLink="/san-pham?isSale=true"
          onAddToCart={handleAddToCart}
          accentClass="text-red-600"
        />
      )}

      <CollectionShowcase collections={collections} />

      {settings.show_news !== 'false' && <NewsSection newsList={newsList} />}
    </div>
  );
};

export default HomePage;
