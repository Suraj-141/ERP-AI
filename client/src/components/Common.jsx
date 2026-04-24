import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-teal-500"></div>
    </div>
  );
};

export const StatCard = ({ title, value, icon, color = 'teal' }) => {
  const colorClasses = {
    teal: 'bg-teal-500/10 border-teal-200',
    amber: 'bg-amber-500/10 border-amber-200',
    red: 'bg-red-500/10 border-red-200',
    blue: 'bg-blue-500/10 border-blue-200',
    indigo: 'bg-indigo-500/10 border-indigo-200',
  };

  const iconColors = {
    teal: 'text-teal-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
  };

  return (
    <div className={`bg-white rounded-lg border ${colorClasses[color]} p-6 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold mt-3 text-slate-900">{value}</p>
        </div>
        <div className={`${iconColors[color]} text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const Badge = ({ children, color = 'slate' }) => {
  const colorClasses = {
    teal: 'bg-teal-100 text-teal-700 border border-teal-200',
    amber: 'bg-amber-100 text-amber-700 border border-amber-200',
    red: 'bg-red-100 text-red-700 border border-red-200',
    blue: 'bg-blue-100 text-blue-700 border border-blue-200',
    green: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${colorClasses[color]}`}>
      {children}
    </span>
  );
};
