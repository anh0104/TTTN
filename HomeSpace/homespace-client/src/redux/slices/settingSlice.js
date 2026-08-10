/**
 * redux/slices/settingSlice.js
 * ------------------------------------------------------
 * Quản lý state cấu hình giao diện (Logo, primary_color, ...)
 * ------------------------------------------------------
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingService from '../../services/settingService';

export const fetchSettings = createAsyncThunk('setting/fetchSettings', async () => {
  const response = await settingService.getSettings();
  return response.data.data;
});

export const updateSettingsThunk = createAsyncThunk('setting/updateSettings', async (payload) => {
  const response = await settingService.updateSettings(payload);
  return response.data.data;
});

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    settings: {
      logo: '',
      primary_color: '#344e39',
      dark_mode_default: 'false',
    },
    loading: false,
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(updateSettingsThunk.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export const { setSettings } = settingSlice.actions;
export default settingSlice.reducer;
