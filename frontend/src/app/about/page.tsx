"use client";

import React from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { num: "500+", label: "JEE SELECTIONS" },
    { num: "850+", label: "NEET QUALIFIERS" },
    { num: "15+", label: "YEARS HERITAGE" },
    { num: "01", label: "MISSION: EXCELLENCE" }
  ];

  const leadership = [
    { name: "YASH PRAKASH", role: "FOUNDER & MD", bio: "visionary educator with a decade of engineering success stories." },
    { name: "DR. A. VERMA", role: "ACADEMIC DIRECTOR", bio: "pioneer in physics pedagogy and student mentoring strategies." },
    { name: "R. SHARMA", role: "STRATEGY HEAD", bio: "ex-iit delhi scholar focusing on conceptual optimization." }
  ];

  return (
    <div className="bg-background min-h-screen pb-32">
      
      {/* Editorial Header */}
      <section className="pt-48 pb-32 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="flex flex-col items-start leading-[0.85]">
            <FadeIn>
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8 block">the</span>
              <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-foreground">
                Heritage <br /> <span className="text-foreground/20">& Vision</span>
              </h1>
              <p className="text-xl text-muted-foreground lowercase mt-12 max-w-xl leading-relaxed">
                a decade of academic precision. we don't just teach—we engineer the future of elite education through uncompromising standards.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Narrative Section - Bento Story Tiles */}
      <section className="py-32 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="grid md:grid-cols-2 gap-24 items-center">
             <FadeIn>
               <div className="space-y-12">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30 block">Our Philosophy</span>
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                   Igniting <br /> <span className="text-foreground/20">The Spark</span>
                 </h2>
                 <p className="text-xl text-muted-foreground lowercase leading-relaxed max-w-md">
                   at yp gurukul, education is treated as an art of refinement. we strip away the noise of rote learning to reveal the core of conceptual mastery.
                 </p>
                 <div className="h-px w-24 bg-border" />
               </div>
             </FadeIn>

             <div className="grid grid-cols-2 gap-4">
                <SlideUp className="aspect-[3/4] bg-muted/50 border border-border flex items-center justify-center p-8 group overflow-hidden">
                   <div className="text-center group-hover:scale-110 transition-transform duration-700">
                      <span className="text-6xl font-black text-foreground/10 mb-4 block">01</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Precision</span>
                   </div>
                </SlideUp>
                <SlideUp delay={0.1} className="aspect-[3/4] bg-muted/70 border border-border flex items-center justify-center p-8 mt-12 group overflow-hidden">
                   <div className="text-center group-hover:scale-110 transition-transform duration-700">
                      <span className="text-6xl font-black text-foreground/10 mb-4 block">02</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Integrity</span>
                   </div>
                </SlideUp>
             </div>
          </div>
        </div>
      </section>

      {/* Founder's Message - Full Width Break */}
      <section className="py-48 bg-muted/10 border-b border-border relative overflow-hidden">
         <div className="max-w-[1200px] mx-auto px-12 text-center relative z-10">
            <FadeIn>
               <span className="font-script text-4xl text-foreground/20 lowercase mb-12 block">from the founder</span>
               <blockquote className="text-4xl md:text-6xl font-medium text-foreground leading-tight tracking-tight lowercase">
                 "education is not the learning of facts, but the training of the mind to think. we engineer the environment where elite minds are forged."
               </blockquote>
               <div className="mt-16 flex flex-col items-center">
                  <div className="w-12 h-px bg-foreground/30 mb-8" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground">Yash Prakash</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground mt-2">Managing Director</span>
               </div>
            </FadeIn>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-foreground/[0.01] pointer-events-none select-none uppercase tracking-tighter">
           Vision
         </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-32 border-b border-border">
         <div className="max-w-[1800px] mx-auto px-12">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-24 text-center">
               {stats.map((stat, i) => (
                 <StaggerItem key={i}>
                    <div className="flex flex-col items-center group">
                       <span className="text-6xl md:text-8xl font-black text-foreground tracking-tighter-editorial mb-4 group-hover:scale-110 transition-transform duration-500">{stat.num}</span>
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                       <div className="h-px w-0 bg-foreground group-hover:w-12 transition-all duration-500 mt-6" />
                    </div>
                 </StaggerItem>
               ))}
            </StaggerContainer>
         </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-48">
         <div className="max-w-[1800px] mx-auto px-12">
            <div className="flex flex-col items-start mb-32">
               <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
               <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter-editorial text-foreground leading-[0.85]">
                 Elite <br /> <span className="text-foreground/20">Leadership</span>
               </h2>
            </div>
 
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
               {leadership.map((person, i) => (
                 <StaggerItem key={i}>
                    <div className="group border border-border bg-card p-12 hover:bg-muted transition-all duration-700 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 text-foreground/5 font-black text-5xl">0{i+1}</div>
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-12 block group-hover:text-foreground transition-colors">{person.role}</span>
                       <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-6 leading-none">{person.name}</h3>
                       <p className="text-sm font-medium text-muted-foreground lowercase leading-relaxed tracking-wide group-hover:text-foreground/60 transition-colors">
                         {person.bio}
                       </p>
                       <div className="h-px w-0 bg-foreground group-hover:w-full transition-all duration-700 ease-in-out mt-12" />
                    </div>
                 </StaggerItem>
               ))}
            </StaggerContainer>
         </div>
      </section>

    </div>
  );
}
