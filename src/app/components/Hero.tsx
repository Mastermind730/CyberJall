'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import type { FC } from 'react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo<Slide[]>(() => [
    {
      image: '/1.jpg',
      title: 'Find & Customize Trusted Cybersecurity Services in One Place',
      description: ' A marketplace where businesses can explore, compare, and bundle cybersecurity services effortlessly.'
    },
    {
      image: '/2.jpg',
      title: 'Cybersecurity, Reimagined – A Smarter Way to Protect Your Business',
      description: 'Simplifying cybersecurity services with a marketplace that offers flexibility, transparency, and trusted expertise'
    },
    {
      image: '/3.jpg',
      title: 'Your Cybersecurity, Your Way – Build, Bundle & Protect with Experts',
      description: 'Customize cybersecurity services from multiple trusted providers and manage them effortlessly through one unified platform..'
    }
  ], []); // Empty dependency array means this will only be calculated once
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <div className="pt-16"> {/* Container for top spacing to account for navbar */}
        <div className="relative h-[70vh] max-w-7xl mx-auto overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center max-w-4xl px-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-6">
                    {slide.description}
                  </p>
                  <button className="bg-red-600 text-white px-6 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-red-600' : 'bg-white'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 