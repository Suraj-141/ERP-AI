import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Layout } from '../components/Layout';
import { LoadingSpinner, Badge } from '../components/Common';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/finance');
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/finance', formData);
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        description: '',
      });
      setShowForm(false);
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Finance</h1>
            <p className="text-slate-600 text-sm mt-1">Track income and expenses</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            {showForm ? 'Cancel' : '+ Add Transaction'}
          </button>
        </div>

        {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg text-sm">{error}</div>}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-teal-200 bg-teal-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-teal-600">
              ₹{(totalIncome / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="bg-white rounded-lg border border-red-200 bg-red-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">
              ₹{(totalExpense / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="bg-white rounded-lg border border-blue-200 bg-blue-500/5 p-6">
            <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Net Profit</h3>
            <p className={`text-3xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
              ₹{((totalIncome - totalExpense) / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Add Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors md:col-span-2 text-sm"
              >
                Add Transaction
              </button>
            </div>
          </form>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <Badge color={transaction.type === 'income' ? 'teal' : 'red'}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{transaction.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    ₹{transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{transaction.createdBy?.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
