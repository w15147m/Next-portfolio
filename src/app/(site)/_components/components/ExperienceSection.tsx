import Image from "next/image";
import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function ExperienceSection({ experiences }: { experiences: PortfolioUser["experiences"] }) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-[#0a192f] text-[#8892b0]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle label="Career" title="Work Experience" />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#233554] hidden sm:block" />
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex gap-6 sm:pl-20">
                {/* Dot */}
                <div className="absolute left-5 top-6 hidden sm:flex w-6 h-6 rounded-full bg-[#64ffda] border-4 border-[#0a192f] shadow-lg z-10" />
                {/* Image */}
                {exp.image && (
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-[#233554] bg-[#112240] sm:hidden">
                    <Image src={exp.image} alt={exp.company} width={56} height={56} className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="flex-1 rounded-2xl border border-[#233554] bg-[#112240] p-5 hover:border-[#64ffda] transition-colors">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      {exp.image && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#233554] hidden sm:block flex-shrink-0">
                          <Image src={exp.image} alt={exp.company} width={40} height={40} className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-[#ccd6f6]">{exp.position}</h3>
                        <p className="text-[#64ffda] text-sm font-semibold">{exp.company}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#8892b0] bg-[#0a192f] border border-[#233554] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                    </span>
                  </div>
                  {exp.desc && <p className="mt-3 text-sm text-[#8892b0] leading-relaxed">{exp.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
