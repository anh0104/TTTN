/**
 * redux/slices/themeSlice.js
 * ------------------------------------------------------
 * Quản lý Dark/Light mode, đồng bộ với localStorage + class
 * 'dark' trên thẻ <html> (TailwindCSS dark mode strategy).
 * ------------------------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const saved = localStorage.getItem('homespace-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeClass = (mode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('homespace-theme', mode);
};

const initialState = {
  mode: getInitialTheme(),
};

// Áp dụng ngay khi app khởi chạy (đồng bộ với script chống FOUC trong index.html)
applyThemeClass(initialState.mode);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      applyThemeClass(state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      applyThemeClass(state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
