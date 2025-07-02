"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Entity {
  id: number;
  name: string;
  logo: string;
  type: 'client' | 'partner';
  industry: string;
  featured?: boolean;
  testimonial?: string;
  since?: string;
}

const EntityShowcase: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'client' | 'partner'>('all');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const entities: Entity[] = [
    { 
      id: 1, 
      name: 'Food Vez', 
      logo: '/IMG-20250531-WA0000.jpg', 
      type: 'client', 
      industry: 'Food Tech',
      featured: true,
      testimonial: 'Revolutionized our digital presence',
      since: '2022'
    },
    { 
      id: 2, 
      name: 'EN Times', 
      logo: '/client1.jpg', 
      type: 'client', 
      industry: 'Media',
      featured: true,
      testimonial: 'Exceptional service delivery',
      since: '2021'
    },
    { 
      id: 3, 
      name: 'Business Legacy', 
      logo: '/client2.jpg', 
      type: 'client', 
      industry: 'Consulting',
      testimonial: 'Transformed our operations',
      since: '2023'
    },
    { 
      id: 4, 
      name: 'Paripoorna Foods', 
      logo: '/pariporna.png', 
      type: 'client', 
      industry: 'Food Tech',
      testimonial: 'Transformed our operations',
      since: '2023'
    },
    { 
      id: 5, 
      name: 'CyberArt', 
      logo: '/cyberart.png', 
      type: 'partner', 
      industry: 'Technology',
      featured: true,
      testimonial: 'Strategic partnership for growth',
      since: '2020'
    },
  ];

  const filteredEntities = activeType === 'all' 
    ? entities 
    : entities.filter(e => e.type === activeType);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      setCurrentIndex(prev => Math.min(filteredEntities.length - 1, prev + 1));
    }
  };

  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-700 to-red-900">
              Our Network
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'client', 'partner'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(type as any);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeType === type
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {type === 'all' ? 'All' : type === 'client' ? 'Clients' : 'Partners'}
            </button>
          ))}
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentIndex === filteredEntities.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-8 py-4 px-2 cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredEntities.map((entity, index) => (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-center"
              >
                <div className={`h-96 rounded-3xl overflow-hidden border transition-all ${
                  entity.type === 'client' 
                    ? 'border-cyan-500/30 hover:border-cyan-500/70' 
                    : 'border-purple-500/30 hover:border-purple-500/70'
                }`}>
                  <div className={`absolute inset-0 opacity-20 ${
                    entity.type === 'client' 
                      ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20' 
                      : 'bg-gradient-to-br from-purple-500/20 to-pink-600/20'
                  }`} />
                  
                  <div className="relative z-10 h-full flex flex-col p-8">
                    <div className="mb-6 flex justify-center">
                      <div className={`relative w-32 h-32 rounded-full ${
                        entity.type === 'client'
                          ? 'bg-cyan-900/30 border border-cyan-500/30'
                          : 'bg-purple-900/30 border border-purple-500/30'
                      } flex items-center justify-center backdrop-blur-sm`}>
                        <Image
                          src={entity.logo}
                          alt={entity.name}
                          width={110}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center flex-grow">
                      <h3 className="text-xl font-bold mb-2">{entity.name}</h3>
                      <div className={`text-sm font-medium mb-4 ${
                        entity.type === 'client' ? 'text-cyan-400' : 'text-purple-400'
                      }`}>
                        {entity.industry}
                      </div>
                      
                      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4" />
                      
                      {/* <p className="text-gray-300 text-sm mb-4 italic">
                        {entity.testimonial}
                      </p>
                      
                      <div className="text-xs text-gray-400">
                        Partner since {entity.since}
                      </div> */}
                    </div>
                    
                    {/* <div className={`mt-6 text-center text-xs font-bold ${
                      entity.type === 'client' ? 'text-cyan-400' : 'text-purple-400'
                    }`}>
                      {entity.type === 'client' ? 'VALUED CLIENT' : 'STRATEGIC PARTNER'}
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-32 bg-gradient-to-r from-black via-blue-900/30 to-black rounded-3xl border border-cyan-500/30 p-8 md:p-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                value: entities.filter(e => e.type === 'client').length, 
                label: 'Satisfied Clients',
                color: 'from-cyan-400 to-blue-500'
              },
              { 
                value: entities.filter(e => e.type === 'partner').length, 
                label: 'Strategic Partners',
                color: 'from-purple-400 to-pink-500'
              },
              { 
                value: new Set(entities.map(e => e.industry)).size, 
                label: 'Industries Served',
                color: 'from-cyan-400 to-purple-500'
              }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.value}+
                </div>
                <div className="text-lg text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityShowcase;