"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  desc: string | null;
  image: string | null;
  skills: string[];
  createdAt: string;
}

export default function RecentProjectsGrid({ projects }: { projects: Project[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col items-center justify-center shadow-sm dark:shadow-none">
        <p className="text-gray-500 dark:text-teal-600 text-sm">No projects found.</p>
      </div>
    );
  }

  const maxIndex = Math.max(0, projects.length - itemsPerPage);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxIndex;

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex((prev) => Math.min(maxIndex, prev + 1));
    }
  };

  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div data-theme-trigger="light-fix" className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-teal-100 tracking-wide">
            Recent Projects
          </h3>
          <span className="text-xs text-gray-400 dark:text-teal-600 font-medium">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, projects.length)} of {projects.length}
          </span>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                startIndex === idx
                  ? 'w-5 bg-teal-500'
                  : 'w-1.5 bg-gray-200 dark:bg-[#163533] hover:bg-teal-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Previous project"
          className={`absolute left-0 z-20 w-8 h-8 -ml-3 bg-white dark:bg-[#061011] border border-gray-200 dark:border-[#163533] rounded-full flex items-center justify-center transition-all shadow-md ${
            canGoPrev
              ? 'text-gray-700 dark:text-teal-400 hover:scale-110 hover:border-teal-400 cursor-pointer'
              : 'text-gray-300 dark:text-[#163533] opacity-40 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-gray-100 dark:border-[#163533] bg-gray-50 dark:bg-[#0b1a1a] overflow-hidden flex flex-col group relative transition-all duration-300 hover:border-teal-400/40"
            >
              <div className="h-32 w-full bg-gray-200 dark:bg-[#061011] relative overflow-hidden shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-[#163533] bg-gray-100 dark:bg-teal-900/10">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0b1a1a] to-transparent" />
              </div>

              <div className="p-4 flex flex-col flex-1 relative z-10 -mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-3">
                  {project.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full bg-teal-50 dark:bg-[#122e2b] border border-teal-100 dark:border-[#163533] flex items-center justify-center text-[8px] text-teal-600 dark:text-teal-400 font-bold"
                      title={skill}
                    >
                      {skill.charAt(0)}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-[#122e2b] border border-gray-200 dark:border-[#163533] flex items-center justify-center text-[8px] text-gray-600 dark:text-teal-600 font-bold">
                      +{project.skills.length - 3}
                    </span>
                  )}
                  <span className="ml-auto text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                    Active
                  </span>
                </div>

                <Link
                  href="/admin/projects"
                  className="mt-auto block w-full py-2 rounded-lg border border-gray-200 dark:border-[#163533] bg-white dark:bg-[#091515] hover:bg-gray-50 dark:hover:bg-[#122e2b] text-center text-[11px] font-medium text-gray-700 dark:text-teal-100 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next project"
          className={`absolute right-0 z-20 w-8 h-8 -mr-3 bg-white dark:bg-[#061011] border border-gray-200 dark:border-[#163533] rounded-full flex items-center justify-center transition-all shadow-md ${
            canGoNext
              ? 'text-gray-700 dark:text-teal-400 hover:scale-110 hover:border-teal-400 cursor-pointer'
              : 'text-gray-300 dark:text-[#163533] opacity-40 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
