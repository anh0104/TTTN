/**
 * pages/client/OrderListPage.jsx
 * ------------------------------------------------------
 * Danh sách đơn hàng của tôi
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CreditCard, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

import orderService from '../../services/orderService';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate, getImageUrl } from '../../utils/format';

const statusBadges = {
  pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
  shipping: { label: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
  completed: { label: 'Hoàn thành', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' },
};

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((res) => setOrders(res.data.data))
      .catch((err) => toast.error('Không thể tải danh sách đơn hàng'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  if (orders.length === 0) {
    return (
      <div className="container-custom section-padding flex flex-col items-center justify-center text-center">
        <Package size={56} className="text-dark/20 dark:text-gray-light/20 mb-3" />
        <h2 className="heading-display text-2xl font-semibold">Bạn chưa có đơn hàng nào</h2>
        <p className="mt-1 text-dark/60 dark:text-gray-light/60">Khám phá và đặt mua các sản phẩm nội thất tuyệt đẹp!</p>
        <Link to="/san-pham" className="mt-4">
          <Button>Khám phá ngay</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding animate-fade-in">
      <h1 className="heading-display mb-8 text-2xl font-semibold md:text-3xl">Đơn hàng của tôi</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const badge = statusBadges[order.status] || statusBadges.pending;
          const isUnpaidBank = order.paymentMethod === 'bank_transfer' && order.paymentStatus === 'unpaid' && order.status === 'pending';

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-wood/10 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-light/10 dark:bg-neutral-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wood/10 pb-4 dark:border-gray-light/10">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-wood dark:text-accent">{order.orderCode}</span>
                  <span className="text-xs text-dark/50 dark:text-gray-light/50">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.color}`}>
                    {badge.label}
                  </span>
                  {order.paymentStatus === 'paid' ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Chưa thanh toán
                    </span>
                  )}
                </div>
              </div>

              {/* Items preview */}
              <div className="divide-y divide-wood/5 py-3 dark:divide-gray-light/5">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-2">
                    <img
                      src={getImageUrl(item.product?.thumbnail)}
                      alt={item.productName}
                      className="h-14 w-14 rounded-lg bg-gray-light object-cover dark:bg-neutral-800"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{item.productName}</p>
                      <p className="text-xs text-dark/50 dark:text-gray-light/50">
                        {formatCurrency(item.price)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-wood/10 pt-4 dark:border-gray-light/10">
                <div className="text-sm">
                  <span className="text-dark/60 dark:text-gray-light/60">Tổng tiền: </span>
                  <span className="text-base font-bold text-wood dark:text-accent">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {isUnpaidBank && (
                    <Link to={`/thanh-toan/sepay/${order.orderCode}`}>
                      <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                        <CreditCard size={15} /> Thanh toán QR SePay
                      </Button>
                    </Link>
                  )}
                  <Link to={`/don-hang/${order.orderCode}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      Chi tiết <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderListPage;
