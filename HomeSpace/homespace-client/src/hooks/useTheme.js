/**
 * hooks/useTheme.js
 * ------------------------------------------------------
 */

import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../redux/slices/themeSlice';

const useTheme = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return {
    mode,
    isDark: mode === 'dark',
    toggle: () => dispatch(toggleTheme()),
    setMode: (value) => dispatch(setTheme(value)),
  };
};

export default useTheme;
