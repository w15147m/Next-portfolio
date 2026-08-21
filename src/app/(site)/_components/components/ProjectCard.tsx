"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioUser } from "../types";

export default function ProjectCard({ project }: { project: PortfolioUser["projects"][number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group rounded-2xl border border-[#233554] bg-[#112240] overflow-hidden hover:border-[#64ffda] transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Image */}
      <div className="relative h-48 bg-[#0a192f] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-bold text-[#64ffda]">{project.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors text-base mb-2 line-clamp-1">{project.name}</h3>
        {project.desc && (
          <p className={`text-sm text-[#8892b0] leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
            {project.desc}
          </p>
        )}
        {project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 font-mono">
            {project.skills.map((sk, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-[#64ffda]/10 text-[#64ffda] font-medium border border-[#64ffda]/20"
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
