"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Button } from '@/components/global/Button';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  subjects: string | null;     // JSON string
  batchTimings: string | null; // JSON string
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch all and find by slug, or backend should support GET /courses/:slug
        const courses = await apiClient.get<CourseDetail[]>('/public/courses');
        const found = courses.find((c) => c.slug === params.slug);
        
        if (found) {
          setCourse(found);
        } else {
          setError('Course not found.');
        }
      } catch {
        setError('Failed to load course details. The server might be offline.');
        // Fallback mock data
        setCourse({
          id: 'mock',
          title: params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug: params.slug,
          category: 'Premium',
          description: 'This highly structured program is designed to deliver consistent, measurable progress. We combine rigorous testing, daily practice papers (DPPs), and one-on-one doubt clearing sessions to ensure no student is left behind.',
          duration: '1 Year',
          feeStructure: '₹85,000 p.a.',
          subjects: JSON.stringify(["Physics Mechanics & Electromagnetism", "Organic & Physical Chemistry Mastery", "Advanced Calculus & Algebra"]),
          batchTimings: JSON.stringify({ "Morning": "8:00 AM - 12:00 PM", "Evening": "4:00 PM - 8:00 PM" })
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-32 text-center text-slate-500">
        Loading syllabus and course details...
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-32 text-center text-amber-500">
        <p className="mb-4">⚠️ {error}</p>
        <Link href="/courses">
           <Button variant="outline">Back to All Courses</Button>
        </Link>
      </div>
    );
  }

  // Parse JSON fields safely
  let subjectsList: string[] = [];
  try { if (course?.subjects) subjectsList = JSON.parse(course.subjects); } catch (e) {}
  
  let timingsObj: Record<string, string> = {};
  try { if (course?.batchTimings) timingsObj = JSON.parse(course.batchTimings); } catch (e) {}

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 mt-16">
      
      {/* Course Hero Header */}
      <div className="bg-slate-900 text-white py-20 -mt-20 pt-36 relative overflow-hidden">
         <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-[100px] rounded-full w-[400px] h-[400px] bg-primary/20 pointer-events-none" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
           <FadeIn>
             <Link href="/courses" className="text-primary hover:text-white transition-colors text-sm font-semibold mb-6 inline-block">
                &larr; Back to Programs
             </Link>
             <br/>
             <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent uppercase bg-accent/20 rounded-full">
               {course?.category} Program
             </span>
             <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
               {course?.title}
             </h1>
             <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
               {course?.description?.slice(0, 150)}...
             </p>
             <div className="flex flex-wrap gap-6 items-center text-sm font-medium justify-center md:justify-start">
               <span className="flex items-center text-slate-300"><strong className="text-white mr-2">Duration:</strong> {course?.duration}</span>
               {course?.feeStructure && (
                 <span className="flex items-center text-slate-300"><strong className="text-white mr-2">Fee:</strong> {course.feeStructure}</span>
               )}
             </div>
           </FadeIn>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            <SlideUp>
              <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                <p>{course?.description}</p>
              </div>
            </SlideUp>

            {subjectsList.length > 0 && (
              <SlideUp delay={0.1}>
                <h2 className="text-2xl font-bold mb-4">Core Subjects Covered</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                   {subjectsList.map((item, i) => (
                     <div key={i} className="flex items-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                       <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                     </div>
                   ))}
                </div>
              </SlideUp>
            )}

            {Object.keys(timingsObj).length > 0 && (
              <SlideUp delay={0.2}>
                <h2 className="text-2xl font-bold mb-4">Available Batch Timings</h2>
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                   <table className="w-full text-left">
                     <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                        <tr>
                          <th className="px-6 py-4 font-bold text-slate-900 dark:text-white">Batch Type</th>
                          <th className="px-6 py-4 font-bold text-slate-900 dark:text-white">Schedule</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {Object.entries(timingsObj).map(([batchName, time], i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{batchName}</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{time as string}</td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              </SlideUp>
            )}

          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <SlideUp delay={0.3} className="sticky top-24">
              <Card className="border-primary/20 shadow-xl overflow-hidden">
                <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
                   <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Admissions Open</p>
                   <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Enroll Today</p>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                       <span className="text-slate-500">Next Batch Starts</span>
                       <span className="font-semibold dark:text-white">Upcoming Monday</span>
                     </div>
                     <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                       <span className="text-slate-500">Available Seats</span>
                       <span className="font-semibold text-accent-dark">Limited</span>
                     </div>
                  </div>

                  <Link href="/contact" className="block w-full mb-3">
                    <Button size="lg" className="w-full">Enquire Now</Button>
                  </Link>
                  <Button variant="outline" className="w-full text-slate-600">Download Syllabus PDF</Button>
                  
                  <p className="text-xs text-center text-slate-400 mt-6">
                    Join thousands of successful students who trusted YP Gurukul for their career goals.
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
          </div>

        </div>
      </div>
    </div>
  );
}
