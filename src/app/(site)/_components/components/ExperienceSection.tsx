"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PortfolioUser } from "../types";

type Experience = PortfolioUser["experiences"][number];

const TAB_HEIGHT = 42; // px — matches v4-main --tab-height

export default function ExperienceSection({
  experiences,
}: {
  experiences: PortfolioUser["experiences"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useScrollReveal<HTMLElement>({ delay: 200 });

  if (experiences.length === 0) return null;

  const active: Experience = experiences[activeTab];

  const formatRange = (start: string, end: string | null) => {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Section title */}
      <div className="flex items-center gap-4 mb-12 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">02.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">Where I've Worked</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      {/* ── Inner: max-w-[700px], side by side ─────────────── */}
      <div className="flex flex-col sm:flex-row" style={{ maxWidth: 700 }}>

        {/* ── Tab List (left column) ─── */}
        <div
          className="relative flex-shrink-0 flex sm:flex-col overflow-x-auto sm:overflow-visible"
          role="tablist"
          aria-label="Job tabs"
          style={{ minHeight: experiences.length * TAB_HEIGHT }}
        >
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              id={`tab-${i}`}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              tabIndex={activeTab === i ? 0 : -1}
              onClick={() => setActiveTab(i)}
              className={`
                relative z-10 flex items-center
                px-5 text-left whitespace-nowrap
                font-mono text-xs transition-colors duration-200
                border-b-2 sm:border-b-0 sm:border-l-2
                ${activeTab === i
                  ? "border-[#64ffda] text-[#64ffda] bg-[#112240]"
                  : "border-[#233554] text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]"
                }
              `}
              style={{ height: TAB_HEIGHT, minWidth: 120 }}
            >
              {exp.company}
            </button>
          ))}

          {/* Mobile: bottom horizontal highlight */}
          <div
            aria-hidden
            className="sm:hidden absolute bottom-0 left-0 bg-[#64ffda] rounded transition-transform duration-[250ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
            style={{
              width: 120,
              height: 2,
              transform: `translateX(calc(${activeTab} * 120px))`,
            }}
          />

          {/* Desktop: left vertical highlight */}
          <div
            aria-hidden
            className="hidden sm:block absolute top-0 left-0 bg-[#64ffda] rounded transition-transform duration-[250ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
            style={{
              width: 2,
              height: TAB_HEIGHT,
              transform: `translateY(calc(${activeTab} * ${TAB_HEIGHT}px))`,
            }}
          />
        </div>

        {/* ── Tab Panel (right column) ── */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${activeTab}`}
          className="ml-0 sm:ml-5 flex-1 py-2.5 px-1 min-h-[320px]"
        >
          {/* Title @ Company */}
          <h3 className="text-[#ccd6f6] text-lg sm:text-xl font-semibold leading-snug mb-1">
            <span>{active.position}</span>
            <span className="text-[#64ffda]">
              &nbsp;@&nbsp;{active.company}
            </span>
          </h3>

          {/* Date range */}
          <p className="font-mono text-xs text-[#a8b2d1] mb-6">
            {formatRange(active.startDate, active.endDate)}
          </p>

          {/* Description bullets */}
          {active.desc && (
            <ul className="space-y-3">
              {active.desc.split("\n").filter(Boolean).map((line, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#8892b0] leading-relaxed">
                  <span className="text-[#64ffda] mt-0.5 flex-shrink-0">▹</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
