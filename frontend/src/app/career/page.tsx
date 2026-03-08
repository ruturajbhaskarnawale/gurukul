"use client";

import React, { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeJob, setActiveJob] = useState<string | null>(null);

  const openings = [
    { 
      id: "01",
      title: "Senior Physics Faculty", 
      type: "FULL-TIME", 
      location: "MAIN CAMPUS",
      description: "we require a subject matter expert with a proven track record of securing top 100 ranks in jee advanced. focus on conceptual depth and student mentorship."
    },
    { 
      id: "02",
      title: "Academic Counselor", 
      type: "FULL-TIME", 
      location: "YP GURUKUL KNOWLEDGE CITY",
      description: "seeking individuals with professional empathy and deep understanding of student psychology to guide candidates through their academic journey."
    },
    { 
      id: "03",
      title: "Digital Strategy Lead", 
      type: "HYBRID", 
      location: "REMOTE/HYBRID",
      description: "driving the digital narrative of YP Gurukul. expertise in high-intent performance marketing and educational storytelling required."
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openApply = (position: string) => {
    setFormData(prev => ({ ...prev, position }));
    setShowApplyModal(true);
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
        resumeUrl: 'archival_submission'
      });
      setStatus('success');
      setMessage('submission logged. our archives will review your profile.');
      setTimeout(() => setShowApplyModal(false), 2000);
    } catch (err) {
      console.error('Submission failed', err);
      setStatus('error');
      setMessage('submission failure. try again.');
    }
  };

  return (
    <div className="bg-background min-h-screen pb-32">
      
      {/* Archival Header */}
      <section className="pt-48 pb-32 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="flex flex-col items-start leading-[0.85]">
            <FadeIn>
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8 block">the</span>
              <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter-editorial text-foreground">
                Opportunities <br /> <span className="text-foreground/20">Archive</span>
              </h1>
              <p className="text-xl text-muted-foreground lowercase mt-12 max-w-xl leading-relaxed">
                a curated index of open roles within the YP Gurukul ecosystem. we are constantly seeking architects of excellence.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Index */}
      <section className="py-24">
        <div className="max-w-[1800px] mx-auto px-12">
          <StaggerContainer className="flex flex-col">
            {openings.map((job) => (
              <StaggerItem key={job.id}>
                <div 
                  className={`
                    group border-b border-border py-12 cursor-pointer transition-all duration-700
                    ${activeJob === job.id ? 'bg-muted/40' : 'hover:bg-muted/20'}
                  `}
                  onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                >
                   <div className="flex justify-between items-center px-4">
                      <div className="flex items-center gap-12">
                         <span className="text-[10px] font-bold text-foreground/20 font-black uppercase">{job.id}</span>
                         <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">
                           {job.title}
                         </h2>
                      </div>
                      <div className="hidden md:flex gap-12 items-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">
                         <span>{job.type}</span>
                         <span className="text-foreground/20">|</span>
                         <span>{job.location}</span>
                         <div className="w-12 h-px bg-border group-hover:w-24 transition-all duration-500" />
                      </div>
                   </div>

                   <AnimatePresence>
                     {activeJob === job.id && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                         className="overflow-hidden"
                       >
                         <div className="px-24 py-12 max-w-[800px]">
                            <p className="text-xl text-muted-foreground lowercase leading-relaxed mb-12">
                              {job.description}
                            </p>
                            <button 
                              onClick={(e) => { e.stopPropagation(); openApply(job.title); }}
                              className="px-12 py-6 border border-border text-[10px] font-bold uppercase tracking-[0.5em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                            >
                              Begin Application
                            </button>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-32 border border-border p-12 text-center">
             <FadeIn>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/20 mb-4 block">General Submission</span>
               <p className="text-xl text-muted-foreground lowercase max-w-xl mx-auto mb-12">
                 don't see a fitting requisition? we welcome unsolicited archival submissions from visionary educators.
               </p>
               <button 
                 onClick={() => openApply('General Submission')}
                 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground hover:underline underline-offset-8"
               >
                 [ enter the general archive ]
               </button>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Focus Mode Application UI */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-2xl w-full py-12">
              <FadeIn>
                <div className="flex justify-between items-start mb-24">
                   <div className="flex flex-col">
                      <span className="font-script text-4xl text-muted-foreground lowercase mb-4">applying for</span>
                      <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">{formData.position}</h2>
                   </div>
                   <button 
                     onClick={() => setShowApplyModal(false)}
                     className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground p-4"
                   >
                     [ close ]
                   </button>
                </div>

                {status === 'success' ? (
                  <div className="text-center py-24">
                    <span className="font-script text-6xl text-foreground block mb-8 animate-pulse">accepted</span>
                    <p className="text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground">{message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-2 gap-12">
                       <div className="flex flex-col group">
                          <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50 group-focus-within:text-primary transition-colors mb-4 italic">01. First_Name</label>
                          <input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-all text-xl"
                            placeholder="..."
                          />
                       </div>
                       <div className="flex flex-col group">
                          <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50 group-focus-within:text-primary transition-colors mb-4 italic">02. Last_Name</label>
                          <input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-all text-xl"
                            placeholder="..."
                          />
                       </div>
                    </div>
 
                    <div className="flex flex-col group">
                       <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50 group-focus-within:text-primary transition-colors mb-4 italic">03. Electronic_Mail</label>
                       <input 
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-all text-xl"
                         placeholder="ARCHIVAL_ID@MAIL.COM"
                       />
                    </div>
 
                    <div className="flex flex-col group">
                       <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/50 group-focus-within:text-primary transition-colors mb-4 italic">04. Neural_Contact (Mobile)</label>
                       <input 
                         type="tel"
                         name="mobile"
                         value={formData.mobile}
                         onChange={handleChange}
                         required
                         className="bg-transparent border-b border-border py-4 text-foreground font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-all text-xl"
                         placeholder="+00 (0) 000 000"
                       />
                    </div>
 
                    <div className="pt-12">
                       <button 
                         type="submit"
                         disabled={status === 'loading'}
                         className="w-full py-8 bg-primary text-primary-foreground font-black uppercase tracking-[0.8em] text-[10px] hover:bg-primary/90 transition-colors"
                       >
                         {status === 'loading' ? 'SUBMITTING...' : 'LOG APPLICATION'}
                       </button>
                       <p className="text-center text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.3em] mt-8">
                         all submissions are filtered through the archival integrity engine.
                       </p>
                    </div>
                  </form>
                )}
              </FadeIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
