"use client";

import { useState, useEffect } from "react";
import type { PortfolioUser } from "../types";

const NAV_DELAY = 1000;

export default function HeroSection({ user }: { user: PortfolioUser }) {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), NAV_DELAY);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const ratio = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setScrollProgress(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Subtle 3D push-back into screen (scales slightly down to 0.85, doesn't shrink too small)
  const scale = 1 - scrollProgress * 0.15;
  const translateZ = -scrollProgress * 150;
  const opacity = 1 - scrollProgress * 0.85;

  const items = [
    <h1
      key="greeting"
      className="font-mono text-[#64ffda] text-base sm:text-lg mb-6 tracking-wide"
    >
      Hi, my name is
    </h1>,

    <h2
      key="name"
      className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[#ccd6f6] tracking-tight leading-none mb-4"
    >
      {user.name || "Brittany Chiang."}
    </h2>,

    <h3
      key="tagline"
      className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#8892b0] tracking-tight leading-none mb-8"
    >
      I build things for the web.
    </h3>,

    <p
      key="desc"
      className="text-[#8892b0] text-lg sm:text-xl max-w-2xl leading-relaxed mb-12"
    >
      {user.desc ||
        "I’m a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products at "}{" "}
      <a
        href="https://upstatement.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#64ffda] hover:underline"
      >
        Upstatement
      </a>
      .
    </p>,

    <a
      key="cta"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noopener noreferrer"
      className="px-8 py-5 border border-[#64ffda] text-[#64ffda] font-mono text-base rounded hover:bg-[#64ffda]/10 transition duration-300 inline-block"
    >
      Check out my course!
    </a>,
  ];

  return (
    <section
      id="hero"
      className="sticky top-0 min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 [perspective:1000px] z-0"
    >
      <div
        className="flex flex-col items-start max-w-4xl origin-center transition-transform ease-out duration-75"
        style={{
          transform: `scale(${scale}) translateZ(${translateZ}px)`,
          opacity: opacity,
        }}
      >
        {items.map((item, i) => {
          const delay = `${(i + 1) * 100}ms`;
          return (
            <div
              key={i}
              className="w-full"
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? "translateY(0px)" : "translateY(20px)",
                transition: isMounted
                  ? `opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${delay}, transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1) ${delay}`
                  : "none",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </section>
  );
}
