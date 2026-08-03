/**
 * pages/admin/ProductManagePage.jsx
 * ------------------------------------------------------
 * Quản lý sản phẩm: CRUD, upload nhiều ảnh, checkbox New/Sale/Best/Status.
 * ------------------------------------------------------
 */

import { useEffect, useState, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'react-toastify';

import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ProductForm from '../../components/admin/ProductForm';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import useDebounce from '../../hooks/useDebounce';
import { formatCurrency, getImageUrl } from '../../utils/format';

const ProductManagePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await productService.getAll({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        status: undefined, // Admin xem cả active lẫn inactive
      });
      setProducts(data.data);
      setMeta(data.meta);
    } catch {
      toast.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    categoryService.getAll().then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (formData, removedImageIds) => {
    setSaving(true);
    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formData);
        // Xóa các ảnh gallery bị gỡ trong lúc sửa
        await Promise.all(removedImageIds.map((imgId) => productService.deleteImage(editingProduct.id, imgId)));
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await productService.create(formData);
        toast.success('Tạo sản phẩm thành công');
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await productService.delete(deleteTarget.id);
      toast.success('Xóa sản phẩm thành công');
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể xóa sản phẩm');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'thumbnail',
      label: 'Ảnh',
      render: (row) => (
        <img src={getImageUrl(row.thumbnail)} alt={row.name} className="h-12 w-12 rounded-lg object-cover" />
      ),
    },
    { key: 'name', label: 'Tên sản phẩm' },
    { key: 'category', label: 'Danh mục', render: (row) => row.category?.name || '—' },
    {
      key: 'price',
      label: 'Giá',
      render: (row) => (
        <div>
          <div className="font-medium text-wood dark:text-accent">{formatCurrency(row.salePrice || row.price)}</div>
          {row.salePrice && <div className="text-xs text-dark/40 line-through">{formatCurrency(row.price)}</div>}
        </div>
      ),
    },
    { key: 'quantity', label: 'Tồn kho' },
    {
      key: 'flags',
      label: 'Nhãn',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.isNew && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-600 dark:bg-emerald-950">New</span>}
          {row.isSale && <span className="rounded bg-red-50 px-1.5 py-0.5 text-xs text-red-600 dark:bg-red-950">Sale</span>}
          {row.isBest && <span className="rounded bg-accent-100 px-1.5 py-0.5 text-xs text-wood dark:bg-accent/20 dark:text-accent">Best</span>}
        </div>
      ),
    },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <Button onClick={openCreateModal}>
          <Plus size={16} /> Thêm sản phẩm
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full rounded-lg border border-wood/15 py-2 pl-9 pr-3 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900"
        />
      </div>

      <DataTable columns={columns} rows={products} loading={loading} onEdit={openEditModal} onDelete={setDeleteTarget} />

      {meta && <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} onPageChange={setPage} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'} size="lg">
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={saving}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa sản phẩm?"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default ProductManagePage;
