"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ModernButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/20 focus:ring-red-500",
    secondary:
      "border border-gray-700 bg-transparent text-gray-300 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 focus:ring-gray-600",
    outline:
      "border border-red-500/30 bg-transparent text-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white hover:border-transparent focus:ring-red-500",
    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-gray-800/30 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { ModernButton };
