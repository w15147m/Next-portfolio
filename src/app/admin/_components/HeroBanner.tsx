import React from 'react';

export default function HeroBanner({ userName, userImage }: { userName: string, userImage?: string | null }) {
  return (
    <div className="rounded-2xl bg-[#091515] border border-[#163533] p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(20,80,75,0.2)]">
      <div className="flex items-center gap-6">
        {userImage ? (
          <img src={userImage} alt={userName} className="w-16 h-16 rounded-full border border-teal-500/50" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-teal-900/40 border border-teal-500/50 flex items-center justify-center text-teal-400 font-bold text-2xl">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-teal-100 flex items-center gap-2 mb-1">
            Welcome back, {userName.split(' ')[0]}! <span className="text-teal-500">/</span>
          </h1>
          <p className="text-lg text-teal-50/70 mb-3">Manage your portfolio effortlessly.</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-teal-400">
              <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span> Active
            </span>
            <span className="text-teal-600">|</span>
            <span className="text-teal-600">Portfolio Updated: 2h ago</span>
          </div>
        </div>
      </div>
      
      {/* Mini Chart Mockup */}
      <div className="hidden lg:flex h-20 w-56 relative bg-[#061011] rounded-lg border border-[#163533] overflow-hidden items-end shrink-0">
        <svg className="absolute bottom-0 w-full h-full text-teal-500" preserveAspectRatio="none" viewBox="0 0 100 40">
          <path d="M0,35 C20,35 30,10 50,25 C70,35 80,5 100,10 L100,40 L0,40 Z" fill="rgba(20,184,166,0.15)" stroke="currentColor" strokeWidth="2" />
          <circle cx="80" cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
