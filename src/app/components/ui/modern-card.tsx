"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ModernCardProps {
  children: React.ReactNode;
  variant?: "default" | "pro" | "service" | "feature" | "glass" | "glow";
  className?: string;
  hover?: boolean;
  animated?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = "default",
  className,
  hover = true,
  animated = true,
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden transition-all duration-500 ease-out";

  const variants = {
    default:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg",
    pro: "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-red-500/20",
    service:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:border-red-500/30 hover:-translate-y-2 cursor-pointer hover:shadow-2xl hover:shadow-red-500/10",
    feature:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:bg-gray-800/60 hover:border-red-500/20",
    glass:
      "bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-white/[0.04] hover:border-red-500/30",
    glow: "bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-red-500/20 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.2)] hover:border-red-500/40",
  };

  const hoverStyles = hover ? "hover:scale-[1.02] hover:shadow-xl" : "";

  const CardWrapper = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      }
    : {};

  return (
    <CardWrapper
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...animationProps}
      {...props}
    >
      {/* Animated gradient border effect */}
      {hover && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 blur-sm"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </CardWrapper>
  );
};

export { ModernCard };
