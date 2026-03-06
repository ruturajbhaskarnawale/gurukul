"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FadeIn, SlideUp } from '@/components/animations/MotionUtils';
import { Card, CardContent } from '@/components/global/Card';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { useAuth } from '@/lib/authContext';
import { ApiError } from '@/lib/apiClient';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form field state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password, mobile || undefined);
      }
      router.push('/portal/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setErrorMsg('');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 mt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 sm:px-6">

        <FadeIn className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {isLogin
              ? 'Sign in to access your student portal.'
              : 'Register to start your journey with YP Gurukul.'}
          </p>
        </FadeIn>

        <SlideUp delay={0.1}>
          <Card className="shadow-xl border-primary/10">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">

                {!isLogin && (
                  <FadeIn>
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FadeIn>
                )}

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {!isLogin && (
                  <FadeIn>
                    <Input
                      type="tel"
                      label="Mobile Number (optional)"
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </FadeIn>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <Link href="#" className="text-sm text-primary hover:underline font-medium">
                      Forgot Password?
                    </Link>
                  </div>
                )}

                {/* Error message */}
                {errorMsg && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-md px-4 py-3">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                  {isLogin ? 'Sign In' : 'Register'}
                </Button>

              </form>

              <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={switchMode}
                  className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  {isLogin ? 'Sign up here' : 'Log in here'}
                </button>
              </div>

            </CardContent>
          </Card>
        </SlideUp>

      </div>
    </div>
  );
}
