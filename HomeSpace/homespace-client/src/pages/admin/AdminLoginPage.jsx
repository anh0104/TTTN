/**
 * pages/admin/AdminLoginPage.jsx
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../redux/slices/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ALLOWED_ADMIN_ROLES = ['superadmin', 'admin', 'editor'];

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      if (!ALLOWED_ADMIN_ROLES.includes(result.payload.user.role)) {
        toast.error('Tài khoản của bạn không có quyền truy cập trang quản trị');
        return;
      }
      toast.success(`Chào mừng, ${result.payload.user.name}!`);
      navigate('/admin', { replace: true });
    } else {
      toast.error(result.payload || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light dark:bg-dark">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm dark:bg-neutral-900">
        <h1 className="heading-display text-center text-2xl font-semibold text-wood dark:text-accent">
          HomeSpace Admin
        </h1>
        <p className="mt-1 text-center text-sm text-dark/60 dark:text-gray-light/60">
          Đăng nhập vào trang quản trị
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            placeholder="admin@homespace.vn"
          />
          <Input
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            placeholder="••••••••"
          />
          <Button type="submit" loading={loading} className="w-full justify-center">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
