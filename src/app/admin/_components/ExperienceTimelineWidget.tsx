import React from 'react';
import Link from 'next/link';

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export default function ExperienceTimelineWidget({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col items-center justify-center shadow-sm dark:shadow-none">
        <p className="text-gray-500 dark:text-teal-600 text-sm mb-4">No experience records.</p>
        <Link href="/admin/experiences" className="text-teal-600 dark:text-teal-400 hover:underline text-xs font-medium">Add Experience</Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">Experience</h3>
      </div>
      
      <div className="flex-1 flex flex-col gap-6 relative ml-3 mt-2">
        <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gray-200 dark:bg-[#163533]"></div>
        
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="relative pl-6">
            <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${idx === 0 ? 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.5)] dark:shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'border-2 border-gray-300 dark:border-[#163533] bg-white dark:bg-[#091515]'}`}></div>
            <h4 className={`text-sm font-semibold mb-0.5 ${idx === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-teal-50/80'}`}>{exp.position} | {exp.company}</h4>
            <p className="text-[11px] text-gray-500 dark:text-teal-600">
              {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
