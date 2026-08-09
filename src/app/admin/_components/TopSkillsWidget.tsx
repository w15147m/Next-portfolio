import React from 'react';
import Link from 'next/link';

interface Skill {
  id: number;
  name: string;
  proficiency: string;
  image: string | null;
}

export default function TopSkillsWidget({ skills }: { skills: Skill[] }) {
  const getProficiencyPercentage = (prof: string) => {
    if (!prof) return 80;
    const p = prof.toLowerCase();
    if (p.includes('expert') || p.includes('advanced') || p.includes('fluent')) return 92;
    if (p.includes('intermediate') || p.includes('proficient')) return 75;
    if (p.includes('beginner') || p.includes('basic') || p.includes('novice')) return 40;
    // Check if it contains a number
    const match = p.match(/\d+/);
    if (match) return parseInt(match[0]);
    return 85;
  };

  if (!skills || skills.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
        <p className="text-gray-500 mb-4">No skills added yet.</p>
        <Link href="/admin/skills" className="text-brand-500 hover:underline text-sm font-medium">Add Skills</Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white tracking-tight">Top Skills</h3>
        <Link href="/admin/skills" className="text-neutral-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </Link>
      </div>
      
      <div className="p-5 flex-1 flex flex-col gap-5 overflow-y-auto max-h-[350px] xl:max-h-none">
        {skills.map((skill) => {
          const percent = getProficiencyPercentage(skill.proficiency);
          return (
            <div key={skill.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {skill.image && (
                    <img src={skill.image} alt={skill.name} className="w-5 h-5 object-contain" />
                  )}
                  <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                </div>
                <span className="text-xs font-bold text-brand-400">{percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full group-hover:brightness-125 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
