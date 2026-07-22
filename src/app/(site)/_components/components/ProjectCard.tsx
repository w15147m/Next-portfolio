"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioUser } from "../types";

export default function ProjectCard({ project }: { project: PortfolioUser["projects"][number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-neutral-800 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black text-gray-300 dark:text-neutral-700">{project.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-1">{project.name}</h3>
        {project.desc && (
          <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
            {project.desc}
          </p>
        )}
        {project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.skills.map((sk, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium border border-brand-200 dark:border-brand-500/20"
              >
                {sk}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
