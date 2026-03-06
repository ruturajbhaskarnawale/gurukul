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
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <FadeIn>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Not sure which course is right for you?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Request a callback from our expert academic counselors. We'll help you chart the perfect roadmap for your educational journey.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call us directly</p>
                  <p className="font-semibold">+91 123 456 7890</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Request Callback</CardTitle>
              </CardHeader>
              <CardContent>
                {successMsg ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎉</div>
                    <p className="text-green-700 dark:text-green-400 font-semibold">{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                      <Input label="Last Name" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <Input label="Interested Class/Course" placeholder="e.g. 11th Science" value={course} onChange={(e) => setCourse(e.target.value)} />

                    {errorMsg && (
                      <p className="text-red-600 dark:text-red-400 text-sm">{errorMsg}</p>
                    )}

                    <Button className="w-full mt-2" size="lg" type="submit" isLoading={submitting}>
                      Submit Inquiry
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
