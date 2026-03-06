"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { apiClient, ApiError } from '@/lib/apiClient';
import { useAuth } from '@/lib/authContext';

// ── Types (matching backend response) ─────────────────────────────────────
interface Course { id: string; title: string; }
interface Enrollment { course: Course; }
interface StudentProfile { enrollments: Enrollment[]; }
interface UserProfile {
  id: string;
  name: string;
  email: string;
  studentProfile: StudentProfile | null;
}
interface TestResult {
  id: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  testDate: string;
}
interface Announcement { label: string; text: string; priority: 'important' | 'notice'; }

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`} />
);

export default function DashboardPage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (!authUser) return;
    const fetchData = async () => {
      try {
        const [profileData, testsData] = await Promise.all([
          apiClient.get<UserProfile>('/portal/me'),
          apiClient.get<TestResult[]>('/portal/tests'),
        ]);
        setProfile(profileData);
        setTestResults(testsData);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.push('/login');
        } else {
          setError('Failed to load dashboard data. The backend may be offline.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, router]);

  // Derive display values
  const firstName = profile?.name?.split(' ')[0] ?? authUser?.name?.split(' ')[0] ?? 'Student';
  const enrolledCourse = profile?.studentProfile?.enrollments?.[0]?.course?.title ?? 'No active enrollment';
  const recentTests = testResults.slice(0, 3);

  // Static announcements (could come from backend in future)
  const announcements: Announcement[] = [
    { priority: 'important', label: 'Important', text: 'Practice sheets have been uploaded to Materials. Check the Study Materials section.' },
    { priority: 'notice', label: 'Notice', text: 'Doubt clearing session details will be updated on the portal shortly.' },
  ];

  if (authLoading || (!profile && loading)) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto w-full">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Skeleton className="lg:col-span-2 h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <p className="text-slate-500 text-sm mt-2">Make sure the backend server is running on port 5000.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">

      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here is an overview of your academic progress.
        </p>
      </FadeIn>

      {/* KPI Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaggerItem>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <span className="text-sm font-medium text-slate-500 mb-1 block">Current Program</span>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white line-clamp-1">{enrolledCourse}</h3>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="border-l-4 border-l-accent-dark">
            <CardContent className="p-6">
              <span className="text-sm font-medium text-slate-500 mb-1 block">Tests Attempted</span>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">{testResults.length}</h3>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <span className="text-sm font-medium text-slate-500 mb-1 block">Avg. Score</span>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {testResults.length > 0
                  ? `${Math.round(testResults.reduce((sum, t) => sum + (t.marksObtained / t.totalMarks) * 100, 0) / testResults.length)}%`
                  : '—'}
              </h3>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Recent Test Results */}
        <SlideUp className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Recent Test Results</h3>
              {recentTests.length === 0 ? (
                <p className="text-slate-500 text-sm">No test results yet.</p>
              ) : (
                <div className="space-y-6">
                  {recentTests.map((test) => (
                    <div key={test.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{test.testName}</span>
                        <span className="text-sm font-bold text-primary">
                          {test.marksObtained}/{test.totalMarks}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(test.marksObtained / test.totalMarks) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <a href="/portal/test-results" className="text-sm font-medium text-primary hover:underline">
                  View All Analytics &rarr;
                </a>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* Announcements */}
        <SlideUp delay={0.2} className="lg:col-span-1">
          <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Announcements</h3>
              <ul className="space-y-4">
                {announcements.map((a, i) => (
                  <li key={i} className={`p-4 rounded-lg border ${a.priority === 'important' ? 'bg-white/10 border-white/5' : 'bg-white/5 border-white/5'}`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${a.priority === 'important' ? 'text-accent' : 'text-slate-400'}`}>
                      {a.label}
                    </span>
                    <p className="text-sm text-slate-300">{a.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <a href="/portal/materials" className="text-sm font-medium text-accent hover:underline">
                  Go to Study Materials &rarr;
                </a>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

      </div>
    </div>
  );
}
