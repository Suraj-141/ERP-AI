import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email: demoEmail,
        password: 'password123',
      });

      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Demo login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Nexus</h1>
          <div className="w-12 h-1 bg-teal-500 mt-3"></div>
          <p className="text-slate-600 mt-2">Enterprise Management System</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition-colors bg-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition-colors bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-center text-slate-600 text-sm font-medium mb-4">Demo Accounts</p>
          <div className="space-y-2.5">
            <button
              onClick={() => handleDemoLogin('admin@erp.com')}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin('manager@erp.com')}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Manager
            </button>
            <button
              onClick={() => handleDemoLogin('employee@erp.com')}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Employee
            </button>
          </div>
          <p className="text-center text-slate-500 text-xs mt-4">
            Password: <span className="font-mono text-slate-700">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
