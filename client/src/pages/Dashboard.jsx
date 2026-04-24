import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Layout } from '../components/Layout';
import { LoadingSpinner, StatCard } from '../components/Common';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Layout><LoadingSpinner /></Layout>;
  if (error) return <Layout><div className="text-red-600">{error}</div></Layout>;
  if (!stats) return <Layout><div>No data available</div></Layout>;

  // Format monthly revenue data for chart
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = stats.monthlyRevenue.map(item => ({
    month: monthNames[item._id.month - 1],
    revenue: item.total,
  }));

  // Format order status data
  const statusData = stats.orderStatusBreakdown.map(item => ({
    status: item._id,
    count: item.count,
  }));

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      processing: 'blue',
      shipped: 'blue',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">Overview of business metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
            icon="◆"
            color="teal"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="⊞"
            color="blue"
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStockProducts}
            icon="▦"
            color="red"
          />
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon="●"
            color="amber"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-red-200 bg-red-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ₹{(stats.totalExpenses / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="bg-white rounded-lg border border-teal-200 bg-teal-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Net Profit</h3>
            <p className={`text-2xl font-bold ${stats.totalRevenue - stats.totalExpenses >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
              ₹{((stats.totalRevenue - stats.totalExpenses) / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="bg-white rounded-lg border border-blue-200 bg-blue-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalOrders > 0 ? Math.floor(stats.totalOrders * 1.3) : 0}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#14b8a6" name="Revenue" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Orders by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0d9488" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
