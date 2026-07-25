"use client";

import { useEffect, useRef } from "react";

interface RevealOptions {
  delay?: number;
  distance?: string;
  duration?: number;
  easing?: string;
  viewFactor?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const {
      delay = 200,
      distance = "20px",
      duration = 500,
      easing = "cubic-bezier(0.645, 0.045, 0.355, 1)",
      viewFactor = 0.15,
    } = options;

    // Set hidden initial state matching srConfig from v4-main
    el.style.opacity = "0";
    el.style.transform = `translateY(${distance})`;
    el.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: viewFactor }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
