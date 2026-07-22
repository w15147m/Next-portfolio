import Image from "next/image";
import { socialIcons } from "./socialIcons";
import type { PortfolioUser } from "../types";

export default function HeroSection({ user }: { user: PortfolioUser }) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {user.name}
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl lg:max-w-none leading-relaxed mb-8">
              {user.desc || "A passionate developer building amazing digital experiences."}
            </p>
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8">
              {user.number && (
                <a
                  href={`tel:${user.number}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {user.number}
                </a>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </a>
              )}
              {user.address && (
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.address}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition shadow-lg shadow-brand-500/30"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-brand-400 transition"
              >
                View Projects
              </a>
            </div>
            {/* Socials */}
            {user.socials.length > 0 && (
              <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
                {user.socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 hover:text-brand-500 hover:border-brand-400 transition"
                    title={s.name}
                  >
                    {socialIcons[s.name] || <span className="text-xs font-bold">{s.name[0]}</span>}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-400 to-purple-600 rotate-6 opacity-20" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl bg-gray-100 dark:bg-neutral-900">
                {user.image ? (
                  <Image src={user.image} alt={user.name} fill className="object-cover" priority />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-7xl font-black text-gray-300 dark:text-neutral-700">{user.name[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
