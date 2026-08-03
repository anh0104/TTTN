/**
 * pages/admin/CategoryManagePage.jsx
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const emptyForm = { name: '', description: '', status: 'active' };

const CategoryManagePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryService.getAll();
      setCategories(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setForm({ name: category.name, description: category.description || '', status: category.status });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrors({ name: 'Vui lòng nhập tên danh mục' });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await categoryService.update(editing.id, form);
        toast.success('Cập nhật danh mục thành công');
      } else {
        await categoryService.create(form);
        toast.success('Tạo danh mục thành công');
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await categoryService.delete(deleteTarget.id);
      toast.success('Xóa danh mục thành công');
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể xóa danh mục');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Tên danh mục' },
    { key: 'slug', label: 'Slug' },
    { key: 'description', label: 'Mô tả', render: (row) => <span className="line-clamp-1">{row.description}</span> },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
        <Button onClick={openCreate}><Plus size={16} /> Thêm danh mục</Button>
      </div>

      <DataTable columns={columns} rows={categories} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Tên danh mục *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Mô tả</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Trạng thái</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button type="submit" loading={saving}>{editing ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa danh mục?"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default CategoryManagePage;
