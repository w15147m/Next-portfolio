import React from 'react';

export default function PortfolioHealthWidget() {
  return (
    <div className="rounded-2xl bg-[#091515] border border-[#163533] p-5 h-full flex flex-col items-center relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-teal-100 tracking-wide">Portfolio Health</h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-2">
        {/* Semi-circle gauge */}
        <div className="relative w-32 h-16">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#163533" strokeWidth="12" strokeLinecap="round" />
            <path 
              d="M 10 50 A 40 40 0 0 1 85 20" 
              fill="none" 
              stroke="#2dd4bf" 
              strokeWidth="12" 
              strokeLinecap="round" 
              className="drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" 
            />
          </svg>
          <div className="absolute -bottom-2 left-0 right-0 flex flex-col items-center">
            <span className="text-3xl font-bold text-white leading-none">94%</span>
            <span className="text-[10px] text-teal-600 mt-1">Gauge Chart</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-teal-50/70 mt-6 mb-1">Status: <span className="text-teal-400 font-medium">Excellent</span></p>
    </div>
  );
}
