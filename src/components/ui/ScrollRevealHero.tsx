'use client'

import { useEffect, useRef, useState, ReactNode } from 'react';

type ScrollRevealHeroProps = {
  /** Background image URL */
  image: string | null;
  /** Alt text for the background image */
  imageAlt?: string;
  /** Main title, e.g. <h1>MY BRAND</h1> — stays sharp throughout */
  title: ReactNode;
  /** Content revealed as the user scrolls (button, paragraphs, etc.) */
  children: ReactNode;
  /** How much scroll (px) it takes to fully transition. Default 400 */
  scrollDistance?: number;
  /** Max blur applied to the image at full progress (px). Default 12 */
  maxBlur?: number;
  /** Max darkness of the overlay at full progress (0-1). Default 0.55 */
  maxOverlayOpacity?: number;
};

export default function ScrollRevealHero({
  image,
  imageAlt = 'Hero background',
  title,
  children,
  scrollDistance = 400,
  maxBlur = 12,
  maxOverlayOpacity = 0.55,
}: ScrollRevealHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollDistance);
      setProgress(scrolled / scrollDistance);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDistance]);

  const blurAmount = progress * maxBlur;
  const overlayOpacity = progress * maxOverlayOpacity;
  const contentOpacity = progress;

  return (
    <div ref={containerRef} className="relative" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden ">
        {/* Background image */}
       {image && 
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: `blur(${blurAmount}px)`,
            transform: `scale(${1 + progress * 0.06})`,
            transition: 'transform 0.1s linear',
          }}
        />
       }

        {/* Dark overlay that increases on scroll */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          {/* Title stays sharp and fully visible */}
          <div
            className="text-white [&_*]:text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
          >
            {title}
          </div>

          {/* Reveal-on-scroll content */}
          <div
            className="mt-8 flex flex-col items-center gap-6 text-white"
            style={{ opacity: contentOpacity }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}