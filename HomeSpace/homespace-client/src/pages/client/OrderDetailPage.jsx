/**
 * pages/client/OrderDetailPage.jsx
 * ------------------------------------------------------
 * Chi tiết một đơn hàng cụ thể
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, XCircle, MapPin, Phone, User, Calendar, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

import orderService from '../../services/orderService';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate, getImageUrl } from '../../utils/format';

const statusMap = {
  pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
  shipping: { label: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
  completed: { label: 'Hoàn thành', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' },
};

const OrderDetailPage = () => {
  const { orderCode } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchDetail = () => {
    orderService
      .getOrderByCode(orderCode)
      .then((res) => setOrder(res.data.data))
      .catch((err) => toast.error('Không tìm thấy đơn hàng'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDetail();
  }, [orderCode]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) return;
    try {
      setCancelling(true);
      await orderService.cancelOrder(orderCode);
      toast.success('Đã hủy đơn hàng');
      fetchDetail();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể hủy đơn hàng');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!order) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="text-2xl font-bold">Không tìm thấy đơn hàng</h2>
        <Link to="/don-hang" className="mt-4 inline-block">
          <Button>Về danh sách đơn hàng</Button>
        </Link>
      </div>
    );
  }

  const badge = statusMap[order.status] || statusMap.pending;
  const isPendingUnpaidBank = order.paymentMethod === 'bank_transfer' && order.paymentStatus === 'unpaid' && order.status === 'pending';

  return (
    <div className="container-custom section-padding animate-fade-in">
      <div className="mb-6">
        <Link to="/don-hang" className="inline-flex items-center gap-1.5 text-sm text-dark/60 hover:text-wood dark:text-gray-light/60 dark:hover:text-accent">
          <ArrowLeft size={16} /> Danh sách đơn hàng
        </Link>
      </div>

      <div className="rounded-3xl border border-wood/10 bg-white p-6 shadow-sm dark:border-gray-light/10 dark:bg-neutral-900 md:p-8">
        {/* Header đơn hàng */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wood/10 pb-6 dark:border-gray-light/10">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="heading-display text-2xl font-bold text-wood dark:text-accent">Mã đơn: {order.orderCode}</h1>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.color}`}>{badge.label}</span>
            </div>
            <p className="mt-1 text-xs text-dark/60 dark:text-gray-light/60">
              Đặt hàng lúc: {formatDate(order.createdAt)}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {isPendingUnpaidBank && (
              <Link to={`/thanh-toan/sepay/${order.orderCode}`}>
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                  <CreditCard size={17} /> Thanh toán QR SePay
                </Button>
              </Link>
            )}
            {order.status === 'pending' && (
              <Button
                variant="outline"
                disabled={cancelling}
                onClick={handleCancelOrder}
                className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
              >
                <XCircle size={16} /> Hủy đơn hàng
              </Button>
            )}
          </div>
        </div>

        {/* Thông tin người nhận & phương thức */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-light/50 p-5 dark:bg-neutral-800">
            <h3 className="mb-3 font-semibold text-wood dark:text-accent flex items-center gap-2">
              <User size={18} /> Thông tin giao hàng
            </h3>
            <div className="space-y-1.5 text-sm">
              <p><strong>Người nhận:</strong> {order.fullName}</p>
              <p><strong>Số điện thoại:</strong> {order.phone}</p>
              <p><strong>Địa chỉ:</strong> {order.address}</p>
              {order.note && <p><strong>Ghi chú:</strong> {order.note}</p>}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-light/50 p-5 dark:bg-neutral-800">
            <h3 className="mb-3 font-semibold text-wood dark:text-accent flex items-center gap-2">
              <CreditCard size={18} /> Phương thức thanh toán
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Hình thức:</strong>{' '}
                {order.paymentMethod === 'bank_transfer' ? 'Chuyển khoản QR Ngân hàng (SePay)' : 'Thanh toán khi nhận hàng (COD)'}
              </p>
              <p className="flex items-center gap-2">
                <strong>Trạng thái:</strong>{' '}
                {order.paymentStatus === 'paid' ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Đã thanh toán thành công</span>
                ) : (
                  <span className="font-semibold text-amber-600 dark:text-amber-400">Chưa thanh toán</span>
                )}
              </p>
              {order.paidAt && (
                <p className="text-xs text-dark/60 dark:text-gray-light/60">
                  Thời gian thanh toán: {formatDate(order.paidAt)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Sản phẩm đã đặt</h3>
          <div className="divide-y divide-wood/10 rounded-2xl border border-wood/10 p-4 dark:divide-gray-light/10 dark:border-gray-light/10">
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <img
                  src={getImageUrl(item.product?.thumbnail)}
                  alt={item.productName}
                  className="h-16 w-16 rounded-xl bg-gray-light object-cover dark:bg-neutral-800"
                />
                <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{item.productName}</h4>
                    <p className="text-xs text-dark/50 dark:text-gray-light/50">Đơn giá: {formatCurrency(item.price)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-dark/60 dark:text-gray-light/60">x {item.quantity}</span>
                    <p className="font-semibold text-wood dark:text-accent">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng thanh toán */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2 rounded-2xl bg-gray-light/50 p-4 text-sm dark:bg-neutral-800">
            <div className="flex justify-between text-dark/70 dark:text-gray-light/70">
              <span>Phí vận chuyển:</span>
              <span className="text-emerald-600 font-medium">Miễn phí</span>
            </div>
            <div className="flex justify-between border-t border-wood/10 pt-2 font-bold text-base dark:border-gray-light/10">
              <span>Tổng cộng:</span>
              <span className="text-xl text-wood dark:text-accent">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
