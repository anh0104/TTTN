/**
 * pages/auth/LoginPage.jsx
 * ------------------------------------------------------
 * Form đăng nhập: validate, gọi API qua Redux authSlice, toast, redirect.
 * ------------------------------------------------------
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../redux/slices/authSlice';
import { fetchCart } from '../../redux/slices/cartSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const redirectPath = location.state?.from?.pathname || '/';

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      toast.success(`Chào mừng trở lại, ${result.payload.user.name}!`);
      dispatch(fetchCart());
      navigate(redirectPath, { replace: true });
    } else {
      toast.error(result.payload || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="container-custom section-padding flex min-h-[70vh] items-center justify-center animate-fade-in">
      <div className="w-full max-w-md rounded-xl border border-wood/15 p-8 dark:border-gray-light/10">
        <h1 className="heading-display text-center text-2xl font-semibold">Đăng nhập</h1>
        <p className="mt-1 text-center text-sm text-dark/60 dark:text-gray-light/60">
          Chào mừng bạn quay lại HomeSpace
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            placeholder="••••••••"
          />

          <Button type="submit" loading={loading} className="w-full justify-center">
            Đăng nhập
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-dark/60 dark:text-gray-light/60">
          Chưa có tài khoản?{' '}
          <Link to="/dang-ky" className="font-medium text-wood hover:underline dark:text-accent">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
