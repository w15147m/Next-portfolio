"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { number: "01.", label: "About", href: "#about" },
  { number: "02.", label: "Experience", href: "#experience" },
  { number: "03.", label: "Work", href: "#projects" },
  { number: "04.", label: "Contact", href: "#contact" },
];

const LOADER_DELAY = 2000;
const NAV_DELAY = 100;

export default function SiteHeader() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mountTimeout = setTimeout(() => setIsMounted(true), NAV_DELAY);
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolledToTop(y < 50);
      if (y < lastY) {
        setScrollDirection("up");
      } else if (y > lastY && y > 50) {
        setScrollDirection("down");
      }
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(mountTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const STAGGER = LOADER_DELAY;

  // Logo: fade in
  const logoStyle: React.CSSProperties = {
    opacity: isMounted ? 1 : 0,
    transition: `opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${STAGGER}ms`,
  };

  // Nav links: fadedown (slide from top, staggered)
  const linkStyle = (i: number): React.CSSProperties => {
    const delay = `${STAGGER + i * 100}ms`;
    return {
      opacity: isMounted ? 1 : 0,
      transform: isMounted ? "translateY(0)" : "translateY(-20px)",
      transition: isMounted
        ? `opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${delay}, transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${delay}`
        : "none",
    };
  };

  // Resume button: last item
  const resumeDelay = `${STAGGER + navLinks.length * 100}ms`;
  const resumeStyle: React.CSSProperties = {
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(-20px)",
    transition: isMounted
      ? `opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${resumeDelay}, transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${resumeDelay}`
      : "none",
  };

  const headerTransform =
    scrollDirection === "down" && !scrolledToTop
      ? "translateY(-100%)"
      : "translateY(0)";

  const headerShadow = !scrolledToTop
    ? "0 10px 30px -10px rgba(2,12,27,0.7)"
    : "none";

  const headerBg = !scrolledToTop
    ? "rgba(10, 25, 47, 0.85)"
    : "rgba(10, 25, 47, 0)";

  return (
    <header
      style={{
        transform: headerTransform,
        boxShadow: headerShadow,
        backgroundColor: headerBg,
        backdropFilter: "blur(10px)",
        transition:
          "transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1), background-color 300ms cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 300ms cubic-bezier(0.645, 0.045, 0.355, 1)",
        height: scrolledToTop ? "100px" : "70px",
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full flex items-center px-6 sm:px-10 lg:px-[50px]"
    >
      <nav className="w-full flex items-center justify-between font-mono">
        {/* Logo — hex + B letter matching v4-main */}
        <div style={logoStyle}>
          <a
            href="/"
            aria-label="home"
            className="group relative w-[42px] h-[42px] flex items-center justify-center text-[#64ffda] transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
          >
            <span className="absolute inset-0 z-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 84 96"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polygon
                  points="39 5 74 25 74 70 39 90 4 70 4 25"
                  stroke="#64ffda"
                  fill="none"
                />
              </svg>
            </span>
            <span className="relative z-10 text-[#64ffda] font-bold text-xl">
              B
            </span>
          </a>
        </div>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-2">
          <ol className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link, i) => (
              <li key={link.href} style={linkStyle(i)} className="m-0">
                <a
                  href={link.href}
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-200 text-xs px-2.5 py-2.5 flex items-center gap-1"
                >
                  <span className="text-[#64ffda] text-[11px]">
                    {link.number}
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ol>

          <div style={resumeStyle}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2.5 border border-[#64ffda] text-[#64ffda] text-xs rounded hover:bg-[#64ffda]/10 transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-[#64ffda] hover:bg-[#112240] rounded transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={resumeStyle}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-b border-[#233554] bg-[#112240] px-6 py-6 space-y-4 font-mono text-sm text-[#ccd6f6]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-[#64ffda] transition py-1"
            >
              <span className="text-[#64ffda] mr-2">{link.number}</span>
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-4 py-3 border border-[#64ffda] text-[#64ffda] rounded text-xs hover:bg-[#64ffda]/10 transition mt-4"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
