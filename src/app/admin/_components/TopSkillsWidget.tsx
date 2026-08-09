import React from 'react';
import SkillIcon from '@/components/ui/SkillIcon';

interface Skill {
  id: number;
  name: string;
  proficiency: string;
  image: string | null;
}

export default function TopSkillsWidget({ skills }: { skills: Skill[] }) {
  const getPercent = (prof: string) => {
    if(!prof) return 80;
    const p = prof.toLowerCase();
    if(p.includes('expert') || p.includes('advanced')) return 95;
    if(p.includes('intermediate')) return 80;
    if(p.includes('beginner')) return 40;
    
    const match = p.match(/\d+/);
    if (match) return parseInt(match[0]);
    return 85;
  }

  if (!skills || skills.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col items-center justify-center shadow-sm dark:shadow-none">
        <p className="text-gray-500 dark:text-teal-600 text-sm">No skills found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">Top Skills</h3>
        <span className="text-gray-400 dark:text-teal-600 font-bold tracking-widest">...</span>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {skills.map(s => {
          const pct = getPercent(s.proficiency);
          return (
            <div key={s.id} className="flex items-center gap-3">
              <div className="w-8 flex justify-center shrink-0">
                <div className="w-7 h-7 bg-gray-50 dark:bg-[#061011] border border-gray-200 dark:border-[#163533] rounded-full flex items-center justify-center shadow-inner overflow-hidden p-1">
                  <SkillIcon icon={s.name} size={20} className="w-full h-full object-contain filter drop-shadow-md" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white truncate pr-2">{s.name}</span>
                  <span className="text-[11px] font-bold text-gray-700 dark:text-teal-100">{pct}%</span>
                </div>
                <div className="w-full h-[4px] bg-gray-100 dark:bg-[#163533] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 dark:bg-teal-400 rounded-full shadow-[0_0_5px_rgba(20,184,166,0.5)] dark:shadow-[0_0_5px_rgba(45,212,191,0.5)]" 
                    style={{ width: `${pct}%`}}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
