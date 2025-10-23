"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ModernButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onAnimationStart'
    | 'onAnimationEnd'
  > {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow" | "shimmer";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_100%] text-white hover:bg-right hover:shadow-2xl hover:shadow-red-500/30 focus:ring-red-500 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm text-gray-300 hover:border-red-500/50 hover:text-white hover:bg-gray-800/70 hover:shadow-lg hover:shadow-red-500/10 focus:ring-gray-600",
    outline:
      "border-2 border-red-500/40 bg-transparent text-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-red-500/30 focus:ring-red-500",
    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm focus:ring-gray-500",
    glow: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] hover:-translate-y-1 focus:ring-red-500",
    shimmer:
      "bg-gradient-to-r from-red-500 via-orange-500 via-red-600 to-red-500 bg-[length:300%_100%] text-white animate-shimmer hover:shadow-2xl hover:shadow-red-500/40 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-3.5 text-base rounded-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Shine effect overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export { ModernButton };
