import React from 'react';
import type { GithubData } from '@/lib/github';

export default function GithubActivityWidget({ github }: { github?: GithubData }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const isConnected = github?.isConnected && github?.calendar?.weeks && github.calendar.weeks.length > 0;
  const calendar = github?.calendar;
  const totalContributions = calendar?.totalContributions ?? 0;

  // Level color helper
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'FOURTH_QUARTILE':
        return 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_5px_rgba(20,184,166,0.5)] dark:shadow-[0_0_5px_rgba(45,212,191,0.5)]';
      case 'THIRD_QUARTILE':
        return 'bg-teal-400 dark:bg-teal-500';
      case 'SECOND_QUARTILE':
        return 'bg-teal-300 dark:bg-teal-700';
      case 'FIRST_QUARTILE':
        return 'bg-teal-200 dark:bg-teal-900/60';
      default:
        return 'bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50';
    }
  };

  const defaultCells = Array.from({ length: 52 * 7 });

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">GitHub Activity</h3>
          {isConnected && (
            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
              {totalContributions.toLocaleString()} contributions in the last year
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-teal-600">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50"></div>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-200 dark:bg-teal-900/60"></div>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-300 dark:bg-teal-700"></div>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-400 dark:bg-teal-500"></div>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-teal-500 dark:bg-teal-400"></div>
          <span>More</span>
        </div>
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
            {isConnected && calendar?.weeks ? (
              <div className="flex gap-1">
                {calendar.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.contributionDays.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        title={`${day.contributionCount} contributions on ${day.date}`}
                        className={`w-2.5 h-2.5 rounded-[2px] cursor-pointer transition-transform hover:scale-125 ${getLevelColor(
                          day.contributionLevel
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}>
                {defaultCells.map((_, i) => {
                  const rand = Math.random();
                  const bg = rand > 0.9 
                    ? 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_5px_rgba(20,184,166,0.5)] dark:shadow-[0_0_5px_rgba(45,212,191,0.5)]' 
                    : rand > 0.7 ? 'bg-teal-300 dark:bg-teal-600/80' : rand > 0.4 ? 'bg-teal-100 dark:bg-teal-800/50' : 'bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50';
                  return (
                    <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${bg}`}></div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between text-[10px] text-gray-400 dark:text-teal-600 mt-2 px-1">
              {months.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
