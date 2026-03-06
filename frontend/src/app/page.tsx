import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickInquiry } from '@/components/home/QuickInquiry';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';

// New Components from Phase 3
import { TestSeriesPreview } from '@/components/home/TestSeriesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FacultyPreview } from '@/components/home/FacultyPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { SuccessStories } from '@/components/home/SuccessStories';
import { GalleryPreview } from '@/components/home/GalleryPreview';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold tracking-tighter text-primary mb-2">10k+</span>
                 <span className="text-sm font-medium text-slate-500 uppercase">Students Taught</span>
               </div>
            </StaggerItem>

            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold tracking-tighter text-primary mb-2">95%</span>
                 <span className="text-sm font-medium text-slate-500 uppercase">Selection Rate</span>
               </div>
            </StaggerItem>

            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold tracking-tighter text-primary mb-2">50+</span>
                 <span className="text-sm font-medium text-slate-500 uppercase">Expert Faculty</span>
               </div>
            </StaggerItem>

            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-bold tracking-tighter text-primary mb-2">24/7</span>
                 <span className="text-sm font-medium text-slate-500 uppercase">Portal Access</span>
               </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* 1. Test Series Preview */}
      <TestSeriesPreview />

      {/* Popular Programs / Featured Courses (Original) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeIn>
             <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">Popular Programs</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                 Discover our highly-rated classroom and online foundational courses tailored for competitive success.
               </p>
             </div>
           </FadeIn>

           <StaggerContainer className="grid md:grid-cols-3 gap-8">
             <StaggerItem>
               <Card className="h-full hover:-translate-y-1 transition-transform duration-300">
                 <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-t-xl overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400">[Course Image]</div>
                 </div>
                 <CardContent className="pt-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">Foundation</span>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Class 11 Science Batches</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Comprehensive 2-year classroom program building strong foundation.</p>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-900 dark:text-slate-100">
                      <span>2 Years</span>
                    </div>
                 </CardContent>
               </Card>
             </StaggerItem>

             <StaggerItem>
               <Card className="h-full hover:-translate-y-1 transition-transform duration-300">
                 <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-t-xl overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400">[Course Image]</div>
                 </div>
                 <CardContent className="pt-6">
                    <span className="text-xs font-semibold text-accent-dark uppercase tracking-wider mb-2 block">Premium</span>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Target Batch</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Intensive 1-year droppers batch focusing on problem-solving.</p>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-900 dark:text-slate-100">
                      <span>1 Year</span>
                    </div>
                 </CardContent>
               </Card>
             </StaggerItem>

             <StaggerItem>
               <Card className="h-full hover:-translate-y-1 transition-transform duration-300">
                 <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-t-xl overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400">[Course Image]</div>
                 </div>
                 <CardContent className="pt-6">
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 block">Online</span>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Weekend Test Series</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">All-India test series with detailed performance analytics.</p>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-900 dark:text-slate-100">
                      <span>6 Months</span>
                    </div>
                 </CardContent>
               </Card>
             </StaggerItem>
           </StaggerContainer>
        </div>
      </section>

      {/* 2. Why Choose Us */}
      <WhyChooseUs />

      {/* 3. Star Faculty */}
      <FacultyPreview />

      {/* 4. Success Stories (Wall of Fame) */}
      <SuccessStories />

      {/* 5. Student Testimonials */}
      <Testimonials />

      {/* 6. Gallery Preview */}
      <GalleryPreview />

      {/* 7. Quick Inquiry (Original) */}
      <QuickInquiry />
    </div>
  );
}

