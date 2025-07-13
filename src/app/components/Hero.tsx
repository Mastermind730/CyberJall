'use client';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';

interface Slide {
  title: string;
  description: string;
  color: string;
  image: string;
  textColor: string;
}

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const slides = useMemo<Slide[]>(() => [
    {
      title: 'Find & Customize Trusted Cybersecurity Services in One Place',
      description: 'A marketplace where businesses can explore, compare, and bundle cybersecurity services effortlessly.',
      color: 'from-purple-600 to-blue-600',
      image: "/image (1).png",
      textColor: 'from-white to-orange-400'
    },
    {
      title: 'Cybersecurity, Reimagined – A Smarter Way to Protect Your Business',
      description: 'Simplifying cybersecurity services with a marketplace that offers flexibility, transparency, and trusted expertise',
      color: 'from-red-600 to-pink-600',
      image: "/image (2).png",
      textColor: 'from-white to-green-400'
    },
    {
      title: 'Your Cybersecurity, Your Way – Build, Bundle & Protect with Experts',
      description: 'Customize cybersecurity services from multiple trusted providers and manage them effortlessly through one unified platform.',
      color: 'from-green-600 to-teal-600',
      image: "/image (3).png",
      textColor: 'from-white to-orange-500'
    }
  ], []);

  // Handle client-side rendering detection
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
    <div className="relative w-full overflow-hidden bg-gray-900 min-h-screen">
      <div className="">
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Full Width Background Image - No Blur */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slides[currentSlide].image} 
              alt="Cybersecurity background"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* SVG Background Pattern - Subtle */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Slide Content */}
          <div className="relative z-10 px-6 max-w-6xl mx-auto">
            <div className={`transition-all duration-500 ${isClient && isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              <div className={`h-2 w-20 mb-8 rounded-full bg-gradient-to-r ${slides[currentSlide].color}`} />
              
              {/* Colorful Gradient Text */}
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r ${slides[currentSlide].textColor} bg-clip-text text-transparent`}>
                {slides[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl leading-relaxed">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className={`bg-gradient-to-r ${slides[currentSlide].color} text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-current/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}>
                  Discover More
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Vector Graphics - Simplified */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path 
                fill={`url(#gradient-${currentSlide})`} 
                d="M47.6,-61.3C60.6,-50.1,69.6,-33.9,74.6,-16.2C79.6,1.5,80.6,20.8,72.3,34.7C64,48.6,46.5,57.1,29.3,62.9C12.2,68.7,-4.7,71.7,-21.9,68.3C-39.1,64.9,-56.5,55,-67.9,39.5C-79.3,24,-84.6,2.9,-81.1,-16.9C-77.7,-36.7,-65.3,-55.3,-49.3,-65.9C-33.2,-76.4,-13.6,-78.9,2.9,-82.4C19.4,-85.9,34.7,-72.5,47.6,-61.3Z" 
                transform="translate(100 100)" 
              />
              <defs>
                <linearGradient id="gradient-0" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="gradient-1" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
                <linearGradient id="gradient-2" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`relative w-16 h-2 rounded-full transition-all duration-300 overflow-hidden ${
                  currentSlide === index ? 'w-24 bg-transparent' : 'bg-white/30'
                }`}
                onClick={() => handleDotClick(index)}
              >
                {isClient && currentSlide === index && (
                  <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${slides[index].color} animate-progress`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animation classes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        .animate-progress {
          animation: progress 6s linear;
        }
      `}} />
    </div>
  );
};