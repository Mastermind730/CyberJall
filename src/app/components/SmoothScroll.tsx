"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for DOM to be fully loaded
    setIsReady(true);

    // Initialize Lenis with a slight delay to prevent black screen
    const initTimer = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoResize: true,
      });

      lenisRef.current = lenis;

      // Animation frame loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className={isReady ? "opacity-100" : "opacity-0"}
      style={{ transition: "opacity 0.3s ease-in" }}
    >
      {children}
    </div>
  );
}
