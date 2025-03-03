'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { FC } from 'react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: '/hero1.svg',
      title: 'Cyber Security Solutions for Critical Infrastructure',
      description: 'Protecting your digital assets with advanced security measures and expert consultation.'
    },
    {
      image: '/hero2.svg',
      title: 'Bug Bounty Programs',
      description: 'Connect with skilled security researchers to identify and fix vulnerabilities.'
    },
    {
      image: '/hero3.svg',
      title: 'Penetration Testing Services',
      description: 'Comprehensive security assessments to protect your organization.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {slide.description}
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-red-700 transition-colors">
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
  );
}; 