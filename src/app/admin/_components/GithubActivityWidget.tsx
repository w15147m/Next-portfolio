import React from 'react';

export default function GithubActivityWidget() {
  const cells = Array.from({ length: 52 * 7 }); // 52 weeks, 7 days
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">GitHub Activity</h3>
        <span className="text-gray-400 dark:text-teal-600 font-bold tracking-widest">...</span>
      </div>
      <div className="flex-1 flex items-center justify-center mt-2 overflow-x-auto pb-2">
        <div className="flex gap-3 text-[10px] text-gray-500 dark:text-teal-600 min-w-max">
          <div className="flex flex-col justify-between pt-1 pb-4 pr-1">
            <span>Sun</span>
            <span>Tue</span>
            <span>Thu</span>
            <span>Sat</span>
          </div>
          <div className="flex flex-col">
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}>
              {cells.map((_, i) => {
                const rand = Math.random();
                const bg = rand > 0.9 
                  ? 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_5px_rgba(20,184,166,0.5)] dark:shadow-[0_0_5px_rgba(45,212,191,0.5)]' 
                  : rand > 0.7 ? 'bg-teal-300 dark:bg-teal-600/80' : rand > 0.4 ? 'bg-teal-100 dark:bg-teal-800/50' : 'bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50';
                return (
                  <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${bg}`}></div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-teal-600 mt-2 px-1">
              {months.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
