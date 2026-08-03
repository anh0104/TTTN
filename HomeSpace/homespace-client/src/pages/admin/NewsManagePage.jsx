/**
 * pages/admin/NewsManagePage.jsx
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

import newsService from '../../services/newsService';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ImageUploadInput from '../../components/admin/ImageUploadInput';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import { getImageUrl, formatDate } from '../../utils/format';

const emptyForm = { title: '', content: '', status: 'published' };

const NewsManagePage = () => {
  const [newsList, setNewsList] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await newsService.getAll({ page, limit: 10 });
      setNewsList(data.data);
      setMeta(data.meta);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (news) => {
    setEditing(news);
    setForm({ title: news.title, content: news.content, status: news.status });
    setImageFile(null);
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
    if (!form.content.trim()) newErrors.content = 'Vui lòng nhập nội dung';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append('image', imageFile);

    setSaving(true);
    try {
      if (editing) {
        await newsService.update(editing.id, formData);
        toast.success('Cập nhật tin tức thành công');
      } else {
        await newsService.create(formData);
        toast.success('Tạo tin tức thành công');
      }
      setModalOpen(false);
      fetchNews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await newsService.delete(deleteTarget.id);
      toast.success('Xóa tin tức thành công');
      setDeleteTarget(null);
      fetchNews();
    } catch {
      toast.error('Không thể xóa tin tức');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'image', label: 'Ảnh', render: (row) => <img src={getImageUrl(row.image)} alt={row.title} className="h-12 w-16 rounded-lg object-cover" /> },
    { key: 'title', label: 'Tiêu đề', render: (row) => <span className="line-clamp-2 max-w-xs">{row.title}</span> },
    { key: 'author', label: 'Tác giả', render: (row) => row.author?.name || '—' },
    { key: 'created_at', label: 'Ngày đăng', render: (row) => formatDate(row.created_at) },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý tin tức</h1>
        <Button onClick={openCreate}><Plus size={16} /> Thêm tin tức</Button>
      </div>

      <DataTable columns={columns} rows={newsList} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />
      {meta && <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} onPageChange={setPage} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa tin tức' : 'Thêm tin tức'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Tiêu đề *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} error={errors.title} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Nội dung *</label>
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900"
            />
            {errors.content && <span className="text-xs text-red-500">{errors.content}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Trạng thái</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900">
              <option value="published">Xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
          <ImageUploadInput label="Ảnh bài viết" existingImageUrl={editing?.image} onChange={setImageFile} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button type="submit" loading={saving}>{editing ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa tin tức?"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default NewsManagePage;
