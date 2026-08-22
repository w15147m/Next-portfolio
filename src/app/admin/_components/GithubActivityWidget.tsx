"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { GithubData, GithubCalendarData } from '@/lib/github';

export default function GithubActivityWidget({ github }: { github?: GithubData }) {
  const isConnected = github?.isConnected && github?.calendar?.weeks && github.calendar.weeks.length > 0;
  
  // Local calendar state that updates on year switch
  const [calendar, setCalendar] = useState<GithubCalendarData | null>(github?.calendar || null);
  const [selectedYear, setSelectedYear] = useState<number | 'lastYear'>('lastYear');
  const [isLoadingYear, setIsLoadingYear] = useState(false);

  useEffect(() => {
    if (github?.calendar) {
      setCalendar(github.calendar);
    }
  }, [github?.calendar]);

  // Available years from GitHub API (or fallback to recent years)
  const years = useMemo(() => {
    if (github?.calendar?.years && github.calendar.years.length > 0) {
      return github.calendar.years;
    }
    const current = new Date().getFullYear();
    return [current, current - 1, current - 2, current - 3];
  }, [github?.calendar?.years]);

  const totalContributions = calendar?.totalContributions ?? 0;

  // Handle switching year
  const handleYearChange = async (year: number | 'lastYear') => {
    if (year === selectedYear) return;
    setSelectedYear(year);
    setIsLoadingYear(true);

    try {
      const url = year === 'lastYear' 
        ? '/api/github/calendar' 
        : `/api/github/calendar?year=${year}`;
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.calendar) {
          setCalendar(data.calendar);
        }
      }
    } catch (err) {
      console.error("Failed to load calendar for year:", err);
    } finally {
      setIsLoadingYear(false);
    }
  };

  // Compute dynamic month labels aligned with week columns
  const monthLabels = useMemo(() => {
    if (!calendar?.weeks) return [];
    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    calendar.weeks.forEach((week, index) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const d = new Date(firstDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          labels.push({
            month: d.toLocaleDateString('en-US', { month: 'short' }),
            colIndex: index,
          });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [calendar]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'FOURTH_QUARTILE':
        return 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)] dark:shadow-[0_0_8px_rgba(45,212,191,0.6)]';
      case 'THIRD_QUARTILE':
        return 'bg-teal-400 dark:bg-teal-500';
      case 'SECOND_QUARTILE':
        return 'bg-teal-300 dark:bg-teal-700';
      case 'FIRST_QUARTILE':
        return 'bg-teal-100 dark:bg-teal-900/60';
      default:
        return 'bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50';
    }
  };

  const defaultCells = Array.from({ length: 52 * 7 });

  const yearLabel = selectedYear === 'lastYear' ? 'the last year' : selectedYear;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-6 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      {/* Top Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-teal-100 tracking-wide flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub Activity
        </h3>
        <span className="text-gray-400 dark:text-teal-600 font-bold tracking-widest">...</span>
      </div>

      {/* Main Content Grid: Heatmap (Left) + Vertical Year Tabs (Right) */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Section: Header + Bordered Calendar Box */}
        <div className="flex-1 w-full min-w-0">
          {/* Subheader with contribution count */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-800 dark:text-teal-50">
              {totalContributions.toLocaleString()} contributions in {yearLabel}
            </h4>
            {isLoadingYear && (
              <span className="text-xs text-teal-600 dark:text-teal-400 animate-pulse">Loading year...</span>
            )}
          </div>

          {/* Bordered Calendar Container */}
          <div className="rounded-xl border border-gray-200 dark:border-[#163533] p-4 bg-gray-50/50 dark:bg-[#061011]/60 overflow-x-auto">
            <div className="min-w-[780px] w-full flex flex-col gap-1.5">
              {/* Month Labels */}
              <div className="flex text-[11px] font-medium text-gray-500 dark:text-teal-500/80 pl-8 relative h-4">
                {monthLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `calc(2rem + ${lbl.colIndex * 1.9}%)` }}
                  >
                    {lbl.month}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 items-center">
                {/* Day Labels (Mon, Wed, Fri like GitHub) */}
                <div className="flex flex-col justify-between text-[10px] font-medium text-gray-400 dark:text-teal-600 h-[105px] pr-1 select-none">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* Contribution Columns */}
                {isConnected && calendar?.weeks ? (
                  <div className="grid grid-flow-col auto-cols-fr gap-1.5 flex-1">
                    {calendar.weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {week.contributionDays.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                            className={`aspect-square w-full min-w-[10px] max-w-[15px] rounded-[3px] cursor-pointer transition-all hover:scale-125 hover:z-20 ${getLevelColor(
                              day.contributionLevel
                            )}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-flow-col auto-cols-fr gap-1.5 flex-1">
                    {defaultCells.map((_, i) => {
                      const rand = Math.random();
                      const bg = rand > 0.9 
                        ? 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_6px_rgba(20,184,166,0.5)]' 
                        : rand > 0.7 ? 'bg-teal-300 dark:bg-teal-600/80' : rand > 0.4 ? 'bg-teal-100 dark:bg-teal-800/50' : 'bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50';
                      return (
                        <div key={i} className={`aspect-square w-full min-w-[10px] max-w-[15px] rounded-[3px] ${bg}`} />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Legend */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-teal-600 pt-3 pl-8">
                <span className="text-xs text-gray-400 dark:text-teal-700">
                  Learn how we count contributions
                </span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-[3px] bg-gray-100 dark:bg-[#061011] border border-gray-200/50 dark:border-[#163533]/50"></div>
                  <div className="w-3 h-3 rounded-[3px] bg-teal-100 dark:bg-teal-900/60"></div>
                  <div className="w-3 h-3 rounded-[3px] bg-teal-300 dark:bg-teal-700"></div>
                  <div className="w-3 h-3 rounded-[3px] bg-teal-400 dark:bg-teal-500"></div>
                  <div className="w-3 h-3 rounded-[3px] bg-teal-500 dark:bg-teal-400"></div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Vertical Year Selector (Matching GitHub layout) */}
        <div className="flex flex-row lg:flex-col gap-1 w-full lg:w-32 shrink-0 pt-7">
          {years.map((yr) => {
            const isActive = selectedYear === yr;
            return (
              <button
                key={yr}
                onClick={() => handleYearChange(yr)}
                disabled={isLoadingYear}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-gray-950 shadow-sm'
                    : 'text-gray-600 dark:text-teal-50/70 hover:bg-gray-100 dark:hover:bg-[#122e2b] hover:text-gray-900 dark:hover:text-teal-300'
                }`}
              >
                {yr}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
