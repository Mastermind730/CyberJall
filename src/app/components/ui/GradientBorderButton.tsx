import React from "react";
import Link from "next/link";

interface GradientBorderButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const GradientBorderButton: React.FC<GradientBorderButtonProps> = ({
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  const buttonContent = (
    <>
      {/* Outer border line with spacing */}
      <span
        className="absolute rounded-2xl pointer-events-none"
        style={{
          inset: "-8px",
          padding: "2px",
          background: "linear-gradient(to right, #ef4444, #f97316, #ef4444)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center text-white">
        {children}
      </span>
    </>
  );

  const baseStyles = `group relative px-6 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:scale-105 ${
    fullWidth ? "w-full" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  const inlineStyles = {
    background: "transparent",
    border: "2px solid transparent",
    backgroundImage:
      "linear-gradient(black, black), linear-gradient(to right, #ef4444, #f97316, #ef4444)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
  };

  if (href) {
    return (
      <Link href={href} className={baseStyles} style={inlineStyles}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      style={inlineStyles}
    >
      {buttonContent}
    </button>
  );
};

export default GradientBorderButton;
