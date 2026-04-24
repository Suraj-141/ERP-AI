import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '∎' },
    { path: '/inventory', label: 'Inventory', icon: '▦' },
    { path: '/orders', label: 'Orders', icon: '⊞' },
    { path: '/finance', label: 'Finance', icon: '◆' },
    { path: '/employees', label: 'Employees', icon: '●' },
    { path: '/ai', label: 'AI Assistant', icon: '⬢' },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex-col border-r border-slate-700">
      {/* Brand */}
      <div className="p-6 border-b border-slate-700">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Nexus</h1>
          <div className="w-8 h-0.5 bg-teal-500"></div>
        </div>
        <p className="text-xs text-slate-400 mt-3">Enterprise Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center gap-3 ${
              isActive(item.path)
                ? 'bg-teal-600/20 text-teal-400 border-l-2 border-teal-500 pl-3.5'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-700 p-4 space-y-3">
        <div className="px-2 text-xs">
          <p className="text-slate-500 mb-1">Account</p>
          <p className="font-medium text-slate-100 truncate">{user?.name || 'User'}</p>
          <p className="text-slate-500 text-xs mt-1 truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 px-3 py-2 rounded-md transition-colors text-xs font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
