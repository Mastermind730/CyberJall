/* eslint-disable @typescript-eslint/no-unused-vars */
// components/GlobalLayout.tsx
"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse position tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatFast: {
      y: [0, -25, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        
        {/* Animated stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating cosmic elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
          // variants={floatingVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"
          // variants={floatingVariants}
          animate="floatFast"
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}