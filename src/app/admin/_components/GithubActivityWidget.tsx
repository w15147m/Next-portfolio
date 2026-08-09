import React from 'react';

export default function GithubActivityWidget() {
  const cells = Array.from({ length: 15 * 6 }); // 15 cols, 6 rows
  
  return (
    <div className="rounded-2xl bg-[#091515] border border-[#163533] p-5 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-teal-100 tracking-wide">GitHub Activity</h3>
        <span className="text-teal-600 font-bold tracking-widest">...</span>
      </div>
      <div className="flex-1 flex items-center justify-center mt-2">
        <div className="flex gap-2 text-[10px] text-teal-600">
          <div className="flex flex-col justify-between pt-1 pb-4 pr-1">
            <span>Sun</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Nov</span>
            <span>Oct</span>
          </div>
          <div>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
              {cells.map((_, i) => {
                const isHigh = Math.random() > 0.8;
                const isMed = Math.random() > 0.5;
                const bg = isHigh 
                  ? 'bg-teal-400 shadow-[0_0_5px_rgba(45,212,191,0.5)]' 
                  : isMed ? 'bg-teal-600/60' : 'bg-[#122e2b]';
                return (
                  <div key={i} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] ${bg}`}></div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] text-teal-600 mt-2 px-1">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
