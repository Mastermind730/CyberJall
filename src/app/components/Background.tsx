"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DynamicBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Floating red particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-900/20 blur-[80px]"
          style={{
            top: `${Math.random() * 120 - 10}%`,
            left: `${Math.random() * 120 - 10}%`,
            width: `${Math.random() * 500 + 100}px`,
            height: `${Math.random() * 500 + 100}px`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 30 + Math.random() * 40,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Binary code grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}