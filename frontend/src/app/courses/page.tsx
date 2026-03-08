"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { CourseGlobe } from '@/components/courses/CourseGlobe';
import { useTheme } from 'next-themes';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  feeStructure: string | null;
  previewImage?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiClient.get<Course[]>('/public/courses');
        setCourses(data);
      } catch {
        setError('ARCHIVAL DATA MODE');
        setCourses([
          { id: '1', title: 'MHT-CET COMPLETE GUIDE', slug: 'mht-cet-guide', category: 'State Board', description: 'Comprehensive manual for MHT-CET preparation focusing on Physics, Chemistry, and Mathematics.', duration: '6 Months', feeStructure: '₹15,000', previewImage: '/images/gallery/tech_lab.png' },
          { id: '2', title: 'NDA MATHEMATICS INTENSIVE', slug: 'nda-math', category: 'Defense', description: 'Intensive coaching for NDA entrance with a focus on higher mathematics and logic.', duration: '1 Year', feeStructure: '₹25,000/YR', previewImage: '/images/gallery/smart_classroom.png' },
          { id: '3', title: 'BOARDS PREP ELITE', slug: 'boards-elite', category: 'Board Prep', description: 'Specialized batch for 10th and 12th board exams ensuring high percentage results.', duration: '1 Year', feeStructure: '₹20,000/YR', previewImage: '/images/gallery/library.png' },
          { id: '4', title: 'SCHOLARSHIP MASTERCLASS', slug: 'scholarship-master', category: 'Scholarship', description: 'Preparation for various competitive scholarship exams including NTSE and Olympiads.', duration: '4 Months', feeStructure: '₹8,000', previewImage: '/images/gallery/wall_of_fame.png' },
          { id: '5', title: 'NEET SUPER 30', slug: 'neet-super-30', category: 'Premium', description: 'Targeted medical entrance preparation with daily doubt sessions and AI analytics.', duration: '1 Year', feeStructure: '₹60,000/YR', previewImage: '/images/gallery/doubt_desk.png' },
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
    <div className="bg-background min-h-screen h-screen overflow-hidden flex flex-col transition-colors duration-500">
      
      {/* Minimal Floating Header */}
      <header className="fixed top-0 inset-x-0 pt-16 pb-8 z-40 flex flex-col items-center pointer-events-none">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter-editorial text-foreground leading-none">
            Gurukul <span className="opacity-20 italic">Universe</span>
          </h1>
        </FadeIn>
      </header>

      {/* Floating Filter Bar */}
      <nav className="fixed top-36 inset-x-0 z-40 pointer-events-none">
        <div className="max-w-fit mx-auto px-6 py-3 bg-muted/40 backdrop-blur-2xl border border-border rounded-full pointer-events-auto shadow-2xl">
          <div className="flex gap-10 items-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all relative py-1 ${
                  activeCategory === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute -bottom-1 left-1.2 right-1.2 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero 3D Section - Full Screen */}
      <main className="flex-1 w-full relative">
        <CourseGlobe 
          courses={filtered} 
          onSelect={(id) => {
            const course = courses.find(c => c.id === id);
            if (course) setSelectedCourse(course);
          }} 
        />
      </main>

      {/* Course Detail Pop-up Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all duration-300">
          <FadeIn className="max-w-4xl w-full">
            <div className="relative bg-background/60 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              >
                <div className="w-4 h-[2px] bg-white rotate-45 absolute" />
                <div className="w-4 h-[2px] bg-white -rotate-45 absolute" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                {selectedCourse.previewImage && (
                  <img 
                    src={selectedCourse.previewImage} 
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-4">
                  {selectedCourse.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter-editorial text-foreground mb-6 leading-none">
                  {selectedCourse.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-8 leading-relaxed font-medium opacity-80">
                  {selectedCourse.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Duration</span>
                    <span className="text-sm font-bold">{selectedCourse.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Fee Investment</span>
                    <span className="text-sm font-bold">{selectedCourse.feeStructure}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/courses/${selectedCourse.slug}`} className="flex-1">
                    <button className="w-full py-4 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      Explore Curriculum
                    </button>
                  </Link>
                  <button className="px-8 py-4 bg-foreground/5 border border-foreground/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-foreground/10 transition-all">
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      )}

    </div>
  );
}
