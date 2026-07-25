import SectionTitle from "./SectionTitle";
import ContactForm from "./ContactForm";
import type { PortfolioUser } from "../types";

export default function ContactSection({ user }: { user: PortfolioUser }) {
  return (
    <section id="contact" className="py-24 bg-[#0a192f] text-[#8892b0]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          label="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-6">
            {user.email && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
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
                <div className="w-10 h-10 rounded-xl bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
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
                <div className="w-10 h-10 rounded-xl bg-[#64ffda]/10 border border-[#64ffda]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64ffda]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
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
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-[#112240] border border-[#233554] text-[#a8b2d1] hover:text-[#64ffda] hover:border-[#64ffda] transition-colors"
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
          <div className="lg:col-span-3 rounded-2xl border border-[#233554] bg-[#112240] p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
