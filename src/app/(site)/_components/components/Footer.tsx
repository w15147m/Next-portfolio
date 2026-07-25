import type { PortfolioUser } from "../types";

export default function Footer({ user }: { user: PortfolioUser }) {
  return (
    <footer className="py-8 border-t border-[#233554] bg-[#0a192f] text-[#8892b0] font-mono text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-[#ccd6f6]">{user.name}</span>. All
          rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {user.socials.map((s) => (
            <a key={s.id} href={s.link || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#64ffda] transition-colors">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
