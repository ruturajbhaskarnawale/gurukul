"use client";

import React, { useState } from 'react';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { apiClient, ApiError } from '@/lib/apiClient';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiClient.post('/public/inquiries', { name, email, mobile, message });
      setSuccessMsg('Your message has been sent! Our team will reach out to you shortly.');
      setName(''); setEmail(''); setMobile(''); setMessage('');
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to send message. Please try again or call us directly.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have questions about our courses or admission process? Our team is here to help you.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-12">

          <SlideUp className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    {/* Placeholder for real address */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                      123 Education Lane<br />Knowledge City, IN 400001
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    {/* Placeholder for real phone array */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                      +91 123 456 7890<br />Mon–Sat, 9AM to 7PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    {/* Placeholder for real emails */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                      contact@ypgurukul.com<br />admissions@ypgurukul.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Embed Placeholder - Note: client needs to replace with actual embed link */}
            <Card className="overflow-hidden">
               <div className="w-full h-48 bg-slate-200 dark:bg-slate-800">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8329615599024!2d72.88094977457787!3d19.07062228148902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c897f223fbad%3A0xe5db976d8dfced9d!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1709405400000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </Card>
          </SlideUp>

          <SlideUp delay={0.2} className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

                {successMsg && (
                  <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm rounded-md px-4 py-3">
                    ✅ {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Your Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input label="Email Address" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={mobile} onChange={(e) => setMobile(e.target.value)} />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y dark:border-gray-700 dark:placeholder:text-gray-500"
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={submitting}>
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </SlideUp>

        </div>
      </div>
    </div>
  );
}
