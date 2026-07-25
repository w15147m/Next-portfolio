import Image from "next/image";
import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function TestimonialsSection({ testimonials }: { testimonials: PortfolioUser["testimonials"] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-[#0a192f] text-[#8892b0]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle label="Social Proof" title="What People Say" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-[#233554] bg-[#112240] p-6 hover:border-[#64ffda] transition-all hover:shadow-lg"
            >
              <svg className="w-8 h-8 text-[#64ffda] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-[#8892b0] text-sm leading-relaxed mb-5 italic">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0a192f] border border-[#233554] flex-shrink-0">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#64ffda]">
                      {t.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#ccd6f6] text-sm">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs font-mono text-[#8892b0]">{[t.role, t.company].filter(Boolean).join(", ")}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
