/**
 * pages/admin/BannerManagePage.jsx
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

import bannerService from '../../services/bannerService';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ImageUploadInput from '../../components/admin/ImageUploadInput';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { getImageUrl } from '../../utils/format';

const emptyForm = { title: '', link: '', sortOrder: 0, status: 'active' };

const BannerManagePage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data } = await bannerService.getAll();
      setBanners(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (banner) => {
    setEditing(banner);
    setForm({ title: banner.title, link: banner.link || '', sortOrder: banner.sortOrder, status: banner.status });
    setImageFile(null);
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setErrors({ title: 'Vui lòng nhập tiêu đề' }); return; }
    if (!editing && !imageFile) { setErrors({ image: 'Vui lòng chọn ảnh banner' }); return; }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append('image', imageFile);

    setSaving(true);
    try {
      if (editing) {
        await bannerService.update(editing.id, formData);
        toast.success('Cập nhật banner thành công');
      } else {
        await bannerService.create(formData);
        toast.success('Tạo banner thành công');
      }
      setModalOpen(false);
      fetchBanners();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await bannerService.delete(deleteTarget.id);
      toast.success('Xóa banner thành công');
      setDeleteTarget(null);
      fetchBanners();
    } catch {
      toast.error('Không thể xóa banner');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'image', label: 'Ảnh', render: (row) => <img src={getImageUrl(row.image)} alt={row.title} className="h-12 w-20 rounded-lg object-cover" /> },
    { key: 'title', label: 'Tiêu đề' },
    { key: 'link', label: 'Link', render: (row) => row.link || '—' },
    { key: 'sortOrder', label: 'Thứ tự' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý banner</h1>
        <Button onClick={openCreate}><Plus size={16} /> Thêm banner</Button>
      </div>

      <DataTable columns={columns} rows={banners} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa banner' : 'Thêm banner'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Tiêu đề *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} error={errors.title} />
          <Input label="Link (khi click vào banner)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/san-pham?category=1" />
          <Input label="Thứ tự hiển thị" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Trạng thái</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900">
              <option value="active">Hoạt động</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
          <div>
            <ImageUploadInput label="Ảnh banner *" existingImageUrl={editing?.image} onChange={setImageFile} />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button type="submit" loading={saving}>{editing ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa banner?"
        message={`Bạn có chắc muốn xóa banner "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default BannerManagePage;
