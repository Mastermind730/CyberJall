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
    <div className="relative w-full overflow-hidden bg-black min-h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Enhanced gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-gray-900/60" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[15, 75].map((position, index) => (
            <div
              key={position}
              className="absolute rounded-full bg-gradient-to-r from-red-500/8 to-orange-500/8 backdrop-blur-sm animate-float-gentle"
              style={{
                width: `${80 + index * 30}px`,
                height: `${80 + index * 30}px`,
                left: `${position}%`,
                top: `${25 + index * 25}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div
            className={`transition-all duration-700 ease-out ${
              isClient && isAnimating
                ? "opacity-0 translate-y-8"
                : "opacity-100 translate-y-0"
            }`}
          >
            {/* Enhanced headline with better gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent animate-slide-up">
                {slides[currentSlide].title}
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-90">
              {slides[currentSlide].description}
            </p>

            {/* Enhanced highlights with better styling */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
              {slides[currentSlide].highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-black/30 border border-gray-700/50 rounded-full text-gray-200 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/40 hover:text-white transition-all duration-300 backdrop-blur-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Enhanced CTA Buttons with better spacing */}
            <div className="animate-slide-up flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/cyberrequirements">
                <MarketplaceButton
                  size="lg"
                  className="group px-8 py-4 text-lg"
                >
                  Get Started Today
                  <svg
                    className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </MarketplaceButton>
              </Link>

              <Link href="#demo">
                <MarketplaceButton
                  variant="secondary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Watch Demo
                </MarketplaceButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative h-3 rounded-full transition-all duration-300 overflow-hidden ${
              currentSlide === index
                ? "w-10 bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/25"
                : "w-3 bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      {/* Enhanced Animation styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float-gentle {
          animation: float-gentle 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
