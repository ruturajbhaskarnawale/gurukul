import React from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Button } from '../global/Button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-[120px] rounded-full w-[600px] h-[600px] bg-primary/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <StaggerContainer>
          <StaggerItem>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
              Unlock Your Potential
            </span>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
              Shape Your Future with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
                YP Gurukul
              </span>
            </h1>
          </StaggerItem>
          
          <StaggerItem>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Premium classroom coaching and foundation courses designed to build strong fundamentals and ensure competitive success.
            </p>
          </StaggerItem>
          
          <StaggerItem>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-slate-700 hover:bg-slate-800">
                  Book a Campus Visit
                </Button>
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
