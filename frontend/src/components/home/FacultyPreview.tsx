import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';

export const FacultyPreview = () => {
  const faculty = [
    { name: "Dr. A. Verma", subject: "Physics", exp: "15+ Years Exp", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
    { name: "Mr. R. Sharma", subject: "Mathematics", exp: "Ex-IIT Delhi", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
    { name: "Dr. S. Patil", subject: "Chemistry", exp: "Author & Mentor", bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400" },
    { name: "Ms. K. Iyer", subject: "Biology", exp: "10+ Years Exp", bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400" },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
              Learn from the Best
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our core strength lies in our exceptionally dedicated and highly experienced faculty members.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, idx) => (
            <StaggerItem key={idx}>
              <Card className="text-center hover:-translate-y-2 transition-transform duration-300 overflow-hidden group">
                {/* Photo Placeholder */}
                <div className="h-48 bg-slate-300 dark:bg-slate-800 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-400 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <CardContent className="pt-6 pb-8">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${member.bg} ${member.text}`}>
                    {member.subject}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {member.exp}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
