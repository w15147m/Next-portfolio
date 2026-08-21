"use client";

import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PortfolioUser } from "../types";

type Project = PortfolioUser["projects"][number];

// GitHub Icon SVG
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// External Link Icon SVG
const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useScrollReveal<HTMLLIElement>({ delay: index * 100 + 200 });
  const isOdd = index % 2 !== 0; // odd indices → content on right, image on left

  return (
    <li
      ref={ref}
      className="relative grid gap-2.5 mb-24 last:mb-0"
      style={{ gridTemplateColumns: "repeat(12, 1fr)", alignItems: "center" }}
    >
      {/* ── Content ─────────────────── */}
      <div
        className={`relative z-10 ${
          isOdd
            ? "col-start-7 col-end-[-1] text-right md:col-start-5"
            : "col-start-1 col-end-7 text-left md:col-end-9"
        }`}
        style={{ gridRow: "1 / -1" }}
      >
        <p className="font-mono text-[#64ffda] text-xs mb-2.5 font-normal">Featured Project</p>

        <h3 className="text-[#ccd6f6] text-2xl sm:text-3xl font-semibold mb-5 leading-snug">
          {project.name}
        </h3>

        {/* Description card */}
        {project.desc && (
          <div className="relative z-10 bg-[#112240] rounded p-6 shadow-xl text-[#a8b2d1] text-base leading-relaxed mb-6">
            {project.desc}
          </div>
        )}

        {/* Tech list */}
        {project.skills.length > 0 && (
          <ul
            className={`flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-[#a8b2d1] mb-2.5 ${
              isOdd ? "justify-end" : "justify-start"
            }`}
          >
            {project.skills.map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div
          className={`flex items-center gap-1 mt-2.5 ${
            isOdd ? "justify-end -mr-2.5" : "justify-start -ml-2.5"
          } text-[#ccd6f6]`}
        >
          <a
            href="#"
            aria-label="GitHub Link"
            className="p-2.5 hover:text-[#64ffda] transition-colors duration-200"
          >
            <GitHubIcon />
          </a>
          <a
            href="#"
            aria-label="External Link"
            className="p-2.5 hover:text-[#64ffda] transition-colors duration-200"
          >
            <ExternalIcon />
          </a>
        </div>
      </div>

      {/* ── Image ───────────────────── */}
      <div
        className={`relative z-0 rounded shadow-xl ${
          isOdd
            ? "col-start-1 col-end-8"
            : "col-start-6 col-end-[-1]"
        }`}
        style={{ gridRow: "1 / -1" }}
      >
        <a
          href="#"
          className="relative block w-full h-full rounded bg-[#64ffda] group overflow-hidden"
        >
          {/* Navy screen overlay — clears on hover */}
          <div className="absolute inset-0 z-10 bg-[#0a192f] mix-blend-screen transition-opacity duration-300 group-hover:opacity-0 rounded pointer-events-none" />

          {project.image || project.images?.[0] ? (
            <Image
              src={project.image || project.images[0]}
              alt={project.name}
              width={700}
              height={440}
              className="block w-full h-full object-cover rounded mix-blend-multiply filter grayscale contrast-100 brightness-90 transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal"
              unoptimized
            />
          ) : (
            <div className="w-full h-56 bg-[#112240] flex items-center justify-center rounded">
              <span className="text-6xl font-bold text-[#64ffda]/30">{project.name[0]}</span>
            </div>
          )}
        </a>
      </div>
    </li>
  );
}

export default function ProjectsSection({
  projects,
}: {
  projects: PortfolioUser["projects"];
}) {
  const titleRef = useScrollReveal<HTMLDivElement>({ delay: 200 });

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
      {/* Section title */}
      <div ref={titleRef} className="flex items-center gap-4 mb-16 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">03.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">Some Things I've Built</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      <ul className="list-none p-0 m-0">
        {projects.map((project, i) => (
          <FeaturedProject key={project.id} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
