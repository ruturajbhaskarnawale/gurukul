"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../global/Button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
});

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* 3D Background */}
      <Hero3D />

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
          <span className="font-script text-3xl text-foreground/40 lowercase">the</span>
        </motion.div>
        
        {/* Kinetic Typography Heading */}
        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-extrabold text-foreground tracking-tighter-editorial mb-12 leading-[0.9] flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden uppercase"
          >
            YP Gurukul
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-4"
          >
            <span className="font-script text-5xl md:text-7xl text-foreground/50 tracking-normal lowercase">experience</span>
          </motion.div>
        </h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
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
        >
          <Link href="/courses">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all text-sm tracking-[0.2em] font-bold uppercase border-none">
              Explore Programs
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 rounded-none text-foreground border-border hover:bg-accent transition-all text-sm tracking-[0.2em] font-bold uppercase">
              Schedule Visit
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
