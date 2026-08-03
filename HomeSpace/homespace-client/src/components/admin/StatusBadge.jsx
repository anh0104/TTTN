/**
 * components/admin/StatusBadge.jsx
 * ------------------------------------------------------
 */

const StatusBadge = ({ status }) => {
  const isActive = status === 'active' || status === 'published';
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive
          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
          : 'bg-gray-light text-dark/50 dark:bg-white/10 dark:text-gray-light/50'
      }`}
    >
      {isActive ? 'Hoạt động' : 'Ẩn'}
    </span>
  );
};

export default StatusBadge;
