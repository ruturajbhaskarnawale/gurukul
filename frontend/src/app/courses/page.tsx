"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Button } from '@/components/global/Button';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
}

const categoryColor: Record<string, string> = {
  Foundation: 'text-primary',
  Premium: 'text-accent-dark',
  Online: 'text-green-600',
  Commerce: 'text-purple-600',
};

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`} />
);

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiClient.get<Course[]>('/public/courses');
        setCourses(data);
      } catch {
        setError('Failed to load courses. The backend may be offline. Showing sample data.');
        // Fallback sample data
        setCourses([
          { id: '1', title: 'Class 11 Science Batches', slug: 'class-11-science', category: 'Foundation', description: 'Comprehensive 2-year classroom program building strong foundation for Board & Competitive exams.', duration: '2 Years', feeStructure: '₹45,000/year' },
          { id: '2', title: 'Target Droppers Batch', slug: 'target-droppers', category: 'Premium', description: 'Intensive 1-year droppers batch focusing exclusively on mastering concepts and problem-solving.', duration: '1 Year', feeStructure: '₹55,000/year' },
          { id: '3', title: 'Crash Course Series', slug: 'crash-course', category: 'Online', description: 'Fast-track revision and massive question banks suitable for the last 3 months of preparation.', duration: '3 Months', feeStructure: '₹12,000' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = activeCategory === 'All' ? courses : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-20 mt-16">

      {/* Header */}
      <div className="bg-slate-900 border-b border-white/10 text-white py-16 -mt-20 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Our Academic Programs
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Find the perfect path engineered for your success.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Error notice */}
        {error && (
          <div className="mb-6 text-center text-amber-600 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3">
            ⚠️ {error}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {loading
            ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-9 w-24 rounded-full" />)
            : categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))
          }
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80" />)}
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course) => (
              <StaggerItem key={course.id}>
                <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-t-xl overflow-hidden" />
                  <CardContent className="pt-6 flex-grow flex flex-col">
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${categoryColor[course.category] ?? 'text-slate-500'}`}>
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap justify-between items-center text-sm font-medium text-slate-900 dark:text-slate-100 pt-4 border-t border-slate-100 dark:border-slate-800 gap-2">
                      <div className="flex flex-col">
                        <span>Duration: {course.duration}</span>
                        {course.feeStructure && (
                          <span className="text-primary font-semibold text-xs mt-0.5">Fee: {course.feeStructure}</span>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <span className="text-primary hover:underline cursor-pointer">View Details &rarr;</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-slate-500 py-16">No courses found in this category.</p>
        )}

      </div>
    </div>
  );
}
