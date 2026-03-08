import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import Image from 'next/image';

export const FacultyPreview = () => {
  const faculty = [
    { name: "Dr. A. Verma", subject: "Physics", exp: "15+ Years Exp", image: "/images/faculty/verma.png" },
    { name: "Mr. R. Sharma", subject: "Mathematics", exp: "Ex-IIT Delhi", image: "/images/faculty/sharma.png" },
    { name: "Dr. S. Patil", subject: "Chemistry", exp: "Author & Mentor", image: "/images/faculty/patil.png" },
    { name: "Ms. K. Iyer", subject: "Biology", exp: "10+ Years Exp", image: "/images/faculty/iyer.png" },
  ];

  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="flex flex-col items-center mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
          <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
            Master <br /> <span className="text-foreground/20">Faculty</span>
          </h2>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, idx) => (
            <StaggerItem key={idx}>
              <div className="group flex flex-col items-start">
                <div className="h-[450px] bg-muted/20 w-full relative mb-8 border border-border overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-700">
                    <svg className="w-24 h-24 text-foreground/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] mb-4">
                  {member.subject}
                </span>
                <h3 className="text-3xl font-black text-foreground mb-2 uppercase tracking-tighter">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground lowercase tracking-wide">
                  {member.exp}
                </p>
                <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out mt-8" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
