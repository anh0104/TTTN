/**
 * pages/client/CheckoutPage.jsx
 * ------------------------------------------------------
 * Trang Thanh Toán (Checkout):
 * - Điền thông tin giao hàng (Họ tên, SĐT, Địa chỉ, Ghi chú)
 * - Chọn Phương thức thanh toán (Chuyển khoản QR SePay vs COD)
 * - Xem tóm tắt đơn hàng
 * - Đặt hàng -> Chuyển sang trang Thanh toán SePay hoặc Đơn hàng
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QrCode, Truck, CheckCircle2, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import orderService from '../../services/orderService';
import { fetchCart } from '../../redux/slices/cartSlice';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatCurrency, getImageUrl } from '../../utils/format';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, loading: cartLoading } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // Mặc định Thanh toán bằng tiền mặt (COD)
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.warning('Vui lòng nhập họ và tên người nhận');
      return;
    }
    if (!formData.phone.trim()) {
      toast.warning('Vui lòng nhập số điện thoại');
      return;
    }
    if (!formData.address.trim()) {
      toast.warning('Vui lòng nhập địa chỉ nhận hàng');
      return;
    }

    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }

    try {
      setSubmitting(true);
      const res = await orderService.createOrder({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        note: formData.note.trim(),
        paymentMethod,
      });

      const newOrder = res.data.data;
      dispatch(fetchCart()); // Đổi mới giỏ hàng

      if (paymentMethod === 'bank_transfer') {
        // Chuyển thẳng sang trang quét mã QR thanh toán SePay (Chưa báo đặt hàng thành công)
        navigate(`/thanh-toan/sepay/${newOrder.orderCode}`);
      } else {
        // Thanh toán tiền mặt (COD) -> Báo thành công và chuyển về chi tiết đơn hàng
        toast.success('Đặt hàng thành công!');
        navigate(`/don-hang/${newOrder.orderCode}`);
      }
    } catch (err) {
      console.error('Lỗi đặt hàng:', err);
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading && items.length === 0) return <Loader fullScreen />;

  if (!cartLoading && items.length === 0) {
    return (
      <div className="container-custom section-padding flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="heading-display text-2xl font-semibold">Giỏ hàng của bạn đang trống</h1>
        <p className="text-dark/60 dark:text-gray-light/60">Hãy thêm sản phẩm vào giỏ trước khi thanh toán.</p>
        <Link to="/san-pham">
          <Button>Xem sản phẩm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/gio-hang" className="flex items-center gap-1.5 text-sm text-dark/60 hover:text-wood dark:text-gray-light/60 dark:hover:text-accent">
          <ArrowLeft size={16} /> Quay lại giỏ hàng
        </Link>
      </div>

      <h1 className="heading-display mb-8 text-2xl font-semibold md:text-3xl">Thanh toán đơn hàng</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cột trái: Thông tin nhận hàng & Phương thức thanh toán */}
        <div className="space-y-8 lg:col-span-7">
          {/* Section 1: Thông tin người nhận */}
          <div className="rounded-2xl border border-wood/10 bg-white p-6 shadow-sm dark:border-gray-light/10 dark:bg-neutral-900">
            <h2 className="mb-5 text-lg font-semibold text-wood dark:text-accent flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-wood/10 text-xs font-bold text-wood dark:bg-accent/20 dark:text-accent">1</span>
              Thông tin nhận hàng
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Họ và tên *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  className="w-full rounded-xl border border-wood/20 bg-transparent px-4 py-2.5 outline-none focus:border-wood dark:border-gray-light/20 dark:focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ví dụ: 0987654321"
                    required
                    className="w-full rounded-xl border border-wood/20 bg-transparent px-4 py-2.5 outline-none focus:border-wood dark:border-gray-light/20 dark:focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email (không bắt buộc)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full rounded-xl border border-wood/10 bg-gray-light/50 px-4 py-2.5 text-dark/60 dark:border-gray-light/10 dark:bg-neutral-800 dark:text-gray-light/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Địa chỉ giao hàng *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP"
                  required
                  className="w-full rounded-xl border border-wood/20 bg-transparent px-4 py-2.5 outline-none focus:border-wood dark:border-gray-light/20 dark:focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Ghi chú đơn hàng (nếu có)</label>
                <textarea
                  name="note"
                  rows={3}
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Ghi chú về thời gian giao hàng, hướng dẫn chỉ đường..."
                  className="w-full rounded-xl border border-wood/20 bg-transparent px-4 py-2.5 outline-none focus:border-wood dark:border-gray-light/20 dark:focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Phương thức thanh toán */}
          <div className="rounded-2xl border border-wood/10 bg-white p-6 shadow-sm dark:border-gray-light/10 dark:bg-neutral-900">
            <h2 className="mb-5 text-lg font-semibold text-wood dark:text-accent flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-wood/10 text-xs font-bold text-wood dark:bg-accent/20 dark:text-accent">2</span>
              Phương thức thanh toán
            </h2>

            <div className="space-y-3">
              {/* Option 1: COD (Mặc định) */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-wood bg-wood/5 ring-2 ring-wood/20 dark:border-accent dark:bg-accent/10 dark:ring-accent/20'
                    : 'border-wood/15 hover:border-wood/40 dark:border-gray-light/15'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-wood dark:accent-accent"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Truck className="text-wood dark:text-accent" size={20} />
                    <span className="font-semibold text-dark dark:text-white">Thanh toán khi nhận hàng (Tiền mặt / COD)</span>
                    <span className="rounded-full bg-wood/10 px-2 py-0.5 text-[11px] font-semibold text-wood dark:bg-accent/20 dark:text-accent">
                      Mặc định
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-dark/70 dark:text-gray-light/70">
                    Thanh toán bằng tiền mặt cho nhân viên giao hàng sau khi nhận và kiểm tra hàng.
                  </p>
                </div>
              </label>

              {/* Option 2: SePay QR */}
              <label
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-wood bg-wood/5 ring-2 ring-wood/20 dark:border-accent dark:bg-accent/10 dark:ring-accent/20'
                    : 'border-wood/15 hover:border-wood/40 dark:border-gray-light/15'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 accent-wood dark:accent-accent"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <QrCode className="text-wood dark:text-accent" size={20} />
                    <span className="font-semibold text-dark dark:text-white">Chuyển khoản QR Ngân hàng</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Hiện mã quét QR
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-dark/70 dark:text-gray-light/70">
                    Chuyển sang trang hiển thị mã QR để thanh toán. Tự động xác nhận khi tiền vào tài khoản!
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-wood/10 bg-white p-6 shadow-sm dark:border-gray-light/10 dark:bg-neutral-900">
            <h2 className="mb-4 text-lg font-semibold">Tóm tắt đơn hàng ({items.length} sản phẩm)</h2>

            {/* Danh sách items */}
            <div className="max-h-80 overflow-y-auto divide-y divide-wood/10 pr-1 dark:divide-gray-light/10">
              {items.map((item) => {
                const unitPrice = item.product.salePrice || item.product.price;
                return (
                  <div key={item.id} className="flex gap-3 py-3">
                    <img
                      src={getImageUrl(item.product.thumbnail)}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg bg-gray-light object-cover dark:bg-neutral-800"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="line-clamp-1 text-sm font-medium">{item.product.name}</h4>
                        <p className="text-xs text-dark/50 dark:text-gray-light/50">Số lượng: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-wood dark:text-accent">
                        {formatCurrency(unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2 border-t border-wood/10 pt-4 text-sm dark:border-gray-light/10">
              <div className="flex justify-between text-dark/70 dark:text-gray-light/70">
                <span>Tạm tính</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-dark/70 dark:text-gray-light/70">
                <span>Phí vận chuyển</span>
                <span className="text-emerald-600 font-medium dark:text-emerald-400">Miễn phí</span>
              </div>
              <div className="flex justify-between border-t border-wood/10 pt-3 text-base font-bold text-dark dark:text-white dark:border-gray-light/10">
                <span>Tổng tiền thanh toán</span>
                <span className="text-xl text-wood dark:text-accent">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full justify-center gap-2 py-3.5 text-base font-semibold"
              size="lg"
            >
              {submitting ? (
                'Đang xử lý...'
              ) : paymentMethod === 'bank_transfer' ? (
                <>
                  <CreditCard size={18} /> Tiến hành thanh toán QR SePay
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} /> Xác nhận đặt hàng (COD)
                </>
              )}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-dark/50 dark:text-gray-light/50">
              <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Thông tin thanh toán được bảo mật an toàn 100%</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
