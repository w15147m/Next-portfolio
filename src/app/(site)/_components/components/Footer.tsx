import type { PortfolioUser } from "../types";

export default function Footer({ user }: { user: PortfolioUser }) {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-300">{user.name}</span>. All
          rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {user.socials.map((s) => (
            <a key={s.id} href={s.link || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
