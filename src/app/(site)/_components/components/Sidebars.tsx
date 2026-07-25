"use client";

import { useState, useEffect } from "react";
import { socialIcons } from "./socialIcons";

const LOADER_DELAY = 2000;

interface Props {
  email?: string | null;
  socials?: { id: number; name: string; link: string | null; desc: string | null }[];
}

export default function Sidebars({ email, socials = [] }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), LOADER_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  const sideStyle: React.CSSProperties = {
    opacity: isMounted ? 1 : 0,
    transition: "opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1)",
  };

  return (
    <>
      {/* ── Desktop: Left Fixed Social Sidebar ───────────────────── */}
      <div
        style={sideStyle}
        className="hidden lg:flex fixed bottom-0 left-10 z-40 flex-col items-center gap-5 text-[#a8b2d1]"
      >
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            title={s.name}
          >
            {socialIcons[s.name] || (
              <span className="font-mono text-xs">{s.name[0]}</span>
            )}
          </a>
        ))}
        <div className="w-[1px] h-24 bg-[#a8b2d1]/40 mt-2" />
      </div>

      {/* ── Desktop: Right Fixed Email Sidebar ───────────────────── */}
      {email && (
        <div
          style={sideStyle}
          className="hidden lg:flex fixed bottom-0 right-10 z-40 flex-col items-center gap-6 text-[#a8b2d1]"
        >
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs tracking-widest hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200 [writing-mode:vertical-rl]"
          >
            {email}
          </a>
          <div className="w-[1px] h-24 bg-[#a8b2d1]/40 mt-2" />
        </div>
      )}

      {/* ── Mobile: Bottom Footer Social Bar ─────────────────────── */}
      {(socials.length > 0 || email) && (
        <div
          style={sideStyle}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a192f]/95 backdrop-blur border-t border-[#233554] px-6 py-3 flex items-center justify-center gap-6"
        >
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              {socialIcons[s.name] || (
                <span className="font-mono text-xs uppercase">{s.name[0]}</span>
              )}
            </a>
          ))}
          {email && (
            <a
              href={`mailto:${email}`}
              className="font-mono text-[10px] text-[#a8b2d1] hover:text-[#64ffda] transition-colors duration-200 tracking-widest truncate max-w-[140px]"
              title={email}
            >
              {email}
            </a>
          )}
        </div>
      )}
    </>
  );
}
