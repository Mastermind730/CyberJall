'use client';
import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';

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

  const slides = useMemo<Slide[]>(() => [
    {
      title: 'Find & Customize Trusted Cybersecurity Services',
      description: 'A marketplace where businesses explore, compare, and bundle cybersecurity services effortlessly',
      color: 'from-purple-600 to-blue-600',
      textColor: 'from-white to-orange-400',
      highlights: [
        'Verified Providers',
        'Custom Bundles',
        'Transparent Pricing'
      ]
    },
    {
      title: 'Cybersecurity, Reimagined',
      description: 'Simplifying protection with a marketplace offering flexibility and trusted expertise',
      color: 'from-red-600 to-pink-600',
      textColor: 'from-white to-green-400',
      highlights: [
        'AI Matching',
        'Expert Reviews',
        'Risk Assessment'
      ]
    },
    {
      title: 'Your Cybersecurity, Your Way',
      description: 'Customize services from multiple providers through one unified platform',
      color: 'from-green-600 to-teal-600',
      textColor: 'from-white to-orange-500',
      highlights: [
        'Single Dashboard',
        'Performance Metrics',
        '24/7 Support'
      ]
    }
  ], []);

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
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20" />
        </div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[10, 30, 50, 70, 90].map((position) => (
            <div 
              key={position}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${position}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Slide Content */}
        <div className="relative z-10 px-6 max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-500 ${isClient && isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            {/* Animated tagline */}
            <div className="inline-block overflow-hidden">
              <span className={`inline-block text-sm font-medium tracking-wider mb-8 bg-gradient-to-r ${slides[currentSlide].color} text-transparent bg-clip-text animate-fadeIn`}>
                ENTERPRISE CYBERSECURITY PLATFORM
              </span>
            </div>
            
            {/* Main headline */}
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r ${slides[currentSlide].textColor} bg-clip-text text-transparent animate-slideUp`}>
              {slides[currentSlide].title}
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed animate-slideUp delay-100">
              {slides[currentSlide].description}
            </p>
            
            {/* Highlights */}
            <div className="flex justify-center gap-4 mb-12 animate-slideUp delay-200">
              {slides[currentSlide].highlights.map((highlight, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-200 border border-white/10 text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="animate-slideUp delay-300">
              <button className={`relative overflow-hidden group bg-gradient-to-r ${slides[currentSlide].color} text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300`}>
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
              </button>
            </div>
          </div>
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

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .animate-progress {
          animation: progress 6s linear;
        }
      `}</style>
    </div>
  );
};