/**
 * redux/slices/authSlice.js
 * ------------------------------------------------------
 * Quản lý state đăng nhập: user hiện tại, token, trạng thái loading.
 * Token được đồng bộ vào localStorage để tồn tại sau khi reload trang.
 * ------------------------------------------------------
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
  user: JSON.parse(localStorage.getItem('homespace-user')) || null,
  accessToken: localStorage.getItem('homespace-access-token') || null,
  isAuthenticated: !!localStorage.getItem('homespace-access-token'),
  loading: false,
  error: null,
};

/**
 * Đăng ký tài khoản mới
 */
export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authService.register(payload);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Đăng ký thất bại');
  }
});

/**
 * Đăng nhập
 */
export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(payload);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Đăng nhập thất bại');
  }
});

/**
 * Đăng xuất - gọi API thu hồi refresh token, sau đó xóa state dù API lỗi hay không.
 */
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await authService.logout();
  } catch {
    // Bỏ qua lỗi - vẫn logout ở phía client dù API lỗi
  }
});

const persistAuth = (user, accessToken, refreshToken) => {
  localStorage.setItem('homespace-user', JSON.stringify(user));
  localStorage.setItem('homespace-access-token', accessToken);
  localStorage.setItem('homespace-refresh-token', refreshToken);
};

const clearAuthStorage = () => {
  localStorage.removeItem('homespace-user');
  localStorage.removeItem('homespace-access-token');
  localStorage.removeItem('homespace-refresh-token');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Dùng khi cần cập nhật thông tin user thủ công (VD: sau khi sửa hồ sơ)
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('homespace-user', JSON.stringify(state.user));
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Register =====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        persistAuth(action.payload.user, action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== Login =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        persistAuth(action.payload.user, action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== Logout =====
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        clearAuthStorage();
      });
  },
});

export const { updateUserInfo, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
