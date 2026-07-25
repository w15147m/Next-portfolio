"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import type { PortfolioUser } from "../types";

export default function ServicesSection({ services }: { services: PortfolioUser["services"] }) {
  const sectionRef = useScrollReveal<HTMLElement>({ delay: 200 });

  if (services.length === 0) return null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Section title — v4-main numbered heading style */}
      <div className="flex items-center gap-4 mb-12 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">05.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">What I Offer</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className="group rounded border border-[#233554] bg-[#112240] p-6 hover:border-[#64ffda] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(100,255,218,0.07)] hover:-translate-y-1"
          >
            <div className="w-10 h-10 flex items-center justify-center mb-5 font-mono">
              <span className="text-[#64ffda] font-bold text-base">{String(idx + 1).padStart(2, "0")}.</span>
            </div>
            <h3 className="font-semibold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors text-base mb-2">
              {svc.name}
            </h3>
            {svc.desc && (
              <p className="text-sm text-[#8892b0] leading-relaxed">{svc.desc}</p>
            )}
            {svc.link && (
              <a
                href={svc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-xs font-mono text-[#64ffda] hover:underline"
              >
                Learn more →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
