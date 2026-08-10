/**
 * pages/admin/DashboardPage.jsx
 * ------------------------------------------------------
 * Dashboard Admin: 4 card thống kê + biểu đồ doanh thu,
 * biểu đồ đơn hàng theo trạng thái, top sản phẩm, top danh mục.
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Package, FolderTree, Users, ShoppingBag } from 'lucide-react';

import dashboardService from '../../services/dashboardService';
import StatCard from '../../components/admin/StatCard';
import Loader from '../../components/common/Loader';
import { formatCurrency, getImageUrl } from '../../utils/format';

const STATUS_LABELS = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
};

const PIE_COLORS = ['#344e39', '#d1a153', '#577a5e', '#b8883b', '#dc2626'];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, revenueRes, statusRes, topProductsRes, topCategoriesRes] = await Promise.all([
          dashboardService.getStats().catch(() => ({ data: { data: {} } })),
          dashboardService.getRevenueChart(30).catch(() => ({ data: { data: [] } })),
          dashboardService.getOrderStatusChart().catch(() => ({ data: { data: [] } })),
          dashboardService.getTopProducts(5).catch(() => ({ data: { data: [] } })),
          dashboardService.getTopCategories(5).catch(() => ({ data: { data: [] } })),
        ]);

        if (statsRes?.data?.data) {
          setStats({
            totalProducts: statsRes.data.data.totalProducts || 0,
            totalCategories: statsRes.data.data.totalCategories || 0,
            totalUsers: statsRes.data.data.totalUsers || 0,
            totalOrders: statsRes.data.data.totalOrders || 0,
            totalRevenue: statsRes.data.data.totalRevenue || 0,
          });
        }

        const rData = revenueRes?.data?.data || [];
        setRevenueData(
          rData.map((r) => ({ ...r, revenue: Number(r.revenue || 0), orderCount: Number(r.orderCount || 0) }))
        );

        const sData = statusRes?.data?.data || [];
        setOrderStatusData(
          sData.map((s) => ({ name: STATUS_LABELS[s.status] || s.status, value: Number(s.count || 0) }))
        );

        setTopProducts(topProductsRes?.data?.data || []);
        setTopCategories(topCategoriesRes?.data?.data || []);
      } catch (err) {
        console.error('Lỗi tải dữ liệu dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Loader fullScreen />;

  const safeStats = stats || { totalProducts: 0, totalCategories: 0, totalUsers: 0, totalOrders: 0, totalRevenue: 0 };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-semibold">Tổng quan</h1>

      {/* Card thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Tổng sản phẩm" value={safeStats.totalProducts} color="wood" />
        <StatCard icon={FolderTree} label="Tổng danh mục" value={safeStats.totalCategories} color="blue" />
        <StatCard icon={Users} label="Tổng người dùng" value={safeStats.totalUsers} color="emerald" />
        <StatCard icon={ShoppingBag} label="Tổng đơn hàng" value={safeStats.totalOrders} color="amber" />
      </div>

      <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
        <p className="text-sm text-dark/60 dark:text-gray-light/60">Tổng doanh thu (không tính đơn đã hủy)</p>
        <p className="mt-1 text-2xl font-semibold text-wood dark:text-accent">{formatCurrency(safeStats.totalRevenue)}</p>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
          <h3 className="mb-4 font-semibold">Doanh thu 30 ngày gần nhất</h3>
          {revenueData.length === 0 ? (
            <p className="flex h-64 items-center justify-center text-sm text-dark/40 dark:text-gray-light/40">
              Chưa có dữ liệu đơn hàng
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#344e391A" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}tr`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="revenue" stroke="#344e39" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
          <h3 className="mb-4 font-semibold">Đơn hàng theo trạng thái</h3>
          {orderStatusData.length === 0 ? (
            <p className="flex h-64 items-center justify-center text-sm text-dark/40 dark:text-gray-light/40">
              Chưa có dữ liệu đơn hàng
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={orderStatusData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {orderStatusData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top sản phẩm / Top danh mục */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
          <h3 className="mb-4 font-semibold">Top sản phẩm bán chạy</h3>
          {topProducts.length === 0 ? (
            <p className="py-8 text-center text-sm text-dark/40 dark:text-gray-light/40">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-3">
              {topProducts.map((item) => (
                <li key={item.productId} className="flex items-center gap-3">
                  <img
                    src={getImageUrl(item.product?.thumbnail)}
                    alt={item.product?.name}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <span className="flex-1 truncate text-sm">{item.product?.name}</span>
                  <span className="shrink-0 text-sm font-medium text-wood dark:text-accent">
                    Đã bán: {item.totalSold}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
          <h3 className="mb-4 font-semibold">Top danh mục bán chạy</h3>
          {topCategories.length === 0 ? (
            <p className="py-8 text-center text-sm text-dark/40 dark:text-gray-light/40">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-3">
              {topCategories.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span>{item.product?.category?.name || 'Không xác định'}</span>
                  <span className="font-medium text-wood dark:text-accent">Đã bán: {item.totalSold}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
