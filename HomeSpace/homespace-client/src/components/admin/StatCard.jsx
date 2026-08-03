/**
 * components/admin/StatCard.jsx
 * ------------------------------------------------------
 */

const colorMap = {
  wood: 'bg-wood/10 text-wood dark:bg-accent/15 dark:text-accent',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
};

const StatCard = ({ icon: Icon, label, value, color = 'wood' }) => (
  <div className="flex items-center gap-4 rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorMap[color]}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-sm text-dark/60 dark:text-gray-light/60">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

export default StatCard;
