import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function ServicesSection({ services }: { services: PortfolioUser["services"] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-[#0a192f] text-[#8892b0]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle label="What I Offer" title="Services" subtitle="Solutions I deliver to help you achieve your goals." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="group rounded-2xl border border-[#233554] bg-[#112240] p-6 hover:border-[#64ffda] transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-[#64ffda]/10 border border-[#64ffda]/30 flex items-center justify-center mb-5 font-mono">
                <span className="text-[#64ffda] font-bold text-lg">{idx + 1}</span>
              </div>
              <h3 className="font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors text-base mb-2">{svc.name}</h3>
              {svc.desc && <p className="text-sm text-[#8892b0] leading-relaxed">{svc.desc}</p>}
              {svc.link && (
                <a
                  href={svc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono font-semibold text-[#64ffda] hover:underline"
                >
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
