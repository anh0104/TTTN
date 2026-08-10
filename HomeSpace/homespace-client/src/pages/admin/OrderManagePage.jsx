/**
 * pages/admin/OrderManagePage.jsx
 * ------------------------------------------------------
 * Admin - Quản lý danh sách đơn hàng & trạng thái thanh toán SePay
 * ------------------------------------------------------
 */

import { useEffect, useState, useCallback } from 'react';
import { Search, Filter, Eye, CheckCircle2, Clock, Truck, PackageCheck, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

import orderService from '../../services/orderService';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { formatCurrency, formatDate, getImageUrl } from '../../utils/format';

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const OrderManagePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await orderService.getAllOrdersAdmin({
        status: statusFilter || undefined,
        paymentStatus: paymentFilter || undefined,
        search: searchTerm || undefined,
      });
      setOrders(res.data.data);
    } catch (err) {
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, paymentFilter, searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, newStatus, newPaymentStatus) => {
    try {
      setUpdating(true);
      await orderService.updateOrderStatusAdmin(orderId, {
        status: newStatus,
        paymentStatus: newPaymentStatus,
      });
      toast.success('Cập nhật trạng thái thành công');
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: newStatus || prev.status,
          paymentStatus: newPaymentStatus || prev.paymentStatus,
        }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cập nhật thất bại');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-display text-2xl font-bold">Quản lý Đơn hàng</h1>
          <p className="text-sm text-dark/60 dark:text-gray-light/60">Theo dõi, duyệt đơn và trạng thái thanh toán SePay</p>
        </div>

        <Button variant="outline" onClick={fetchOrders} className="gap-2">
          <RefreshCw size={16} /> Tải lại
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-900">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 dark:text-gray-light/40" />
          <input
            type="text"
            placeholder="Tìm theo Mã đơn, Tên, SĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-wood/15 bg-gray-light/40 py-2 pl-9 pr-3 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-800"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-wood/15 bg-white py-2 px-3 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-800"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="rounded-xl border border-wood/15 bg-white py-2 px-3 text-sm outline-none dark:border-gray-light/15 dark:bg-neutral-800"
        >
          <option value="">Tất cả thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="unpaid">Chưa thanh toán</option>
        </select>
      </div>

      {/* Orders Table */}
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center text-dark/60 dark:bg-neutral-900 dark:text-gray-light/60">
          Không tìm thấy đơn hàng nào.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-wood/10 bg-white shadow-sm dark:border-gray-light/10 dark:bg-neutral-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-light/50 border-b border-wood/10 dark:bg-neutral-800 dark:border-gray-light/10">
              <tr>
                <th className="p-4 font-semibold">Mã đơn</th>
                <th className="p-4 font-semibold">Khách hàng</th>
                <th className="p-4 font-semibold">Tổng tiền</th>
                <th className="p-4 font-semibold">Thanh toán</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold">Ngày tạo</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood/10 dark:divide-gray-light/10">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-light/30 dark:hover:bg-neutral-800/50">
                  <td className="p-4 font-mono font-bold text-wood dark:text-accent">{ord.orderCode}</td>
                  <td className="p-4">
                    <p className="font-medium">{ord.fullName}</p>
                    <p className="text-xs text-dark/50 dark:text-gray-light/50">{ord.phone}</p>
                  </td>
                  <td className="p-4 font-semibold">{formatCurrency(ord.totalAmount)}</td>
                  <td className="p-4">
                    {ord.paymentStatus === 'paid' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 size={12} /> Đã thanh toán
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <Clock size={12} /> Chưa thanh toán
                      </span>
                    )}
                    <p className="mt-0.5 text-[11px] text-dark/50 dark:text-gray-light/50">
                      {ord.paymentMethod === 'bank_transfer' ? 'QR SePay' : 'COD'}
                    </p>
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      disabled={updating}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value, undefined)}
                      className="rounded-lg border border-wood/15 bg-transparent py-1 px-2 text-xs font-medium outline-none dark:border-gray-light/15"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="shipping">Đang giao</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs text-dark/60 dark:text-gray-light/60">{formatDate(ord.createdAt)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setDetailModalOpen(true);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-wood/10 text-wood hover:bg-wood/20 dark:bg-accent/20 dark:text-accent"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Chi tiết đơn hàng */}
      {detailModalOpen && selectedOrder && (
        <Modal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} title={`Chi tiết đơn: ${selectedOrder.orderCode}`}>
          <div className="space-y-4">
            <div className="rounded-xl bg-gray-light p-4 text-sm dark:bg-neutral-800 space-y-1.5">
              <p><strong>Khách hàng:</strong> {selectedOrder.fullName}</p>
              <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
              {selectedOrder.note && <p><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
              <p><strong>Phương thức:</strong> {selectedOrder.paymentMethod === 'bank_transfer' ? 'Chuyển khoản SePay' : 'COD'}</p>
              {selectedOrder.sepayTransactionId && (
                <p className="text-emerald-600 font-semibold dark:text-emerald-400">
                  <strong>Mã GD SePay:</strong> {selectedOrder.sepayTransactionId}
                </p>
              )}
            </div>

            <h4 className="font-semibold text-sm">Danh sách sản phẩm:</h4>
            <div className="max-h-48 overflow-y-auto divide-y divide-wood/10 dark:divide-gray-light/10">
              {selectedOrder.items?.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-sm">
                  <span className="line-clamp-1">{item.productName} (x{item.quantity})</span>
                  <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t pt-3 font-bold text-base">
              <span>Tổng tiền:</span>
              <span className="text-wood dark:text-accent">{formatCurrency(selectedOrder.totalAmount)}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {selectedOrder.paymentStatus !== 'paid' && (
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOrder.id, undefined, 'paid')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Xác nhận đã thanh toán
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setDetailModalOpen(false)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagePage;
