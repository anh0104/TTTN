/**
 * pages/auth/RegisterPage.jsx
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { registerUser } from '../../redux/slices/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Đăng ký thành công! Chào mừng bạn đến với HomeSpace.');
      navigate('/', { replace: true });
    } else {
      toast.error(result.payload || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="container-custom section-padding flex min-h-[70vh] items-center justify-center animate-fade-in">
      <div className="w-full max-w-md rounded-xl border border-wood/15 p-8 dark:border-gray-light/10">
        <h1 className="heading-display text-center text-2xl font-semibold">Đăng ký</h1>
        <p className="mt-1 text-center text-sm text-dark/60 dark:text-gray-light/60">
          Tạo tài khoản để bắt đầu mua sắm cùng HomeSpace
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Họ và tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            placeholder="Nguyễn Văn A"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            placeholder="email@vidu.com"
          />
          <Input
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            placeholder="Tối thiểu 6 ký tự"
          />
          <Input
            label="Xác nhận mật khẩu"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          <Button type="submit" loading={loading} className="w-full justify-center">
            Đăng ký
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-dark/60 dark:text-gray-light/60">
          Đã có tài khoản?{' '}
          <Link to="/dang-nhap" className="font-medium text-wood hover:underline dark:text-accent">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
