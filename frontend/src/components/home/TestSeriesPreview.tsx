import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';
import { Button } from '../global/Button';
import Link from 'next/link';

export const TestSeriesPreview = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
              All-India Test Series
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Benchmark your preparation against the best minds in the country. Detailed analytics and instant AIR (All India Rank) prediction.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="shrink-0">
            <Link href="/courses">
              <Button variant="outline" className="hidden md:inline-flex">View Test Schedule</Button>
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { tag: "NEET", title: "Minor Test 04 - Physics", date: "Coming Sunday", topics: "Kinematics, Laws of Motion" },
            { tag: "JEE Main", title: "Major Revision Test", date: "Next Month", topics: "Full 11th Syllabus" },
            { tag: "Board", title: "Term 1 Mock Exam", date: "Next Friday", topics: "Chemistry, Biology" },
          ].map((test, index) => (
            <StaggerItem key={index}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary uppercase tracking-wider">
                      {test.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {test.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                    {test.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                    <strong>Topics:</strong> {test.topics}
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-auto">Enroll Now</Button>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-10 text-center md:hidden">
            <Link href="/courses">
              <Button variant="outline" className="w-full">View Test Schedule</Button>
            </Link>
        </div>

      </div>
    </section>
  );
};
