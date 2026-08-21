"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";
import ContactForm from "./ContactForm";
import type { PortfolioUser } from "../types";

export default function ContactSection({ user }: { user: PortfolioUser }) {
  const sectionRef = useScrollReveal<HTMLElement>({ delay: 200 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Section title — v4-main numbered heading style */}
      <div className="flex items-center gap-4 mb-12 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">06.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">Get In Touch</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left contact info */}
        <div className="lg:col-span-2 space-y-6">
          {user.email && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#64ffda] font-mono mb-1 uppercase tracking-wide">Email</p>
                <a href={`mailto:${user.email}`} className="text-[#ccd6f6] font-mono text-sm hover:text-[#64ffda] transition-colors break-all">
                  {user.email}
                </a>
              </div>
            </div>
          )}

          {user.number && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#64ffda] font-mono mb-1 uppercase tracking-wide">Phone</p>
                <a href={`tel:${user.number}`} className="text-[#ccd6f6] font-mono text-sm hover:text-[#64ffda] transition-colors">
                  {user.number}
                </a>
              </div>
            </div>
          )}

          {user.socials.length > 0 && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#64ffda] font-mono mb-2 uppercase tracking-wide">Social Links</p>
                <div className="flex gap-2 flex-wrap">
                  {user.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded text-xs font-mono bg-[#0a192f] border border-[#233554] text-[#a8b2d1] hover:text-[#64ffda] hover:border-[#64ffda] transition-all duration-200"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-3 rounded border border-[#233554] bg-[#112240] p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
