"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Button } from '../global/Button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
});

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax transforms
  const yText = useTransform(smoothProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Memoize the 3D component to prevent context-loss on re-renders
  const memoizedHero3D = React.useMemo(() => (
    <Hero3D scrollProgress={smoothProgress} />
  ), [smoothProgress]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* 3D Background with scroll progress */}
      {isMounted && (
        <motion.div style={{ opacity: opacityText }} className="absolute inset-0 z-0">
          {memoizedHero3D}
        </motion.div>
      )}

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-32">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-script text-3xl text-foreground/80 lowercase">the</span>
        </motion.div>
        
        {/* Kinetic Typography Heading */}
        <motion.h1 
          className="text-7xl md:text-9xl lg:text-[10rem] font-extrabold text-foreground tracking-tighter-editorial mb-12 leading-[0.9] flex flex-col items-center"
          style={{ y: yText, opacity: opacityText }}
        >
          <div className="overflow-hidden py-2 px-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="uppercase"
            >
              YP Gurukul
            </motion.div>
          </div>
          <div className="overflow-hidden py-2 px-4 mt-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-script text-5xl md:text-7xl text-foreground/80 tracking-normal lowercase">experience</span>
            </motion.div>
          </div>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          style={{ opacity: opacityText }}
          className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 lowercase font-medium tracking-tight"
        >
          premium coaching and foundational excellence reinvented for the modern scholar.
        </motion.p>
        
        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row justify-center gap-8 w-full"
          style={{ opacity: opacityText }}
        >
          <Link href="/courses">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all text-sm tracking-[0.2em] font-bold uppercase border-none group relative overflow-hidden">
              <span className="relative z-10">Explore Programs</span>
              <motion.div 
                className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 rounded-none text-foreground border-border hover:bg-accent transition-all text-sm tracking-[0.2em] font-bold uppercase overflow-hidden group">
              <span className="relative z-10">Schedule Visit</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: opacityText }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/30 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};
