"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.5,
        ease: "power4.inOut",
        transformOrigin: "top",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-black pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />
      {children}
    </>
  );
};
