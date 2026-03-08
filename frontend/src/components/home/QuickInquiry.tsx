"use client";

import React, { useState } from 'react';
import { FadeIn } from '../animations/MotionUtils';
import { Card, CardContent, CardHeader, CardTitle } from '../global/Card';
import { Input } from '../global/Input';
import { Button } from '../global/Button';
import { apiClient, ApiError } from '@/lib/apiClient';

export const QuickInquiry = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiClient.post('/public/inquiries', {
        name: `${firstName} ${lastName}`.trim(),
        mobile: phone,
        message: `Interested in: ${course}`,
      });
      setSuccessMsg('Thanks! We\'ll call you back shortly. 🎉');
      setFirstName(''); setLastName(''); setPhone(''); setCourse('');
    } catch (err) {
      if (err instanceof ApiError) setErrorMsg(err.message);
      else setErrorMsg('Submission failed. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-32 items-center">

          <FadeIn>
            <div className="flex flex-col items-start leading-tight">
              <span className="font-script text-4xl text-muted-foreground lowercase mb-8">embark</span>
              <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter-editorial mb-12">
                The <br /> <span className="text-foreground/20">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground lowercase mb-12 max-w-md leading-relaxed">
                request a consultation with our academic architects to design your path to excellence.
              </p>
              <div className="flex gap-8 items-center pt-8 border-t border-border w-full">
                <div className="text-[12px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">Support Line</div>
                <p className="text-2xl font-black uppercase tracking-tighter text-foreground">+91 123 456 7890</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="border border-border p-12 md:p-16">
              {successMsg ? (
                <div className="text-center py-16">
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Confirmed</h3>
                  <p className="text-[#888888] lowercase">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">First Name</label>
                      <input 
                        className="bg-transparent border-b border-border py-4 focus:border-primary focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground"
                        placeholder="NAME"
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} required 
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Last Name</label>
                      <input 
                        className="bg-transparent border-b border-border py-4 focus:border-primary focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground"
                        placeholder="SURNAME"
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Phone Number</label>
                    <input 
                      type="tel"
                      className="bg-transparent border-b border-border py-4 focus:border-primary focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground"
                      placeholder="+91 000 000 0000"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} required 
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Selected Course</label>
                    <input 
                      className="bg-transparent border-b border-border py-4 focus:border-primary focus:outline-none transition-colors text-xl font-bold uppercase tracking-tight text-foreground"
                      placeholder="e.g. 11TH SCIENCE"
                      value={course} 
                      onChange={(e) => setCourse(e.target.value)} 
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-destructive text-xs font-bold uppercase tracking-widest">{errorMsg}</p>
                  )}

                  <button 
                    className="w-full py-6 border border-border font-bold uppercase tracking-[0.4em] text-[12px] hover:bg-foreground hover:text-background transition-all disabled:opacity-50 text-foreground"
                    type="submit" 
                    disabled={submitting}
                  >
                    {submitting ? 'SENDING...' : 'INITIATE CONSULTATION'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
