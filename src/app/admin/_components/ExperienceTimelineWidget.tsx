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
      <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
        <p className="text-gray-500 mb-4">No experience records.</p>
        <Link href="/admin/experiences" className="text-brand-500 hover:underline text-sm font-medium">Add Experience</Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white tracking-tight">Experience</h3>
        <Link href="/admin/experiences" className="text-neutral-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </Link>
      </div>
      
      <div className="p-6 flex-1">
        <div className="relative border-l border-neutral-800 ml-3 space-y-8">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-6 group">
              <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-neutral-900 border-2 border-brand-500 group-hover:bg-brand-500 group-hover:shadow-[0_0_10px_rgba(100,255,218,0.8)] transition-all duration-300" />
              
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-semibold text-white">{exp.position}</h4>
                <p className="text-sm text-gray-400">{exp.company}</p>
                <p className="text-xs text-brand-500/80 mt-1">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
