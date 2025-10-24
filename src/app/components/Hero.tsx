"use client";
import { useState, useEffect, useMemo } from "react";
import type { FC } from "react";
// import { ModernButton } from "./ui/modern-button";
import MarketplaceButton from "./ui/MarketplaceButton";
import Link from "next/link";

interface Slide {
  title: string;
  description: string;
  color: string;
  textColor: string;
  highlights: string[];
}

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const slides = useMemo<Slide[]>(
    () => [
      {
        title: "Cybersecurity Marketplace",
        description:
          "Connect with verified cybersecurity providers, compare services, and build custom security solutions for your business",
        color: "from-red-500 to-orange-500",
        textColor: "from-white to-red-300",
        highlights: [
          "Verified Providers",
          "Compare Services",
          "Custom Bundles",
        ],
      },
      {
        title: "Trusted Security Solutions",
        description:
          "Browse curated cybersecurity services from top-rated providers with transparent pricing and reviews",
        color: "from-orange-500 to-red-600",
        textColor: "from-white to-orange-300",
        highlights: [
          "Transparent Pricing",
          "Provider Reviews",
          "Service Ratings",
        ],
      },
      {
        title: "One Platform, Multiple Providers",
        description:
          "Streamline your security procurement with our unified marketplace dashboard and management tools",
        color: "from-red-600 to-orange-600",
        textColor: "from-white to-red-200",
        highlights: [
          "Unified Dashboard",
          "Service Management",
          "Procurement Tools",
        ],
      },
    ],
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isClient]);

  const handleDotClick = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-full overflow-hidden bg-black h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full">
        {/* Video Background - reduced opacity for better text visibility */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Strong dark overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/85 to-black/90 animate-gradient-shift" />

        {/* Additional vignette effect for even better text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />

        {/* Animated scanline effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-32 animate-scan" />
        </div>

        {/* Enhanced grid pattern with animation */}
        <div
          className="absolute inset-0 opacity-5 animate-grid-flow"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating elements with enhanced glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[5, 75, 45, 35, 65].map((position, index) => (
            <div
              key={position}
              className="absolute rounded-full animate-float-gentle"
              style={{
                width: `${120 + index * 40}px`,
                height: `${120 + index * 40}px`,
                left: `${position}%`,
                top: `${25 + index * 15}%`,
                background: `radial-gradient(circle, rgba(239, 68, 68, ${
                  0.2 - index * 0.05
                }) 0%, rgba(251, 146, 60, ${
                  0.15 - index * 0.04
                }) 50%, transparent 80%)`,
                filter: "blur(40px)",
                animationDelay: `${index * 0.7}s`,
                animationDuration: `${8 + index * 2}s`,
              }}
            />
          ))}

          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Animated border light effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-border-flow" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Content positioning wrapper - adjust translate-y to move content up/down */}
          <div className="transform -translate-y-15">
            <div
              className={`transition-all duration-700 ease-out ${
                isClient && isAnimating
                  ? "opacity-0 translate-y-8 scale-95"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {/* Enhanced headline with premium gradient and text shadow */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-14 leading-[1.1] tracking-wider">
                <span
                  className="inline-block animate-slide-up"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px #ef4444",
                    textShadow:
                      "0 4px 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(251, 146, 60, 0.2)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {slides[currentSlide].title}
                </span>
              </h1>

              {/* Enhanced description with premium styling */}
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up font-normal tracking-wide"
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  animationDelay: "0.1s",
                }}
              >
                {slides[currentSlide].description}
              </p>

              {/* Premium highlights with glassmorphism */}
              <div
                className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                {slides[currentSlide].highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-black/70 to-black/50 border border-gray-500/40 rounded-full text-gray-100 text-xs sm:text-sm font-bold hover:scale-105 transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-red-500/30 cursor-default overflow-hidden"
                  >
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Premium CTA Buttons with enhanced effects */}
              <div
                className="animate-slide-up flex flex-col sm:flex-row justify-center gap-4 mb-12"
                style={{ animationDelay: "0.3s" }}
              >
                <Link href="/cyberrequirements">
                  <button
                    className="group relative px-6 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "transparent",
                      border: "2px solid transparent",
                      backgroundImage:
                        "linear-gradient(black, black), linear-gradient(to right, #ef4444, #f97316, #ef4444)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }}
                  >
                    {/* Outer border line with spacing */}
                    <span
                      className="absolute rounded-2xl pointer-events-none"
                      style={{
                        inset: "-7px",
                        padding: "2px",
                        background:
                          "linear-gradient(to right, #ef4444, #f97316, #ef4444)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* Content */}
                    <span className="relative z-10 flex items-center text-white">
                      Get Started Today
                      <svg
                        className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>

              {/* Premium Navigation Dots */}
              <div
                className="flex items-center justify-center space-x-4 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`relative transition-all duration-500 overflow-hidden group ${
                      currentSlide === index
                        ? "w-12 h-3"
                        : "w-3 h-3 hover:scale-110"
                    }`}
                    onClick={() => handleDotClick(index)}
                  >
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        currentSlide === index
                          ? "border-2 border-red-500 bg-transparent shadow-lg shadow-red-500/40"
                          : "border border-gray-600/50 bg-transparent group-hover:border-gray-500 backdrop-blur-sm"
                      }`}
                    />
                    {currentSlide === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-shimmer-fast rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animation styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-30px) translateX(20px) scale(1.05);
          }
          66% {
            transform: translateY(-15px) translateX(-20px) scale(0.95);
          }
        }
        .animate-float-gentle {
          animation: float-gentle 12s ease-in-out infinite;
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 2s ease-in-out infinite;
        }
        @keyframes border-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-border-flow {
          animation: border-flow 3s linear infinite;
        }
        @keyframes grid-flow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
