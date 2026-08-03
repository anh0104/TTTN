/**
 * pages/client/ProductListPage.jsx
 * ------------------------------------------------------
 * Trang danh sách sản phẩm: Grid 12 sản phẩm/trang, tìm kiếm,
 * lọc danh mục, lọc khoảng giá, sắp xếp theo giá/tên/mới nhất, pagination.
 * Toàn bộ filter được đồng bộ vào URL query string để có thể chia sẻ link.
 * ------------------------------------------------------
 */

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import ProductGrid from '../../components/product/ProductGrid';
import FilterSidebar from '../../components/product/FilterSidebar';
import Pagination from '../../components/common/Pagination';
import useDebounce from '../../hooks/useDebounce';
import useCart from '../../hooks/useCart';

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá: Thấp đến cao' },
  { value: 'price_desc', label: 'Giá: Cao đến thấp' },
  { value: 'name_asc', label: 'Tên: A - Z' },
  { value: 'name_desc', label: 'Tên: Z - A' },
];

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);
  const { handleAddToCart } = useCart();

  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    isNew: searchParams.get('isNew') || '',
    isSale: searchParams.get('isSale') || '',
    isBest: searchParams.get('isBest') || '',
    page: Number(searchParams.get('page')) || 1,
  };

  // Đồng bộ ô tìm kiếm (debounced) vào URL
  useEffect(() => {
    if (debouncedSearch === (searchParams.get('search') || '')) return;
    updateParams({ search: debouncedSearch || undefined, page: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    categoryService.getAll({ status: 'active' }).then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productService.getAll({
          page: filters.page,
          limit: 12,
          search: filters.search || undefined,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort,
          isNew: filters.isNew || undefined,
          isSale: filters.isSale || undefined,
          isBest: filters.isBest || undefined,
        });
        setProducts(data.data);
        setMeta(data.meta);
      } catch (err) {
        console.error('Lỗi tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateParams = useCallback(
    (updates) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '' || value === null) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const handleFilterChange = (updates) => {
    updateParams({ ...updates, page: undefined });
    setMobileFilterOpen(false);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const activeFilterLabel = () => {
    if (filters.isNew) return 'Sản phẩm mới';
    if (filters.isBest) return 'Best Seller';
    if (filters.isSale) return 'Flash Sale';
    return 'Tất cả sản phẩm';
  };

  return (
    <div className="container-custom section-padding animate-fade-in">
      <div className="mb-6">
        <h1 className="heading-display text-2xl font-semibold md:text-3xl">{activeFilterLabel()}</h1>
        {meta && (
          <p className="mt-1 text-sm text-dark/60 dark:text-gray-light/60">
            Tìm thấy {meta.totalItems} sản phẩm
          </p>
        )}
      </div>

      {/* Thanh tìm kiếm + sắp xếp */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full rounded-lg border border-wood/15 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-wood/15 px-3 py-2.5 text-sm dark:border-gray-light/15 md:hidden"
          >
            <SlidersHorizontal size={15} /> Lọc
          </button>

          <select
            value={filters.sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="rounded-lg border border-wood/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sắp xếp: {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar desktop */}
        <div className="hidden md:block">
          <FilterSidebar categories={categories} filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} />
        </div>

        <div className="flex-1">
          <ProductGrid products={products} loading={loading} onAddToCart={handleAddToCart} />
          {meta && (
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              onPageChange={(page) => updateParams({ page })}
            />
          )}
        </div>
      </div>

      {/* Sidebar mobile - drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-dark/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-6 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Bộ lọc</h3>
              <button onClick={() => setMobileFilterOpen(false)} aria-label="Đóng">
                <X size={20} />
              </button>
            </div>
            <FilterSidebar categories={categories} filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
