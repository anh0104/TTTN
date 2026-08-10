/**
 * pages/client/SepayPaymentPage.jsx
 * ------------------------------------------------------
 * Trang Thanh Toán Chuyển Khoản Qua QR SePay:
 * - Hiển thị mã QR VietQR động của SePay với số tiền & mã đơn chính xác.
 * - Nút Copy số tài khoản, số tiền, nội dung chuyển khoản.
 * - Tự động kiểm tra trạng thái thanh toán theo thời gian thực (Polling mỗi 3s).
 * - Giao diện cập nhật TỰ ĐỘNG sang "Thanh toán thành công" ngay khi SePay nhận Webhook!
 * ------------------------------------------------------
 */

import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, Copy, Check, RefreshCw, CheckCircle, ShieldAlert, ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

import orderService from '../../services/orderService';
import paymentService from '../../services/paymentService';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { formatCurrency, formatDate } from '../../utils/format';

const SepayPaymentPage = () => {
  const { orderCode } = useParams();

  const [order, setOrder] = useState(null);
  const [bankInfo, setBankInfo] = useState({
    bankAcc: '102875609146',
    bankName: 'VietinBank',
    accountName: 'NGUYEN THI MINH ANH',
  });
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Lấy thông tin tài khoản SePay
  useEffect(() => {
    paymentService
      .getSepayInfo()
      .then((res) => {
        if (res.data?.data) {
          setBankInfo(res.data.data);
        }
      })
      .catch((err) => console.error('Không lấy được thông tin SePay bank:', err));
  }, []);

  // Hàm load chi tiết đơn hàng
  const loadOrder = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);
      try {
        setChecking(true);
        const res = await orderService.getOrderByCode(orderCode);
        setOrder(res.data.data);
      } catch (err) {
        console.error('Lỗi lấy đơn hàng:', err);
      } finally {
        setLoading(false);
        setChecking(false);
      }
    },
    [orderCode]
  );

  // Initial load
  useEffect(() => {
    loadOrder(true);
  }, [loadOrder]);

  // Polling tự động kiểm tra xem đơn hàng đã được thanh toán qua SePay Webhook chưa (mỗi 3 giây)
  useEffect(() => {
    if (!order || order.paymentStatus === 'paid' || order.status === 'cancelled') return;

    const interval = setInterval(() => {
      loadOrder(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [order, loadOrder]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Đã sao chép ${fieldName}!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) return <Loader fullScreen />;

  if (!order) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="text-2xl font-bold">Không tìm thấy đơn hàng</h2>
        <p className="mt-2 text-dark/60 dark:text-gray-light/60">Đơn hàng không tồn tại hoặc đã bị hủy.</p>
        <Link to="/" className="mt-4 inline-block">
          <Button>Trở về trang chủ</Button>
        </Link>
      </div>
    );
  }

  const { totalAmount, paymentStatus, status } = order;
  const isPaid = paymentStatus === 'paid';

  // Nội dung chuyển khoản bắt buộc từ khóa SEVQR theo quy định của VietinBank & SePay
  const transferContent = `SEVQR ${order.orderCode}`;

  // URL tạo ảnh VietQR tự động từ dịch vụ SePay
  const sepayQrUrl = `https://qr.sepay.vn/img?acc=${encodeURIComponent(bankInfo.bankAcc)}&bank=${encodeURIComponent(
    bankInfo.bankName
  )}&amount=${Math.round(totalAmount)}&des=${encodeURIComponent(transferContent)}`;

  // Giao diện khi ĐÃ THANH TOÁN THÀNH CÔNG
  if (isPaid) {
    return (
      <div className="container-custom section-padding animate-fade-in flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-lg rounded-3xl border border-emerald-500/20 bg-white p-8 shadow-xl dark:bg-neutral-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle size={48} className="animate-bounce" />
          </div>

          <h1 className="heading-display mt-6 text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
            Thanh toán thành công!
          </h1>
          <p className="mt-2 text-sm text-dark/70 dark:text-gray-light/70">
            Hệ thống đã nhận được tiền chuyển khoản qua SePay. Cảm ơn bạn đã mua hàng tại HomeSpace!
          </p>

          <div className="mt-6 rounded-2xl bg-gray-light p-4 text-left text-sm dark:bg-neutral-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-dark/60 dark:text-gray-light/60">Mã đơn hàng:</span>
              <span className="font-bold text-wood dark:text-accent">{order.orderCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark/60 dark:text-gray-light/60">Số tiền thanh toán:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark/60 dark:text-gray-light/60">Thời gian xác nhận:</span>
              <span>{order.paidAt ? formatDate(order.paidAt) : 'Vừa xong'}</span>
            </div>
            {order.sepayTransactionId && (
              <div className="flex justify-between border-t border-wood/10 pt-2 dark:border-gray-light/10">
                <span className="text-dark/60 dark:text-gray-light/60">Mã giao dịch SePay:</span>
                <span className="font-mono text-xs font-semibold">{order.sepayTransactionId}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full justify-center gap-2">
                <Home size={18} /> Quay về trang chủ
              </Button>
            </Link>
            <Link to={`/don-hang/${orderCode}`} className="flex-1">
              <Button className="w-full justify-center gap-2">
                <ShoppingBag size={18} /> Xem đơn hàng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Giao diện CHỜ THANH TOÁN (Quét mã QR SePay)
  return (
    <div className="container-custom section-padding animate-fade-in">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/gio-hang" className="flex items-center gap-1.5 text-sm text-dark/60 hover:text-wood dark:text-gray-light/60 dark:hover:text-accent">
            <ArrowLeft size={16} /> Quay lại
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            Tự động xác nhận giao dịch qua SePay
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Khối Mã QR */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-wood/10 bg-white p-6 text-center shadow-lg dark:border-gray-light/10 dark:bg-neutral-900 md:col-span-5">
            <div className="mb-3 flex items-center gap-2 rounded-full bg-wood/10 px-3 py-1 text-xs font-bold text-wood dark:bg-accent/20 dark:text-accent">
              <QrCode size={14} /> Quét mã VietQR
            </div>

            {/* Khung chứa ảnh QR */}
            <div className="relative rounded-2xl border-2 border-wood/20 p-3 bg-white shadow-inner dark:border-accent/40">
              <img
                src={sepayQrUrl}
                alt="SePay VietQR Code"
                className="h-64 w-64 max-w-full object-contain rounded-xl"
              />
            </div>

            <p className="mt-4 text-xs text-dark/60 dark:text-gray-light/60">
              Mở app ngân hàng (MBBank, VietinBank, Vietcombank, Techcombank...) quét mã QR để thanh toán tự động
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              <ShieldAlert size={16} className="shrink-0 text-amber-600" />
              <span>Vui lòng không sửa Nội dung chuyển khoản</span>
            </div>
          </div>

          {/* Khối Thông tin Chuyển khoản Chi tiết */}
          <div className="flex flex-col justify-between rounded-3xl border border-wood/10 bg-white p-6 shadow-lg dark:border-gray-light/10 dark:bg-neutral-900 md:col-span-7">
            <div>
              <div className="border-b border-wood/10 pb-4 dark:border-gray-light/10">
                <span className="text-xs font-medium text-dark/50 dark:text-gray-light/50">Mã đơn hàng</span>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-wood dark:text-accent">{order.orderCode}</h2>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Chờ thanh toán
                  </span>
                </div>
              </div>

              {/* Danh sách thông tin tài khoản */}
              <div className="mt-5 space-y-4">
                {/* Ngân hàng */}
                <div className="flex items-center justify-between rounded-2xl bg-gray-light/60 p-3.5 dark:bg-neutral-800">
                  <div>
                    <span className="text-xs text-dark/50 dark:text-gray-light/50">Ngân hàng thụ hưởng</span>
                    <p className="font-bold text-dark dark:text-white">{bankInfo.bankName}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(bankInfo.bankName, 'Tên ngân hàng')}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm hover:bg-wood/10 dark:bg-neutral-700 dark:hover:bg-accent/20"
                    title="Sao chép"
                  >
                    {copiedField === 'Tên ngân hàng' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Số tài khoản */}
                <div className="flex items-center justify-between rounded-2xl bg-gray-light/60 p-3.5 dark:bg-neutral-800">
                  <div>
                    <span className="text-xs text-dark/50 dark:text-gray-light/50">Số tài khoản</span>
                    <p className="font-mono text-lg font-bold text-dark dark:text-white">{bankInfo.bankAcc}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(bankInfo.bankAcc, 'Số tài khoản')}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm hover:bg-wood/10 dark:bg-neutral-700 dark:hover:bg-accent/20"
                    title="Sao chép"
                  >
                    {copiedField === 'Số tài khoản' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Tên chủ tài khoản */}
                <div className="flex items-center justify-between rounded-2xl bg-gray-light/60 p-3.5 dark:bg-neutral-800">
                  <div>
                    <span className="text-xs text-dark/50 dark:text-gray-light/50">Chủ tài khoản</span>
                    <p className="font-semibold text-dark dark:text-white uppercase">{bankInfo.accountName}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(bankInfo.accountName, 'Tên chủ tài khoản')}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm hover:bg-wood/10 dark:bg-neutral-700 dark:hover:bg-accent/20"
                    title="Sao chép"
                  >
                    {copiedField === 'Tên chủ tài khoản' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Số tiền */}
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-3.5 dark:bg-emerald-950/40">
                  <div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Số tiền cần chuyển</span>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(totalAmount)}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(Math.round(totalAmount).toString(), 'Số tiền')}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                    title="Sao chép"
                  >
                    {copiedField === 'Số tiền' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Nội dung chuyển khoản - bắt buộc bắt đầu bằng SEVQR theo yêu cầu VietinBank */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/70 p-3.5 dark:bg-amber-950/30">
                  <div>
                    <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">Nội dung chuyển khoản (bắt buộc)</span>
                    <p className="font-mono text-xl font-bold text-amber-900 dark:text-amber-200">{transferContent}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(transferContent, 'Nội dung chuyển khoản')}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600"
                    title="Sao chép nội dung"
                  >
                    {copiedField === 'Nội dung chuyển khoản' ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Trạng thái Polling thực tế */}
            <div className="mt-6 border-t border-wood/10 pt-4 dark:border-gray-light/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-dark/70 dark:text-gray-light/70">
                  <RefreshCw size={14} className={`text-wood dark:text-accent ${checking ? 'animate-spin' : ''}`} />
                  <span>Đang tự động kiểm tra biến động số dư qua SePay...</span>
                </div>
                <button
                  onClick={() => loadOrder(false)}
                  className="text-xs font-medium text-wood hover:underline dark:text-accent"
                >
                  Kiểm tra ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SepayPaymentPage;
