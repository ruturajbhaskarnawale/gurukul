"use client";

import React, { useEffect, useState, use } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
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

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await apiClient.get<CourseDetail[]>('/public/courses');
        const found = courses.find((c) => c.slug === slug);
        
        if (found) {
          setCourse(found);
        } else {
          setError('ARCHIVAL RECORD NOT FOUND');
        }
      } catch {
        setError('OFFLINE MODE — SHOWING ARCHIVAL DATA');
        setCourse({
          id: 'mock',
          title: slug.split('-').map(w => w.toUpperCase()).join(' '),
          slug: slug,
          category: 'Premium',
          description: 'This highly structured program is designed to deliver consistent, measurable progress. We combine rigorous testing, daily practice papers (DPPs), and one-on-one doubt clearing sessions to ensure no student is left behind. Our curriculum is engineered for maximum conceptual retention and application.',
          duration: '1 Year',
          feeStructure: '₹85,000 P.A.',
          subjects: JSON.stringify(["Physics Mechanics & Electromagnetism", "Organic & Physical Chemistry Mastery", "Advanced Calculus & Algebra", "Strategic Biology & Genetics"]),
          batchTimings: JSON.stringify({ "Morning": "8:00 AM - 12:00 PM", "Evening": "4:00 PM - 8:00 PM", "Weekend": "9:00 AM - 3:00 PM" })
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <span className="font-script text-4xl text-muted-foreground animate-pulse">retrieving syllabus...</span>
      </div>
    );
  }

  // Parse JSON fields safely
  let subjectsList: string[] = [];
  try { if (course?.subjects) subjectsList = JSON.parse(course.subjects); } catch (e) {}
  
  let timingsObj: Record<string, string> = {};
  try { if (course?.batchTimings) timingsObj = JSON.parse(course.batchTimings); } catch (e) {}

  return (
    <div className="bg-background min-h-screen pb-32">
      
      {/* Course Header — Editorial Style */}
      <section className="pt-48 pb-32 border-b border-border relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-12">
          <FadeIn>
            <div className="flex flex-col items-start leading-[0.85]">
              <Link href="/courses" className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground hover:text-foreground transition-colors mb-12 block">
                [ back to programs ]
              </Link>
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8 block">the program</span>
              <h1 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter-editorial text-foreground mb-12">
                {course?.title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i === 2 ? <br /> : null}
                    {word}{' '}
                  </React.Fragment>
                ))}
              </h1>
              <div className="grid md:grid-cols-3 gap-12 w-full pt-12 border-t border-border mt-12">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-30 mb-2">Category</span>
                   <span className="text-xl font-black text-foreground">{course?.category}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-30 mb-2">Duration</span>
                   <span className="text-xl font-black text-foreground">{course?.duration}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-30 mb-2">Investment</span>
                   <span className="text-xl font-black text-foreground">{course?.feeStructure || 'N/A'}</span>
                 </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Backdrop visual element */}
        <div className="absolute -bottom-24 -right-24 text-[25rem] font-black text-foreground opacity-[0.02] pointer-events-none select-none uppercase tracking-tighter">
          {slug.split('-')[0]}
        </div>
      </section>

      {/* Main Content — Bento Style */}
      <section className="py-32">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Overview & Subjects */}
            <div className="lg:col-span-8 space-y-32">
              <FadeIn>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-30 mb-12 block">Overview</span>
                  <p className="text-3xl md:text-4xl font-medium text-foreground opacity-80 leading-snug lowercase">
                    {course?.description}
                  </p>
                </div>
              </FadeIn>

              {subjectsList.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 mb-12 block">Curriculum Focus</span>
                  <StaggerContainer className="grid md:grid-cols-2 gap-4">
                    {subjectsList.map((item, i) => (
                      <StaggerItem key={i}>
                        <div className="p-8 border border-border bg-muted group hover:bg-muted/60 transition-colors duration-500">
                           <div className="flex justify-between items-center">
                              <span className="text-xl font-black text-foreground uppercase tracking-tighter">{item}</span>
                              <span className="text-[10px] font-bold text-muted-foreground opacity-10 uppercase">Focus_0{i+1}</span>
                           </div>
                           <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out mt-8" />
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}
            </div>

            {/* Sidebar — Schedule & CTA */}
            <div className="lg:col-span-4 lg:pl-12">
              <div className="sticky top-48 space-y-12">
                <FadeIn>
                   <div className="p-12 border border-border bg-muted relative overflow-hidden group">
                      <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-30 mb-8 block">Schedule</span>
                      
                      <div className="divide-y divide-border">
                        {Object.entries(timingsObj).map(([batch, time], i) => (
                          <div key={i} className="py-6 flex justify-between items-center group/item hover:pl-2 transition-all duration-500">
                             <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover/item:text-foreground transition-colors">{batch}</span>
                             <span className="text-xs font-bold text-foreground text-right">{time as string}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-12 mt-12 border-t border-border">
                        <Link href="/contact" className="block w-full">
                          <button className="w-full py-6 border border-border text-[10px] font-bold uppercase tracking-[0.5em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500">
                            Enquire Now
                          </button>
                        </Link>
                        <button className="w-full py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground hover:text-foreground transition-all mt-4">
                           Download Prospectus
                        </button>
                      </div>

                      <div className="absolute bottom-4 right-8 opacity-5 text-4xl font-black">YP_G</div>
                   </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                   <div className="p-12 border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] leading-relaxed">
                        limited enrollment capacity ensures personalized academic engineering for every candidate.
                      </p>
                   </div>
                </FadeIn>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
