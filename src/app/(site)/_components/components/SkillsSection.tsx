"use client";

import { useState } from "react";
import SkillBadge from "./SkillBadge";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PortfolioUser } from "../types";

type Skill = PortfolioUser["skills"][number];

// ── Smart categorization by skill name ────────────────────────────────────────
const CATEGORY_MAP: Record<string, string[]> = {
  Frontend: [
    "html", "css", "javascript", "typescript", "react", "next", "vue", "nuxt",
    "svelte", "angular", "tailwind", "scss", "sass", "less", "bootstrap",
    "jquery", "redux", "zustand", "vite", "webpack",
  ],
  Backend: [
    "laravel", "php", "node", "express", "nestjs", "django", "flask",
    "rails", "ruby", "python", "java", "spring", "go", "rust", "c#",
    "dotnet", "mysql", "postgresql", "postgres", "mongodb", "redis",
    "sqlite", "graphql", "rest", "api", "prisma",
  ],
  Mobile: [
    "react native", "flutter", "android", "ios", "swift", "kotlin",
    "expo", "ionic", "xamarin",
  ],
  Desktop: [
    "electron", "tauri", "qt", "gtk", "wpf", "winforms",
  ],
};

const TAB_HEIGHT = 42;

function categorize(skills: Skill[]): Record<string, Skill[]> {
  const groups: Record<string, Skill[]> = {
    Frontend: [],
    Backend: [],
    Mobile: [],
    Desktop: [],
    Other: [],
  };

  skills.forEach((skill) => {
    const lower = skill.name.toLowerCase();
    let matched = false;
    for (const [cat, keywords] of Object.entries(CATEGORY_MAP)) {
      if (keywords.some((kw) => lower.includes(kw))) {
        groups[cat].push(skill);
        matched = true;
        break;
      }
    }
    if (!matched) groups["Other"].push(skill);
  });

  // Remove empty groups
  return Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
}

export default function SkillsSection({ skills }: { skills: PortfolioUser["skills"] }) {
  const sectionRef = useScrollReveal<HTMLElement>({ delay: 200 });
  const grouped = categorize(skills);
  const tabs = Object.keys(grouped);
  const [activeTab, setActiveTab] = useState(0);

  if (skills.length === 0) return null;

  const activeSkills = grouped[tabs[activeTab]] ?? [];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Section title */}
      <div className="flex items-center gap-4 mb-12 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">04.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">Skills & Technologies</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      {/* Tab interface — same style as experience section */}
      <div className="flex flex-col sm:flex-row" style={{ maxWidth: 700 }}>

        {/* ── Tab List (left) ─── */}
        <div
          className="relative flex-shrink-0 flex sm:flex-col overflow-x-auto sm:overflow-visible mb-8 sm:mb-0"
          role="tablist"
          aria-label="Skill category tabs"
          style={{ minHeight: tabs.length * TAB_HEIGHT }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              id={`skill-tab-${i}`}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`skill-panel-${i}`}
              tabIndex={activeTab === i ? 0 : -1}
              onClick={() => setActiveTab(i)}
              className={`
                relative z-10 flex items-center justify-center sm:justify-start
                px-5 text-left whitespace-nowrap font-mono text-xs
                transition-colors duration-200
                border-b-2 sm:border-b-0 sm:border-l-2
                ${activeTab === i
                  ? "border-[#64ffda] text-[#64ffda] bg-[#112240]"
                  : "border-[#233554] text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]"
                }
              `}
              style={{ height: TAB_HEIGHT, minWidth: 120 }}
            >
              {tab}
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

        {/* ── Tab Panel (right) ─── */}
        <div
          id={`skill-panel-${activeTab}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`skill-tab-${activeTab}`}
          className="sm:ml-5 flex-1 py-2.5 px-1 min-h-[200px]"
        >
          <div className="flex flex-wrap gap-3">
            {activeSkills.map((skill) => (
              <SkillBadge
                key={skill.id}
                name={skill.name}
                proficiency={skill.proficiency}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
