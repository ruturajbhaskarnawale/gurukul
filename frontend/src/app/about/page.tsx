import React from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
              Empowering Minds, <br/>
              <span className="text-primary">Shaping Futures.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              At YP Gurukul, we believe that every student has the potential to achieve greatness given the right guidance and environment. Founded with the vision of providing top-tier educational support, we have grown into a premier institution dedicated to academic excellence.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our methodology moves beyond rote memorization. We focus on conceptual clarity, rigorous practice, and personalized mentorship to equip our students not just for exams, but for life.
            </p>
          </FadeIn>
          
          <SlideUp delay={0.2} className="relative">
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-lg font-medium">
                [Campus/Students Image]
              </div>
            </div>
            
            {/* Stat Floating Box */}
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block">
              <span className="text-4xl font-bold text-accent-dark block mb-1">15+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase">Years of Excellence</span>
            </div>
          </SlideUp>
        </div>

        {/* Founder's Message Section */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 mb-32 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-48 h-48 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-950 flex items-center justify-center text-slate-400">
                [Founder Photo]
              </div>
              <div>
                <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                  "Education is not the learning of facts, but the training of the mind to think. At YP Gurukul, our sole mission is to ignite that spark of curiosity and guide our students through the rigorous journey of competitive exams with uncompromising quality and unwavering support."
                </p>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Mr. Yash Prakash</h4>
                  <p className="text-primary font-medium">Founder & Managing Director</p>
                </div>
              </div>
           </div>
        </div>

        {/* Achievements / Milestones */}
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Our Legacy in Numbers</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A track record that speaks for itself. Consistent results year after year.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
           {[
             { num: "500+", label: "JEE Advanced Selections" },
             { num: "850+", label: "NEET Top Doctors" },
             { num: "50+", label: "Cities Reached" },
             { num: "Top 10", label: "State Ranks Consistently" }
           ].map((stat, i) => (
             <StaggerItem key={i}>
                <div className="bg-white dark:bg-slate-950 p-6 text-center rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                   <div className="text-3xl font-black text-accent mb-2">{stat.num}</div>
                   <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
             </StaggerItem>
           ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
