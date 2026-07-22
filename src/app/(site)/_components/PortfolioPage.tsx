"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillIcon from "@/components/ui/SkillIcon";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PortfolioUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  address: string | null;
  number: string | null;
  desc: string | null;
  skills: { id: number; name: string; proficiency: string | null; desc: string | null }[];
  experiences: { id: number; company: string; position: string; image: string | null; startDate: string; endDate: string | null; desc: string | null }[];
  educations: { id: number; institution: string; degree: string; startDate: string; endDate: string | null; desc: string | null }[];
  services: { id: number; name: string; desc: string | null; link: string | null }[];
  socials: { id: number; name: string; link: string | null; desc: string | null }[];
  testimonials: { id: number; name: string; role: string | null; company: string | null; image: string | null; content: string }[];
  projects: { id: number; name: string; desc: string | null; image: string | null; skills: string[]; images: string[] }[];
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBadge({ name, proficiency }: { name: string; proficiency?: string | null }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 transition-colors group">
      <SkillIcon icon={name} size={40} />
      <span>{name}</span>
      {proficiency && (
        <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-brand-500 transition-colors">
          · {proficiency}
        </span>
      )}
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-500 mb-3 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="What's this about?"
          className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project or inquiry..."
          className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400 text-center font-medium">
          ✓ Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 text-center font-medium">
          ✗ Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [user, setUser] = useState<PortfolioUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => { setUser(d.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Portfolio not found.</p>
      </div>
    );
  }

  const socialIcons: Record<string, React.ReactNode> = {
    GitHub: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    LinkedIn: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    Twitter: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  };

  return (
    <main className="flex flex-col w-full overflow-hidden bg-gray-50 dark:bg-neutral-950">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
                  <a href={`tel:${user.number}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {user.number}
                  </a>
                )}
                {user.email && (
                  <a href={`mailto:${user.email}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {user.email}
                  </a>
                )}
                {user.address && (
                  <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {user.address}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="#contact" className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition shadow-lg shadow-brand-500/30">
                  Get in Touch
                </a>
                <a href="#projects" className="px-6 py-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-brand-400 transition">
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
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl font-black text-gray-300 dark:text-neutral-700">
                        {user.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      {user.skills.length > 0 && (
        <section id="skills" className="py-24 bg-white dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              label="Technical Expertise"
              title="Skills & Technologies"
              subtitle="A curated set of tools and technologies I work with professionally."
            />
            <div className="flex flex-wrap gap-3 justify-center">
              {user.skills.map((skill) => (
                <SkillBadge key={skill.id} name={skill.name} proficiency={skill.proficiency} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      {user.projects.length > 0 && (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-neutral-950">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              label="Portfolio"
              title="Featured Projects"
              subtitle="A selection of work that demonstrates my capabilities and problem-solving approach."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 dark:bg-neutral-800 overflow-hidden">
                    {proj.image ? (
                      <Image src={proj.image} alt={proj.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black text-gray-300 dark:text-neutral-700">{proj.name[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-1">
                      {proj.name}
                    </h3>
                    {proj.desc && (
                      <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${activeProject === proj.id ? "" : "line-clamp-2"}`}>
                        {proj.desc}
                      </p>
                    )}
                    {proj.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.skills.map((sk, i) => (
                          <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium border border-brand-200 dark:border-brand-500/20">
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      {user.experiences.length > 0 && (
        <section id="experience" className="py-24 bg-white dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto px-6">
            <SectionTitle label="Career" title="Work Experience" />
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 to-transparent hidden sm:block" />
              <div className="space-y-8">
                {user.experiences.map((exp) => (
                  <div key={exp.id} className="relative flex gap-6 sm:pl-20">
                    {/* Dot */}
                    <div className="absolute left-5 top-6 hidden sm:flex w-6 h-6 rounded-full bg-brand-500 border-4 border-white dark:border-neutral-900 shadow-lg z-10" />
                    {/* Image */}
                    {exp.image && (
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 sm:hidden">
                        <Image src={exp.image} alt={exp.company} width={56} height={56} className="object-cover w-full h-full" />
                      </div>
                    )}
                    <div className="flex-1 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 p-5 hover:border-brand-400 transition-colors">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          {exp.image && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-800 hidden sm:block flex-shrink-0">
                              <Image src={exp.image} alt={exp.company} width={40} height={40} className="object-cover" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                            <p className="text-brand-500 text-sm font-semibold">{exp.company}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                        </span>
                      </div>
                      {exp.desc && (
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{exp.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      {user.educations.length > 0 && (
        <section id="education" className="py-24 bg-gray-50 dark:bg-neutral-950">
          <div className="max-w-4xl mx-auto px-6">
            <SectionTitle label="Learning" title="Education" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {user.educations.map((edu) => (
                <div key={edu.id} className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-brand-400 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{edu.degree}</h3>
                  <p className="text-brand-500 text-sm font-semibold mt-1">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                  </p>
                  {edu.desc && (
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{edu.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      {user.services.length > 0 && (
        <section id="services" className="py-24 bg-white dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              label="What I Offer"
              title="Services"
              subtitle="Solutions I deliver to help you achieve your goals."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.services.map((svc, idx) => (
                <div key={svc.id} className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 p-6 hover:border-brand-400 hover:bg-white dark:hover:bg-neutral-900 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center mb-5 shadow-lg shadow-brand-500/30">
                    <span className="text-white font-bold text-lg">{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{svc.name}</h3>
                  {svc.desc && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{svc.desc}</p>
                  )}
                  {svc.link && (
                    <a href={svc.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-brand-500 hover:underline">
                      Learn more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      {user.testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-gray-50 dark:bg-neutral-950">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle label="Social Proof" title="What People Say" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.testimonials.map((t) => (
                <div key={t.id} className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-brand-400 transition-all hover:shadow-lg">
                  <svg className="w-8 h-8 text-brand-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 italic">
                    {t.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-800 flex-shrink-0">
                      {t.image ? (
                        <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">
                          {t.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                      {(t.role || t.company) && (
                        <p className="text-xs text-gray-400">{[t.role, t.company].filter(Boolean).join(", ")}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white dark:bg-neutral-900">
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
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Email</p>
                    <a href={`mailto:${user.email}`} className="text-gray-800 dark:text-white font-medium text-sm hover:text-brand-500 transition break-all">{user.email}</a>
                  </div>
                </div>
              )}
              {user.number && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Phone</p>
                    <a href={`tel:${user.number}`} className="text-gray-800 dark:text-white font-medium text-sm hover:text-brand-500 transition">{user.number}</a>
                  </div>
                </div>
              )}
              {user.socials.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Social Links</p>
                    <div className="flex gap-2 flex-wrap">
                      {user.socials.map((s) => (
                        <a key={s.id} href={s.link || "#"} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-500 transition">
                          {s.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-300">{user.name}</span>. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {user.socials.map((s) => (
              <a key={s.id} href={s.link || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
