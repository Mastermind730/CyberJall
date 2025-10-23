"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set minimum loading time to show smooth animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Logo and loading animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="relative animate-pulse">
          <Image
            src="/main_logo.svg"
            alt="CyberJall"
            width={200}
            height={60}
            priority
            className="w-48 md:w-56 h-auto"
          />
        </div>

        {/* Loading spinner */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
