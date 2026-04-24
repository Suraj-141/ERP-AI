import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Layout } from '../components/Layout';
import { LoadingSpinner, Badge } from '../components/Common';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    department: 'HR',
    salary: '',
    joinDate: '',
    leaveBalance: '20',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/employees/${editingId}`, formData);
      } else {
        await axiosInstance.post('/employees', formData);
      }
      setFormData({
        userId: '',
        department: 'HR',
        salary: '',
        joinDate: '',
        leaveBalance: '20',
      });
      setEditingId(null);
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      userId: employee.userId._id,
      department: employee.department,
      salary: employee.salary,
      joinDate: employee.joinDate.split('T')[0],
      leaveBalance: employee.leaveBalance,
    });
    setEditingId(employee._id);
    setShowForm(true);
  };

  if (loading) return <Layout><LoadingSpinner /></Layout>;

  const departments = ['HR', 'Engineering', 'Sales', 'Finance'];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
            <p className="text-slate-600 text-sm mt-1">Manage team members and details</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                userId: '',
                department: 'HR',
                salary: '',
                joinDate: '',
                leaveBalance: '20',
              });
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            {showForm ? 'Cancel' : '+ Add Employee'}
          </button>
        </div>

        {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg text-sm">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              {editingId ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="User ID"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="number"
                placeholder="Leave Balance"
                value={formData.leaveBalance}
                onChange={(e) => setFormData({ ...formData, leaveBalance: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors md:col-span-2 text-sm"
              >
                {editingId ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        )}

        {/* Employees Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Leave Balance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{employee.userId.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{employee.userId.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{employee.department}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    ₹{employee.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {employee.leaveBalance} days
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge color={employee.status === 'active' ? 'teal' : 'slate'}>
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-teal-600 hover:text-teal-700 font-medium text-xs"
                    >
                      Edit
                    </button>
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

export default Employees;
