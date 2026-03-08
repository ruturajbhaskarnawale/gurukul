import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import Image from 'next/image';

export const GalleryPreview = () => {
  const galleryItems = [
    { label: "Library Room", src: "/images/gallery/library.png" },
    { label: "Doubt Desk", src: "/images/gallery/doubt_desk.png" },
    { label: "Wall of Fame", src: "/images/gallery/wall_of_fame.png" },
    { label: "Tech Lab", src: "/images/gallery/tech_lab.png" }
  ];

  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="max-w-[1800px] mx-auto px-12">
        
        <div className="flex flex-col items-end mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-right leading-[0.85]">
            Visual <br /> <span className="text-foreground/20">Narrative</span>
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Main Large Image */}
          <StaggerItem className="col-span-2 row-span-2">
            <div className="w-full h-full min-h-[500px] bg-muted/20 overflow-hidden relative group border border-border">
              <Image 
                src="/images/gallery/smart_classroom.png" 
                alt="Smart Classroom" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 blur-sm group-hover:blur-none"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground group-hover:opacity-0 transition-opacity duration-700">
                <span className="text-sm font-bold uppercase tracking-[0.3em] drop-shadow-lg">Smart Classroom</span>
              </div>
            </div>
          </StaggerItem>

          {/* Grid Images */}
          {galleryItems.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="w-full h-60 bg-muted/20 overflow-hidden relative group border border-border">
                <Image 
                  src={item.src} 
                  alt={item.label} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-background/60 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/40 group-hover:opacity-0 transition-opacity duration-700">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-24 text-center">
            <FadeIn delay={0.4}>
              <button className="px-12 py-4 border border-border text-foreground hover:bg-foreground hover:text-background transition-all text-xs font-bold uppercase tracking-[0.3em]">
                View Full Gallery
              </button>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};
