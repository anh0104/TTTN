/**
 * pages/admin/UserManagePage.jsx
 * ------------------------------------------------------
 * Quản lý người dùng: CRUD, phân quyền SuperAdmin/Admin/Editor/User.
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'react-toastify';

import userService from '../../services/userService';
import useAuth from '../../hooks/useAuth';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import useDebounce from '../../hooks/useDebounce';
import { formatDate } from '../../utils/format';

const roleLabels = { superadmin: 'Super Admin', admin: 'Admin', editor: 'Editor', user: 'Khách hàng' };
const roleColors = {
  superadmin: 'bg-red-50 text-red-600 dark:bg-red-950',
  admin: 'bg-blue-50 text-blue-600 dark:bg-blue-950',
  editor: 'bg-amber-50 text-amber-600 dark:bg-amber-950',
  user: 'bg-gray-light text-dark/60 dark:bg-white/10 dark:text-gray-light/60',
};

const emptyForm = { name: '', email: '', password: '', role: 'user', status: 'active' };

const UserManagePage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await userService.getAll({ page, limit: 10, search: debouncedSearch || undefined });
      setUsers(data.data);
      setMeta(data.meta);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page, debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: '', role: u.role, status: u.status });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!editing && form.password.length < 6) newErrors.password = 'Mật khẩu tối thiểu 6 ký tự';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setSaving(true);
    try {
      if (editing) {
        const payload = { name: form.name, email: form.email, role: form.role, status: form.status };
        if (form.password) payload.password = form.password;
        await userService.update(editing.id, payload);
        toast.success('Cập nhật người dùng thành công');
      } else {
        await userService.create(form);
        toast.success('Tạo người dùng thành công');
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await userService.delete(deleteTarget.id);
      toast.success('Xóa người dùng thành công');
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể xóa người dùng');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Họ tên' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Vai trò', render: (row) => <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleColors[row.role]}`}>{roleLabels[row.role]}</span> },
    { key: 'status', label: 'Trạng thái', render: (row) => (
      <span className={row.status === 'active' ? 'text-emerald-600' : 'text-red-500'}>
        {row.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
      </span>
    ) },
    { key: 'created_at', label: 'Ngày tạo', render: (row) => formatDate(row.created_at) },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
        <Button onClick={openCreate}><Plus size={16} /> Thêm người dùng</Button>
      </div>

      <div className="relative max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Tìm theo tên..."
          className="w-full rounded-lg border border-wood/15 py-2 pl-9 pr-3 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900"
        />
      </div>

      <DataTable
        columns={columns}
        rows={users}
        loading={loading}
        onEdit={openEdit}
        onDelete={(row) => (row.id === currentUser.id ? toast.warning('Không thể tự xóa tài khoản của chính mình') : setDeleteTarget(row))}
      />
      {meta && <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} onPageChange={setPage} />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa người dùng' : 'Thêm người dùng'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Họ tên *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <Input label="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <Input
            label={editing ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu *'}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Vai trò</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900">
              <option value="user">Khách hàng</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          {editing && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Trạng thái</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-900">
                <option value="active">Hoạt động</option>
                <option value="inactive">Khóa tài khoản</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button type="submit" loading={saving}>{editing ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa người dùng?"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default UserManagePage;
