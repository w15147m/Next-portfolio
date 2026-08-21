"use client";

import Image from "next/image";
import type { PortfolioUser } from "../types";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AboutSection({ user }: { user: PortfolioUser }) {
  const sectionRef = useScrollReveal<HTMLElement>({ delay: 200 });

  const skills = [
    "Laravel",
    "Vue",
    "MySQL",
    "React",
    "Next.js",
    "JavaScript (ES6+)",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Title with number prefix and longer trailing line */}
      <div className="flex items-center gap-4 mb-12 whitespace-nowrap">
        <span className="font-mono text-[#64ffda] text-xl sm:text-2xl font-normal">01.</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#ccd6f6]">About Me</h2>
        <div className="h-[1px] bg-[#233554] flex-1 max-w-md ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left Bio Text (7 cols) */}
        <div className="md:col-span-7 text-[#8892b0] text-base sm:text-lg leading-relaxed space-y-5">
          <p>
            {user.desc ||
              "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!"}
          </p>

          <p>
            Fast-forward to today, and I’ve had the privilege of working at{" "}
            <a href="https://us.mullenlowe.com/" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              an advertising agency
            </a>
            ,{" "}
            <a href="https://starry.com/" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              a start-up
            </a>
            ,{" "}
            <a href="https://www.apple.com/" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              a huge corporation
            </a>
            , and{" "}
            <a href="https://scout.camd.northeastern.edu/" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              a student-led design studio
            </a>
            . My main focus these days is building accessible, inclusive products and digital experiences at{" "}
            <a href="https://upstatement.com/" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              Upstatement
            </a>{" "}
            for a variety of clients.
          </p>

          <p>
            I also recently{" "}
            <a href="https://www.newline.co/courses/build-a-spotify-connected-app" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:underline">
              launched a course
            </a>{" "}
            that covers everything you need to build a web app with the Spotify API using Node & React.
          </p>

          <p>Here are a few technologies I’ve been working with recently:</p>

          <ul className="grid grid-cols-2 gap-y-3 gap-x-6 font-mono text-sm text-[#8892b0] pt-2">
            {skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="text-[#64ffda] text-xs">▹</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image (5 cols) — Larger size matching max-w-6xl container */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative w-72 sm:w-80 max-w-[340px] group">
            {/* Main Wrapper */}
            <div className="relative block w-full rounded bg-[#64ffda] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5">
              {/* Screen mix-blend layer */}
              <div className="absolute top-0 left-0 w-full h-full rounded bg-[#0a192f] mix-blend-screen transition-all duration-300 pointer-events-none group-hover:opacity-0" />

              {/* Image */}
              <Image
                src={user.image || "https://raw.githubusercontent.com/bchiang7/v4/main/src/images/me.jpg"}
                alt={user.name || "Headshot"}
                width={500}
                height={500}
                className="relative rounded block w-full h-auto mix-blend-multiply filter grayscale contrast-100 transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal"
                unoptimized
              />

              {/* Always visible offset border frame */}
              <div className="absolute top-[16px] left-[16px] w-full h-full rounded border-2 border-[#64ffda]/80 -z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-[#64ffda] group-hover:shadow-[0_0_20px_rgba(100,255,218,0.25)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
