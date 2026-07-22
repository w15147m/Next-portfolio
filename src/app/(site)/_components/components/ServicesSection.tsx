import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function ServicesSection({ services }: { services: PortfolioUser["services"] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle label="What I Offer" title="Services" subtitle="Solutions I deliver to help you achieve your goals." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 p-6 hover:border-brand-400 hover:bg-white dark:hover:bg-neutral-900 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center mb-5 shadow-lg shadow-brand-500/30">
                <span className="text-white font-bold text-lg">{idx + 1}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{svc.name}</h3>
              {svc.desc && <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{svc.desc}</p>}
              {svc.link && (
                <a
                  href={svc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-500 hover:underline"
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
