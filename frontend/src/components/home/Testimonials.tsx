import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';

export const Testimonials = () => {
  const testimonials = [
    { quote: "YP Gurukul transformed my average scores into top percentiles. The teachers are incredibly supportive and available 24/7 for doubts.", name: "Rajat K.", detail: "Batch 2024" },
    { quote: "The study material is perfectly aligned with the latest exam pattern. I didn't need any extra reference books outside of the modules.", name: "Priya S.", detail: "Batch 2023" },
    { quote: "Weekly mock tests and the detailed analytics provided on the student portal helped me identify my weak areas clearly. Highly recommended!", name: "Anil D.", detail: "Batch 2024" },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <FadeIn>
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900 dark:text-white">
              Student Words
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Don't just take our word for it. Hear what our successful students say.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <Card className="h-full relative hover:shadow-lg transition-shadow bg-slate-50 dark:bg-slate-950/50 border-none">
                <CardContent className="p-8">
                  {/* Quote icon watermark */}
                  <div className="absolute top-4 right-4 text-primary opacity-10 font-serif text-8xl leading-none">
                    "
                  </div>
                  <div className="flex text-amber-400 text-sm mb-4 gap-0.5">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic relative z-10 mb-8 flex-grow">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
