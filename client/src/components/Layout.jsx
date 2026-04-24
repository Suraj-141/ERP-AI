import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
