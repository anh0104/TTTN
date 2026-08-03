/**
 * redux/store.js
 * ------------------------------------------------------
 * Cấu hình Redux store tổng, kết hợp các slice: auth, cart, theme.
 * ------------------------------------------------------
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});

export default store;
