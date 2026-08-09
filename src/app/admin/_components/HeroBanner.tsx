import React from 'react';
import Link from 'next/link';

interface Counts {
  skills: number;
  projects: number;
  experiences: number;
  messages: number;
  unreadMessages: number;
}

interface HeroBannerProps {
  userName: string;
  userImage?: string | null;
  counts: Counts;
}

export default function HeroBanner({ userName, userImage, counts }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1c2a] via-[#05111a] to-black p-8 md:p-12 border border-brand-500/20 shadow-[0_0_40px_rgba(100,255,218,0.1)]">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-16 h-16 rounded-full border-2 border-brand-500/50 object-cover shadow-[0_0_15px_rgba(100,255,218,0.3)]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-500/20 border-2 border-brand-500/50 flex items-center justify-center text-brand-400 font-bold text-2xl shadow-[0_0_15px_rgba(100,255,218,0.3)]">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-sm font-medium tracking-widest text-brand-400 uppercase mb-1">
                Dashboard Overview
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                Welcome back, {userName.split(' ')[0]}
              </h1>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link 
              href="/admin/projects"
              className="flex items-center gap-2 bg-brand-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-brand-400 transition-colors shadow-[0_0_15px_rgba(100,255,218,0.3)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add New Project
            </Link>
            <Link 
              href="/admin/profile"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shrink-0">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-white">{counts.projects}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Skills</p>
            <p className="text-3xl font-bold text-white">{counts.skills}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Experiences</p>
            <p className="text-3xl font-bold text-white">{counts.experiences}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Messages</p>
            <p className="text-3xl font-bold text-white">{counts.messages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
