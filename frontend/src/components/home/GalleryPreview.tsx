import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Button } from '../global/Button';

export const GalleryPreview = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <FadeIn>
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
              Life at Gurukul
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              State-of-the-art classrooms, libraries, and a vibrant competitive environment.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Main Large Image */}
          <StaggerItem className="col-span-2 row-span-2">
            <div className="w-full h-full min-h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-700">
                <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Smart Classroom (Main)</span>
              </div>
            </div>
          </StaggerItem>

          {/* Grid Images */}
          {[
            "Library Reading Room", "Doubt Clearing Setup", "Annual Prize Distribution", "Computer Lab"
          ].map((label, idx) => (
            <StaggerItem key={idx}>
              <div className="w-full h-40 md:h-48 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-700">
                  <span className="text-xs font-medium text-center px-2">{label}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
            <FadeIn delay={0.4}>
              <Button variant="outline">View Full Gallery</Button>
            </FadeIn>
        </div>

      </div>
    </section>
  );
};
