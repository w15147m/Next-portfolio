"use client";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  // { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-99999 w-full transition-all duration-300 ${scrolled
        ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-neutral-800 shadow-sm"
        : "bg-transparent"
        }`}
    >
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        <div
          className={cn(" fixed inset-x-0 top-5 z-50 mx-auto max-w-2xl")}
        >

          <Menu setActive={setActive}>
            <Link href="/" className="font-black flex text-xl text-gray-900 dark:text-white tracking-tight hover:text-brand-500 transition">
              <MenuItem setActive={setActive} active='active' item='WA' />
              <span className="text-brand-500">.</span>
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400transition"
              >
                <MenuItem setActive={setActive} active={active} item={link.label} />

              </a>

            ))}



          </Menu>
        </div>
      </nav>
      {/* Right side */}
      <div className="md:hidden flex justify-end items-center gap-3 max-w-6xl mx-auto px-6 h-16 flex items-center ">
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-brand-500 transition"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-center bg-brand-500 text-white hover:bg-brand-600 transition">
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
