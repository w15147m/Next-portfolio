import React from 'react';

export default function DashboardOverviewWidget({ counts }: { counts: any }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-6 h-full flex flex-col justify-between shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-teal-100 tracking-wide">
          Dashboard Overview
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-stretch">
        {/* Total Projects */}
        <div className="bg-teal-50/70 dark:bg-[#122e2b] rounded-2xl p-5 flex flex-col justify-between border border-teal-200/80 dark:border-teal-500/30 shadow-sm transition-all hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {counts.projects || 0}
            </p>
            <p className="text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              Total Projects
            </p>
          </div>
        </div>

        {/* Total Messages / Contacts */}
        <div className="bg-gray-50/80 dark:bg-[#0b1a1a] rounded-2xl p-5 flex flex-col justify-between border border-gray-200/80 dark:border-[#163533] shadow-sm transition-all hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {counts.messages || 0}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-teal-100/70 uppercase tracking-wider">
              Messages
            </p>
          </div>
        </div>

        {/* Total Skills */}
        <div className="bg-gray-50/80 dark:bg-[#0b1a1a] rounded-2xl p-5 flex flex-col justify-between border border-gray-200/80 dark:border-[#163533] shadow-sm transition-all hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {counts.skills || 0}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-teal-100/70 uppercase tracking-wider">
              Total Skills
            </p>
          </div>
        </div>

        {/* Profile Views */}
        <div className="bg-gray-50/80 dark:bg-[#0b1a1a] rounded-2xl p-5 flex flex-col justify-between border border-gray-200/80 dark:border-[#163533] shadow-sm transition-all hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              1.5k
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-teal-100/70 uppercase tracking-wider">
              Total Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
