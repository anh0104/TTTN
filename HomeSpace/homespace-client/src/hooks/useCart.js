/**
 * hooks/useCart.js
 * ------------------------------------------------------
 * Gói logic thêm vào giỏ hàng dùng chung cho ProductCard,
 * trang chi tiết sản phẩm... Tự kiểm tra đăng nhập và hiện toast.
 * ------------------------------------------------------
 */

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart as addToCartThunk } from '../redux/slices/cartSlice';
import useAuth from './useAuth';

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, totalAmount, totalItems, loading } = useSelector((state) => state.cart);

  const handleAddToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      navigate('/dang-nhap');
      return;
    }

    const result = await dispatch(addToCartThunk({ productId: product.id, quantity }));
    if (addToCartThunk.fulfilled.match(result)) {
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
    } else {
      toast.error(result.payload || 'Không thể thêm vào giỏ hàng');
    }
  };

  return { items, totalAmount, totalItems, loading, handleAddToCart };
};

export default useCart;
