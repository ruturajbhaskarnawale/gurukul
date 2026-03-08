"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'COURSES', href: '/courses' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CAREER', href: '/career' },
  ];

  const isDashboard = pathname?.startsWith('/portal') || pathname?.startsWith('/admin');

  if (isDashboard) return null;

  return (
    <>
      {/* Corner Navigation - Logo (Top Left) */}
      <div className="fixed top-12 left-12 z-[100] transition-colors duration-300">
        <Link href="/" className="group flex flex-col items-start leading-none">
          <span className="text-3xl font-black uppercase tracking-tighter-editorial text-foreground">YP Gurukul</span>
          <span className="font-script text-muted-foreground text-sm mt-1">institute</span>
        </Link>
      </div>

      {/* Corner Navigation - Portal/Access/Admin (Top Right) */}
      <div className="fixed top-12 right-12 z-[100] hidden md:flex items-center gap-6">
        <ThemeToggle />
        {user?.role === 'ADMIN' && (
          <Link 
            href="/admin" 
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all"
          >
            ADMIN VIEW
          </Link>
        )}
        <Link 
          href={user ? '/portal/dashboard' : '/login'} 
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all"
        >
          {user ? 'PORTAL' : 'ACCESS'}
        </Link>
      </div>

      {/* Corner Navigation - Menu Trigger (Bottom Right) */}
      <div className="fixed bottom-12 right-12 z-[100]">
        <button 
          onClick={toggleMenu}
          className="w-16 h-16 rounded-full border border-border flex items-center justify-center text-foreground hover:scale-110 transition-transform bg-background/50 backdrop-blur-md shadow-lg"
        >
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group overflow-hidden"
            >
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter-editorial text-foreground/20 group-hover:text-foreground transition-colors duration-500 hover:scale-105 transform">
                {link.label}
              </h2>
            </Link>
          ))}
          <div className="pt-24 flex flex-col items-center gap-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">Contact US</span>
             <p className="text-2xl font-black text-foreground">+91 123 456 7890</p>
          </div>
        </div>
      </div>
    </>
  );
};
