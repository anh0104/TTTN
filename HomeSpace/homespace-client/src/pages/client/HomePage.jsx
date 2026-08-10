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

import { Truck, ShieldCheck, QrCode, Headset, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          allProductsRes,
          newsRes,
          settingsRes,
        ] = await Promise.all([
          bannerService.getAll({ status: 'active' }).catch(() => ({ data: { data: [] } })),
          categoryService.getAll({ status: 'active' }).catch(() => ({ data: { data: [] } })),
          productService.getAll({ isNew: true, limit: 8, sort: 'newest' }).catch(() => ({ data: { data: [] } })),
          productService.getAll({ isBest: true, limit: 8, sort: 'newest' }).catch(() => ({ data: { data: [] } })),
          productService.getAll({ isSale: true, limit: 8, sort: 'newest' }).catch(() => ({ data: { data: [] } })),
          productService.getAll({ limit: 12, sort: 'newest' }).catch(() => ({ data: { data: [] } })),
          newsService.getAll({ limit: 3 }).catch(() => ({ data: { data: [] } })),
          settingService.getSettings().catch(() => ({ data: { data: {} } })),
        ]);

        const allProds = allProductsRes?.data?.data || [];
        const fetchedBanners = bannersRes?.data?.data || [];
        const fetchedCategories = categoriesRes?.data?.data || [];

        setBanners(fetchedBanners);
        setCategories(fetchedCategories);

        const newP = ((newRes?.data?.data && newRes.data.data.length > 0) ? newRes.data.data : allProds).slice(0, 4);
        const bestP = ((bestRes?.data?.data && bestRes.data.data.length > 0) ? bestRes.data.data : allProds).slice(0, 4);
        const saleP = ((saleRes?.data?.data && saleRes.data.data.length > 0) ? saleRes.data.data : allProds).slice(0, 4);

        setNewProducts(newP);
        setBestProducts(bestP);
        setSaleProducts(saleP);
        setNewsList(newsRes?.data?.data || []);
        setSettings(settingsRes?.data?.data || {});
      } catch (err) {
        console.error('Lỗi tải dữ liệu trang chủ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <Loader fullScreen />;

  // Bộ sưu tập: lấy 3 danh mục đầu
  const collections = categories.slice(0, 3).map((category) => {
    const representativeProduct =
      [...newProducts, ...bestProducts, ...saleProducts].find((p) => p.categoryId === category.id) || null;
    return { category, image: representativeProduct?.thumbnail };
  });

  return (
    <div className="animate-fade-in">
      <HeroSlider banners={banners} />

      {/* ===== Thanh Thông Báo Đặc Quyền Trang Chủ ===== */}
      <section className="bg-gradient-to-r from-wood-700 via-wood to-wood-700 py-6 text-white border-y border-accent/30 shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-dark font-bold shadow">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-accent">Miễn Phí Vận Chuyển</h4>
                <p className="text-xs text-white/80">Cho đơn hàng từ 5.000.000đ toàn quốc</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-dark font-bold shadow">
                <QrCode size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-accent">Thanh Toán SePay VietinBank</h4>
                <p className="text-xs text-white/80">Quét QR nhận tiền & xác nhận đơn 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-dark font-bold shadow">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-accent">Bảo Hành 5 Năm</h4>
                <p className="text-xs text-white/80">Cam kết chất lượng Minimal Luxury</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-dark font-bold shadow">
                <Headset size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-accent">Tư Vấn Kiến Trúc 24/7</h4>
                <p className="text-xs text-white/80">Đội ngũ kiến trúc sư chuyên nghiệp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
