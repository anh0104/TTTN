/**
 * hooks/useDebounce.js
 * ------------------------------------------------------
 * Trì hoãn cập nhật giá trị cho đến khi người dùng ngừng gõ
 * trong `delay` ms. Dùng cho ô tìm kiếm sản phẩm để tránh
 * gọi API liên tục theo từng ký tự gõ.
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
