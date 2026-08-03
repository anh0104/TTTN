/**
 * components/common/Loader.jsx
 * ------------------------------------------------------
 * Spinner loading tái sử dụng, dùng khi chờ gọi API.
 * ------------------------------------------------------
 */

const Loader = ({ fullScreen = false, size = 32 }) => {
  const spinner = (
    <div
      className="animate-spin rounded-full border-2 border-wood/20 border-t-wood dark:border-accent/20 dark:border-t-accent"
      style={{ width: size, height: size }}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
