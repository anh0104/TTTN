/**
 * pages/client/CartPage.jsx
 * ------------------------------------------------------
 * Giỏ hàng: thêm (từ trang khác), xóa, cập nhật số lượng, tính tổng tiền.
 * Dữ liệu lưu trong DB (không phải localStorage) - đồng bộ qua Redux cartSlice.
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

import { fetchCart, updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import useCart from '../../hooks/useCart';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatCurrency, getImageUrl } from '../../utils/format';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, loading } = useCart();
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (itemId, newQuantity, stock) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      toast.warning('Số lượng vượt quá tồn kho');
      return;
    }
    setUpdatingId(itemId);
    await dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
    setUpdatingId(null);
  };

  const handleRemove = async (itemId, name) => {
    await dispatch(removeFromCart(itemId));
    toast.success(`Đã xóa "${name}" khỏi giỏ hàng`);
  };

  if (loading && items.length === 0) return <Loader fullScreen />;

  if (!loading && items.length === 0) {
    return (
      <div className="container-custom section-padding flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
        <ShoppingBag size={56} className="text-dark/20 dark:text-gray-light/20" />
        <h1 className="heading-display text-2xl font-semibold">Giỏ hàng của bạn đang trống</h1>
        <p className="text-dark/60 dark:text-gray-light/60">Hãy khám phá các sản phẩm nội thất của HomeSpace</p>
        <Link to="/san-pham">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding animate-fade-in">
      <h1 className="heading-display mb-8 text-2xl font-semibold md:text-3xl">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Danh sách sản phẩm */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const unitPrice = item.product.salePrice || item.product.price;
            return (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-wood/10 p-4 dark:border-gray-light/10"
              >
                <Link to={`/san-pham/${item.product.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-light dark:bg-neutral-800">
                  <img src={getImageUrl(item.product.thumbnail)} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/san-pham/${item.product.slug}`} className="font-medium hover:text-wood dark:hover:text-accent">
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => handleRemove(item.id, item.product.name)}
                      className="shrink-0 text-dark/40 hover:text-red-600 dark:text-gray-light/40"
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-wood/20 dark:border-gray-light/15">
                      <button
                        disabled={updatingId === item.id}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.product.quantity)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-gray-light disabled:opacity-40 dark:hover:bg-white/5"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        disabled={updatingId === item.id}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.product.quantity)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-gray-light disabled:opacity-40 dark:hover:bg-white/5"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="font-semibold text-wood dark:text-accent">
                      {formatCurrency(unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="h-fit rounded-xl border border-wood/10 p-6 dark:border-gray-light/10">
          <h2 className="mb-4 font-semibold">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-sm text-dark/70 dark:text-gray-light/70">
            <span>Tạm tính</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-dark/70 dark:text-gray-light/70">
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-wood/10 pt-4 font-semibold dark:border-gray-light/10">
            <span>Tổng cộng</span>
            <span className="text-lg text-wood dark:text-accent">{formatCurrency(totalAmount)}</span>
          </div>
          <Button onClick={() => navigate('/thanh-toan')} className="mt-6 w-full justify-center" size="lg">
            Tiến hành thanh toán
          </Button>
          <Link to="/san-pham" className="mt-3 block text-center text-sm text-wood hover:underline dark:text-accent">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
