"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ModernCardProps {
  children: React.ReactNode;
  variant?: "default" | "pro" | "service" | "feature";
  className?: string;
  hover?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = "default",
  className,
  hover = true,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300";

  const variants = {
    default:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg",
    pro: "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-red-500/5",
    service:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:border-red-500/20 hover:-translate-y-1 cursor-pointer",
    feature:
      "bg-gray-900/60 border border-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:bg-gray-800/40",
  };

  const hoverStyles = hover ? "hover:shadow-lg hover:border-red-500/10" : "";

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { ModernCard };
