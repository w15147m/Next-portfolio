import React from 'react';

export default function DashboardOverviewWidget({ counts }: { counts: any }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">Dashboard Overview</h3>
        <span className="text-gray-400 dark:text-teal-600 font-bold tracking-widest">...</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
        <div className="bg-teal-50 dark:bg-[#122e2b] rounded-xl p-3 flex flex-col justify-center border border-teal-200 dark:border-teal-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(20,184,166,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-100 to-transparent dark:from-teal-400/10 pointer-events-none"></div>
          <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 mb-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          <p className="text-[11px] text-teal-800 dark:text-teal-50/70 mb-0.5 relative z-10 font-medium">Total Projects</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white relative z-10">{counts.projects || 0}</p>
        </div>
        <div className="bg-white dark:bg-[#0b1a1a] rounded-xl p-3 flex flex-col justify-center border border-gray-100 dark:border-[#163533] shadow-sm dark:shadow-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <p className="text-[11px] text-gray-500 dark:text-teal-50/70 mb-0.5 font-medium">Contacts</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{counts.messages || 0}</p>
        </div>
        <div className="bg-white dark:bg-[#0b1a1a] rounded-xl p-3 flex flex-col justify-center border border-gray-100 dark:border-[#163533] shadow-sm dark:shadow-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-[11px] text-gray-500 dark:text-teal-50/70 mb-0.5 font-medium">Avg. Score</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">92%</p>
        </div>
        <div className="bg-white dark:bg-[#0b1a1a] rounded-xl p-3 flex flex-col justify-center border border-gray-100 dark:border-[#163533] shadow-sm dark:shadow-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <p className="text-[11px] text-gray-500 dark:text-teal-50/70 mb-0.5 font-medium">Views</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">1.5k</p>
        </div>
      </div>
    </div>
  );
}
