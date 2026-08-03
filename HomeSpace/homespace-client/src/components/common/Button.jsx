/**
 * components/common/Button.jsx
 * ------------------------------------------------------
 * Button tái sử dụng với các variant theo theme HomeSpace.
 * ------------------------------------------------------
 */

import Loader from './Loader';

const variants = {
  primary: 'bg-wood text-white hover:bg-wood-700 dark:bg-accent dark:text-dark dark:hover:bg-accent-600',
  outline:
    'border border-wood text-wood hover:bg-wood hover:text-white dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark',
  ghost: 'text-dark hover:bg-gray-light dark:text-gray-light dark:hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader size={16} />}
      {children}
    </button>
  );
};

export default Button;
