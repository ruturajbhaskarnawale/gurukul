"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';

interface DashboardStats {
  students: number;
  courses: number;
  materials: number;
  applications: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.get<DashboardStats>('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats?.students, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Courses', value: stats?.courses, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Study Materials', value: stats?.materials, icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Applications', value: stats?.applications, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Overview</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Monitor your platform's core metrics and manage content.
        </p>
      </div>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, idx) => (
          <StaggerItem key={idx}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${card.bg}`}>
                    <svg className={`w-6 h-6 ${card.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {loading ? (
                        <span className="inline-block w-12 h-6 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></span>
                      ) : (
                        card.value || 0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quick Actions / Getting Started */}
      <FadeIn delay={0.3}>
        <div className="mt-8 rounded-xl bg-gradient-to-r from-red-500/10 via-orange-500/5 to-transparent border border-red-500/20 p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Welcome to your Gurukul Admin Panel</h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mb-6">
            Everything you need to manage your institute's digital presence is accessible from the sidebar. 
            Add new classroom courses, upload study materials for your students, record test results, and review career applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/admin/courses" className="px-4 py-2 bg-white dark:bg-slate-800 text-sm font-semibold rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Manage Courses
            </a>
            <a href="/admin/materials" className="px-4 py-2 bg-white dark:bg-slate-800 text-sm font-semibold rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Upload Material
            </a>
            <a href="/admin/tests" className="px-4 py-2 bg-white dark:bg-slate-800 text-sm font-semibold rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Enter Test Results
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
