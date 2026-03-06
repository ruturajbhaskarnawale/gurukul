import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';
import { Button } from '../global/Button';
import Link from 'next/link';

export const SuccessStories = () => {
  const stories = [
    { rank: "AIR 12", name: "Kavya Menon", exam: "NEET 2023", quote: "YP Gurukul's consistent mentorship was the key to my success." },
    { rank: "AIR 45", name: "Rahul Das", exam: "JEE Adv 2023", quote: "The doubt clearing sessions cleared my core concepts perfectly." },
    { rank: "State Topper", name: "Aisha Khan", exam: "Class 12 Boards", quote: "I owe my 98.6% to the rigorous test series." },
    { rank: "AIR 89", name: "Vikram S.", exam: "NEET 2024", quote: "The study material is unmatched in quality." },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
              Wall of Fame
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Transforming potential into excellence. Meet the stars who made us proud.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="shrink-0 hidden md:block">
            <Link href="/about">
              <Button variant="outline">View All Results</Button>
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, i) => (
            <StaggerItem key={i}>
              <Card className="text-center hover:border-accent/50 transition-colors h-full flex flex-col group overflow-hidden">
                <div className="bg-slate-200 dark:bg-slate-800 h-40 w-full relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                     [Student Photo]
                   </div>
                </div>
                <CardContent className="pt-6 pb-6 flex flex-col flex-grow">
                  <span className="text-accent dark:text-accent-dark font-extrabold text-2xl mb-1 tracking-tight">
                    {story.rank}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wider inline-block mx-auto mb-3">
                    {story.exam}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {story.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 italic flex-grow">
                    "{story.quote}"
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center md:hidden">
            <Link href="/about">
              <Button variant="outline" className="w-full">View All Results</Button>
            </Link>
        </div>

      </div>
    </section>
  );
};
