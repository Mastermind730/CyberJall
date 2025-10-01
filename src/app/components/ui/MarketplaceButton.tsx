import React from "react";
import { cn } from "@/lib/utils";

interface MarketplaceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

const MarketplaceButton: React.FC<MarketplaceButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

  const variantClasses = {
    primary:
      "text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:ring-red-500 shadow-lg hover:shadow-xl",
    secondary:
      "text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-gray-500 focus:ring-gray-500",
    outline:
      "text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500",
    ghost:
      "text-gray-400 hover:text-white hover:bg-gray-800/50 focus:ring-gray-500",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
      )}
      {children}
    </button>
  );
};

export default MarketplaceButton;
