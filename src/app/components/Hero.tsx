'use client';
import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';

interface Slide {
  title: string;
  description: string;
  color: string;
}

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fixed positions for particles to avoid hydration mismatch
  const particlePositions = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    size: 5 + (i % 5),
    left: (i * 5) % 100,
    top: (i * 7) % 100,
    duration: 10 + (i % 10),
    delay: i % 20
  })), []);

  const slides = useMemo<Slide[]>(() => [
    {
      title: 'Find & Customize Trusted Cybersecurity Services in One Place',
      description: 'A marketplace where businesses can explore, compare, and bundle cybersecurity services effortlessly.',
      color: 'from-purple-600 to-blue-600'
    },
    {
      title: 'Cybersecurity, Reimagined – A Smarter Way to Protect Your Business',
      description: 'Simplifying cybersecurity services with a marketplace that offers flexibility, transparency, and trusted expertise',
      color: 'from-red-600 to-pink-600'
    },
    {
      title: 'Your Cybersecurity, Your Way – Build, Bundle & Protect with Experts',
      description: 'Customize cybersecurity services from multiple trusted providers and manage them effortlessly through one unified platform.',
      color: 'from-green-600 to-teal-600'
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

  const handleDotClick = (index:number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 min-h-screen">
      <div className="pt-16">
        <div className="relative h-screen max-w-7xl mx-auto overflow-hidden flex items-center justify-center">
          {/* SVG Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="radialGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              <circle cx="50" cy="50" r="50" fill="url(#radialGradient)" />
            </svg>
          </div>

          {/* Animated SVG Elements - Only rendered client-side */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden">
              {particlePositions.map((particle, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white opacity-10"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animation: `float ${particle.duration}s linear infinite`,
                    animationDelay: `${particle.delay}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Slide Content */}
          <div className="relative z-10 px-6 max-w-4xl">
            <div className={`transition-all duration-500 ${isClient && isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              <div className={`h-2 w-20 mb-8 rounded-full bg-gradient-to-r ${slides[currentSlide].color}`} />
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className={`bg-gradient-to-r ${slides[currentSlide].color} text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-current/30 transition-all duration-300 transform hover:-translate-y-1`}>
                  Discover More
                </button>
                
               
              </div>
            </div>
          </div>

          {/* Decorative Vector Graphics */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
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

          {/* Connection Lines - Cybersecurity Visual Metaphor */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M10,30 Q50,10 90,40" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.2" 
                fill="none"
                className="animate-pulse"
              />
              <path 
                d="M20,80 Q40,60 80,70" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.2" 
                fill="none"
                className="animate-pulse"
              />
              <path 
                d="M30,20 Q60,50 70,20" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.2" 
                fill="none" 
                className="animate-pulse"
              />
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

      {/* Animation classes using Tailwind instead of JSX styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
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