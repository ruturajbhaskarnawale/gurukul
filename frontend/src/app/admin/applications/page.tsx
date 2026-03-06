"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/global/Card';
import { FadeIn } from '@/components/animations/MotionUtils';
import { apiClient } from '@/lib/apiClient';

interface Application {
  id: string;
  name: string;
  email: string;
  mobile: string;
  position: string;
  resumeUrl: string;
  appliedAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Application[]>('/admin/applications');
      setApplications(data);
    } catch(err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Career Applications</h1>
        <p className="text-sm text-slate-500">Review job applications submitted via the public career page.</p>
      </div>

      <FadeIn>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 dark:text-slate-300">Applicant</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 dark:text-slate-300">Contact</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 dark:text-slate-300">Position Applied</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 dark:text-slate-300">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-slate-600 dark:text-slate-300 text-right">Resume</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">Loading applications...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No applications found. Once submitted via the careers form, they will appear here.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
                             {app.name.charAt(0).toUpperCase()}
                           </div>
                           <span className="font-medium text-slate-900 dark:text-white">{app.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-600 dark:text-slate-400">{app.email}</p>
                        <p className="text-xs text-slate-500">{app.mobile}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {app.position}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a 
                          href={app.resumeUrl !== 'local_upload' ? app.resumeUrl : '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-primary hover:underline text-sm font-medium"
                          onClick={(e) => {
                             if(app.resumeUrl === 'local_upload') {
                               e.preventDefault();
                               alert("This is a demo application. Real files would be stored in S3/Cloud Storage.");
                             }
                          }}
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
