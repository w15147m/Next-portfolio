import type { PortfolioUser } from "../types";

export default function HeroSection({ user }: { user: PortfolioUser }) {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 sm:px-12 lg:px-24 pt-20">
      <div className="flex flex-col items-start max-w-3xl">
        <h1 className="font-mono text-[#64ffda] text-sm sm:text-base mb-5 tracking-wide">
          Hi, my name is
        </h1>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#ccd6f6] tracking-tight leading-none mb-3">
          {user.name || "Brittany Chiang."}
        </h2>
        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#8892b0] tracking-tight leading-none mb-7">
          I build things for the web.
        </h3>
        <p className="text-[#8892b0] text-base sm:text-lg max-w-xl leading-relaxed mb-12">
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
        </p>

        <a
          href="https://www.newline.co/courses/build-a-spotify-connected-app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-5 border border-[#64ffda] text-[#64ffda] font-mono text-sm rounded hover:bg-[#64ffda]/10 transition duration-300"
        >
          Check out my course!
        </a>
      </div>
    </section>
  );
}
