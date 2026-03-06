"use client";

import React from 'react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <StaggerItem>
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-primary">YP Gurukul</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premium coaching institute dedicated to transforming students into top achievers through expert guidance, innovative teaching, and comprehensive study materials.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <FaYoutube size={18} />
              </a>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Our Courses
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Career / Hiring
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Student Portal Login
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Popular Courses */}
          <StaggerItem>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Popular Programs
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses/class-11-science" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Class 11th Science
                </Link>
              </li>
              <li>
                <Link href="/courses/class-12-science" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Class 12th Science
                </Link>
              </li>
              <li>
                <Link href="/courses/target-droppers" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Droppers Batch
                </Link>
              </li>
              <li>
                <Link href="/courses/crash-course" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center">
                  <span className="mr-2">&rsaquo;</span> Crash Course Series
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-primary hover:text-white transition-colors text-sm font-medium mt-2 block">
                  View All &rarr;
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Contact Info */}
          <StaggerItem>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={16} />
                <span className="ml-3 text-slate-400 text-sm leading-relaxed">
                  123 Education Lane, Knowledge City, IN 400001
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary flex-shrink-0" size={16} />
                <a href="tel:+911234567890" className="ml-3 text-slate-400 hover:text-white transition-colors text-sm">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary flex-shrink-0" size={16} />
                <a href="mailto:contact@ypgurukul.com" className="ml-3 text-slate-400 hover:text-white transition-colors text-sm">
                  contact@ypgurukul.com
                </a>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Copyright Bar */}
        <FadeIn delay={0.4}>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center px-4">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} YP Gurukul. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
