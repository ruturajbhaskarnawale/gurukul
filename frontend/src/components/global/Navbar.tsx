"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { FaBars, FaTimes, FaSun, FaMoon, FaPhoneAlt } from 'react-icons/fa';
import { useAuth } from '@/lib/authContext';
import { Button } from './Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { user } = useAuth();

  // Next-themes hydration mismatch fix
  useEffect(() => setMounted(true), []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Classroom Courses', href: '/courses' },
    { label: 'About YP Gurukul', href: '/about' },
    { label: 'Career', href: '/career' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm md:text-base">YP</span>
              </div>
              <span className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Gurukul</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
            )}

            <a href="tel:+911234567890" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              <FaPhoneAlt size={14} className="mr-2 text-primary" />
              Call Us
            </a>
            
            <Link href={user ? '/portal/dashboard' : '/login'}>
              <Button size="sm">
                {user ? 'My Dashboard' : 'Student Portal'}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-500 dark:text-slate-400"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
              <a href="tel:+911234567890" className="flex items-center px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300">
                <FaPhoneAlt className="mr-3 text-primary" size={16} />
                +91 123 456 7890
              </a>
              <div className="mt-4 px-3">
                <Link href={user ? '/portal/dashboard' : '/login'} onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center">
                    {user ? 'My Dashboard' : 'Student Portal'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
