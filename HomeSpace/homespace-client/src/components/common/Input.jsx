/**
 * components/common/Input.jsx
 * ------------------------------------------------------
 */

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">{label}</label>
      )}
      <input
        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-dark/40 focus:border-wood dark:bg-neutral-900 dark:text-gray-light dark:placeholder:text-gray-light/40 dark:focus:border-accent ${
          error ? 'border-red-500' : 'border-wood/20 dark:border-gray-light/15'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
