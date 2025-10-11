"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ModernSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "gradient" | "grid";
  spacing?: "sm" | "md" | "lg";
}

const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  className,
  background = "default",
  spacing = "md",
  ...props
}) => {
  const backgrounds = {
    default: "bg-black",
    gradient: "bg-gradient-to-b from-black to-gray-950/50",
    grid: "bg-black relative overflow-hidden",
  };

  const spacings = {
    sm: "py-8",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-20",
  };

  return (
    <section
      className={cn(
        backgrounds[background],
        spacings[spacing],
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {background === "grid" && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {children}
      </div>
    </section>
  );
};

export { ModernSection };
