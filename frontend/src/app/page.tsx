import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickInquiry } from '@/components/home/QuickInquiry';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import Image from 'next/image';

// Redesigned Components
import { TestSeriesPreview } from '@/components/home/TestSeriesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FacultyPreview } from '@/components/home/FacultyPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { SuccessStories } from '@/components/home/SuccessStories';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { LearningJourney3DWrapper } from '@/components/home/LearningJourney3DWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HeroSection />
      
      {/* 3D Interactive Scroll Sequence */}
      <LearningJourney3DWrapper />

      {/* Stats Section */}
      <section className="py-24 bg-background border-b border-border relative z-20">
        <div className="max-w-[1800px] mx-auto px-12">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-6xl md:text-8xl font-black tracking-tighter-editorial text-foreground mb-4">10K+</span>
                 <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">Students Taught</span>
               </div>
            </StaggerItem>
            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-6xl md:text-8xl font-black tracking-tighter-editorial text-foreground mb-4">95%</span>
                 <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">Selection Rate</span>
               </div>
            </StaggerItem>
            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-6xl md:text-8xl font-black tracking-tighter-editorial text-foreground mb-4">50+</span>
                 <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">Expert Faculty</span>
               </div>
            </StaggerItem>
            <StaggerItem>
               <div className="flex flex-col items-center">
                 <span className="text-6xl md:text-8xl font-black tracking-tighter-editorial text-foreground mb-4">24/7</span>
                 <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">Resource Access</span>
               </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 1. Test Series Preview */}
      <TestSeriesPreview />

      {/* Popular Programs / Featured Courses */}
      <section className="py-32 bg-background border-b border-border">
        <div className="max-w-[1800px] mx-auto px-12">
           <FadeIn>
             <div className="flex flex-col items-center mb-32">
               <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
               <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
                 Popular <br /> <span className="text-foreground/20">Programs</span>
               </h2>
             </div>
           </FadeIn>

           <StaggerContainer className="grid md:grid-cols-3 gap-8">
             <StaggerItem>
               <div className="group flex flex-col items-start cursor-pointer">
                 <div className="h-[500px] bg-muted/20 w-full relative mb-12 border border-border overflow-hidden">
                   <Image 
                     src="/images/programs/foundation.png" 
                     alt="Class 11 Science Batches" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700 blur-sm group-hover:blur-none"
                   />
                   <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-700 font-black uppercase tracking-widest text-xs">
                     Course Image
                   </div>
                 </div>
                 <span className="text-[10px] font-bold px-3 py-1 bg-primary text-primary-foreground uppercase tracking-[0.2em] mb-4">Foundation</span>
                 <h3 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter">Class 11 Science Batches</h3>
                 <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide max-w-sm mb-8">Comprehensive 2-year classroom program building strong foundation.</p>
                 <div className="h-px w-12 bg-border group-hover:w-full transition-all duration-500" />
               </div>
             </StaggerItem>
             <StaggerItem>
               <div className="group flex flex-col items-start cursor-pointer">
                 <div className="h-[500px] bg-muted/20 w-full relative mb-12 border border-border overflow-hidden">
                   <Image 
                     src="/images/programs/target.png" 
                     alt="Target Batch" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700 blur-sm group-hover:blur-none"
                   />
                   <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-700 font-black uppercase tracking-widest text-xs">
                     Course Image
                   </div>
                 </div>
                 <span className="text-[10px] font-bold px-3 py-1 bg-primary text-primary-foreground uppercase tracking-[0.2em] mb-4">Premium</span>
                 <h3 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter">Target Batch</h3>
                 <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide max-w-sm mb-8">Intensive 1-year droppers batch focusing on problem-solving.</p>
                 <div className="h-px w-12 bg-border group-hover:w-full transition-all duration-500" />
               </div>
             </StaggerItem>
             <StaggerItem>
               <div className="group flex flex-col items-start cursor-pointer">
                 <div className="h-[500px] bg-muted/20 w-full relative mb-12 border border-border overflow-hidden">
                   <Image 
                     src="/images/programs/test_series.png" 
                     alt="Weekend Test Series" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700 blur-sm group-hover:blur-none"
                   />
                   <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-700 font-black uppercase tracking-widest text-xs">
                     Course Image
                   </div>
                 </div>
                 <span className="text-[10px] font-bold px-3 py-1 bg-primary text-primary-foreground uppercase tracking-[0.2em] mb-4">Specialized</span>
                 <h3 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter">Weekend Test Series</h3>
                 <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide max-w-sm mb-8">All-India test series with detailed performance analytics.</p>
                 <div className="h-px w-12 bg-border group-hover:w-full transition-all duration-500" />
               </div>
             </StaggerItem>
           </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <div className="w-full h-px bg-border" />
      <WhyChooseUs />

      {/* Star Faculty */}
      <div className="w-full h-px bg-border" />
      <FacultyPreview />

      {/* Success Stories (Wall of Fame) */}
      <div className="w-full h-px bg-border" />
      <SuccessStories />

      {/* Student Testimonials */}
      <div className="w-full h-px bg-border" />
      <Testimonials />

      {/* Gallery Preview */}
      <div className="w-full h-px bg-border" />
      <GalleryPreview />

      {/* Quick Inquiry */}
      <div className="w-full h-px bg-border" />
      <QuickInquiry />
    </div>
  );
}
