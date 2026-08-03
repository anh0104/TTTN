/**
 * redux/slices/cartSlice.js
 * ------------------------------------------------------
 * Quản lý state giỏ hàng - đồng bộ với DB qua cartService.
 * ------------------------------------------------------
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartService.getCart();
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Không thể tải giỏ hàng');
  }
});

export const addToCart = createAsyncThunk('cart/add', async (payload, { dispatch, rejectWithValue }) => {
  try {
    await cartService.addItem(payload);
    dispatch(fetchCart());
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Không thể thêm vào giỏ hàng');
  }
});

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ itemId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      await cartService.updateItem(itemId, quantity);
      dispatch(fetchCart());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Không thể cập nhật giỏ hàng');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (itemId, { dispatch, rejectWithValue }) => {
    try {
      await cartService.removeItem(itemId);
      dispatch(fetchCart());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Không thể xóa sản phẩm');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reset giỏ hàng ở client khi logout (không gọi API)
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
