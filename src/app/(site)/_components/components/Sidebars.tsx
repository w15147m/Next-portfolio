"use client";

import { socialIcons } from "./socialIcons";

interface Props {
  email?: string | null;
  socials?: { id: number; name: string; link: string | null; desc: string | null }[];
}

export default function Sidebars({ email, socials = [] }: Props) {
  return (
    <>
      {/* Left Fixed Social Sidebar */}
      <div className="hidden lg:flex fixed bottom-0 left-10 z-40 flex-col items-center gap-5 text-[#a8b2d1]">
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

      {/* Right Fixed Email Sidebar */}
      {email && (
        <div className="hidden lg:flex fixed bottom-0 right-10 z-40 flex-col items-center gap-6 text-[#a8b2d1]">
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs tracking-widest hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200 [writing-mode:vertical-rl]"
          >
            {email}
          </a>
          <div className="w-[1px] h-24 bg-[#a8b2d1]/40 mt-2" />
        </div>
      )}
    </>
  );
}
