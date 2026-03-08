import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';
import { Button } from '../global/Button';
import Link from 'next/link';

export const TestSeriesPreview = () => {
  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="flex flex-col items-center mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
            Assessed <br /> <span className="text-foreground/20">Excellence</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            { tag: "NEET", title: "Minor Test 04 - Physics", date: "Coming Sunday", topics: "Kinematics, Laws of Motion" },
            { tag: "JEE Main", title: "Major Revision Test", date: "Next Month", topics: "Full 11th Syllabus" },
            { tag: "Board", title: "Term 1 Mock Exam", date: "Next Friday", topics: "Chemistry, Biology" },
          ].map((test, index) => (
            <StaggerItem key={index}>
              <div className="border border-border p-12 group hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-start h-full">
                <div className="flex justify-between w-full mb-12">
                  <span className="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary uppercase tracking-[0.2em]">
                    {test.tag}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">
                    {test.date}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight leading-tight text-foreground">
                  {test.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-12 lowercase leading-relaxed">
                  focusing on {test.topics}
                </p>
                <div className="mt-auto flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">
                  <span>Enroll Now</span>
                  <div className="w-8 h-px bg-current" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
