"use client";

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/portal/PortalSidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Desktop & Mobile Sidebar */}
      <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-10">
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex justify-center items-center text-xs">YP</span>
            Gurukul
          </div>
          <button 
            className="text-slate-300 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Top Navigation Bar / User Context */}
        <header className="hidden md:flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 items-center justify-between px-8 z-10">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white truncate">
             Student Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200 dark:border-slate-700">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex justify-center items-center text-primary font-bold">
                 S
               </div>
               <div className="hidden lg:block text-sm">
                 <p className="font-semibold text-slate-700 dark:text-slate-200 leading-none">Student</p>
                 <span className="text-xs text-slate-500">Authenticated</span>
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 md:p-8 relative z-0">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}
