"use client";

import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const LOADER_DELAY = 2000;
const NAV_DELAY = 100;

const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const mountTimeout = setTimeout(() => setIsMounted(true), NAV_DELAY);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(mountTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const STAGGER = LOADER_DELAY;

  // Fade-down entrance animation style matching reference
  const headerAnimStyle: React.CSSProperties = {
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(-20px)",
    transition: isMounted
      ? `opacity 400ms cubic-bezier(0.645, 0.045, 0.355, 1) ${STAGGER}ms, transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) ${STAGGER}ms`
      : "none",
  };

  return (
    <header
      style={headerAnimStyle}
      className={`sticky top-0 z-99999 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0a192f]/90 backdrop-blur-lg border-b border-[#233554] shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1 font-mono">
        <div className={cn("fixed inset-x-0 top-5 z-50 mx-auto max-w-2xl")}>
          <Menu setActive={setActive}>
            <Link
              href="/"
              className="font-bold flex text-xl text-[#ccd6f6] tracking-tight hover:text-[#64ffda] transition-colors"
            >
              <MenuItem setActive={setActive} active="active" item="WA" />
              <span className="text-[#64ffda]">.</span>
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-mono text-[#a8b2d1] hover:text-[#64ffda] transition-colors"
              >
                <MenuItem setActive={setActive} active={active} item={link.label} />
              </a>
            ))}
          </Menu>
        </div>
      </nav>

      {/* Right side */}
      <div className="md:hidden flex justify-end items-center gap-3 max-w-6xl mx-auto px-6 h-16">
        <button
          className="p-2 rounded-lg text-[#a8b2d1] hover:bg-[#112240] hover:text-[#64ffda] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#233554] bg-[#0a192f] px-6 py-4 space-y-1 font-mono">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm text-[#a8b2d1] hover:bg-[#112240] hover:text-[#64ffda] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-center border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
