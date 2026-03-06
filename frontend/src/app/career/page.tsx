"use client";

import React, { useState } from 'react';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { apiClient } from '@/lib/apiClient';

export default function CareerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    position: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const openings = [
    { title: "Senior Physics Faculty", type: "Full-Time", location: "Knowledge City Campus" },
    { title: "Academic Counselor", type: "Full-Time", location: "Knowledge City Campus" },
    { title: "Digital Marketing Specialist", type: "Full-Time", location: "Remote/Hybrid" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await apiClient.post('/career/apply', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        position: formData.position,
        resumeUrl: 'local_upload' // Placeholder since we aren't doing real S3 uploads yet
      });
      setStatus('success');
      setMessage('Application submitted successfully! We will review your profile and get back to you.');
      setFormData({ firstName: '', lastName: '', email: '', mobile: '', position: '' });
    } catch (err) {
      console.error('Submission failed', err);
      setStatus('error');
      setMessage('Failed to submit application. Please try again later.');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 mt-16">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-white/10 text-white py-20 -mt-20 pt-36 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-slate-300">
              Shape the future of education by empowering the next generation of bright minds.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Current Openings */}
          <div>
            <SlideUp>
              <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
            </SlideUp>
            
            <StaggerContainer className="space-y-4">
              {openings.map((job, i) => (
                <StaggerItem key={i}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex justify-between items-center">
                       <div>
                         <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                         <div className="text-sm text-slate-500 mt-2 flex gap-4">
                           <span>{job.type}</span>
                           <span>•</span>
                           <span>{job.location}</span>
                         </div>
                       </div>
                       <div className="hidden sm:block">
                         <span className="text-primary font-medium text-sm group-hover:underline">Select Position &rarr;</span>
                       </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}

              <FadeIn delay={0.4}>
                <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                   <h4 className="font-semibold mb-2">Don't see a fit?</h4>
                   <p className="text-sm text-slate-600 dark:text-slate-400">
                     We're always looking for talented educators. Drop your resume in the general application form.
                   </p>
                </div>
              </FadeIn>
            </StaggerContainer>
          </div>

          {/* Application Form */}
          <SlideUp delay={0.2}>
            <Card className="border-t-4 border-t-primary shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Submit Application</h2>
                
                {status === 'success' ? (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-6 rounded-xl border border-green-200 dark:border-green-800 text-center">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-semibold">{message}</p>
                    <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
                      Submit Another 
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {status === 'error' && (
                      <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-3 rounded-md border border-red-200 dark:border-red-800">
                        {message}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
                      <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
                    </div>
                    
                    <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                    <Input label="Phone Number" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" required />
                    
                    <div className="w-full">
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Position Applied For
                      </label>
                      <select 
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="flex h-11 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-700"
                      >
                        <option value="" disabled>Select a position...</option>
                        {openings.map((j, i) => <option key={i} value={j.title}>{j.title}</option>)}
                        <option value="General Application">General Application</option>
                      </select>
                    </div>

                    <div className="w-full mb-6">
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Resume (PDF only)
                      </label>
                      <input 
                        type="file" 
                        accept=".pdf"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer border border-gray-300 dark:border-gray-700 rounded-md p-1.5" 
                      />
                      <p className="text-xs text-slate-400 mt-2">Note: File upload is simulated for this demo.</p>
                    </div>

                    <Button type="submit" size="lg" className="w-full mt-4" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                )}
                
              </CardContent>
            </Card>
          </SlideUp>

        </div>
      </div>
    </div>
  );
}
