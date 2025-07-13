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
  const [activeType, setActiveType] = useState<'client' | 'partner'>('client');
  const carouselRef = useRef<HTMLDivElement>(null);
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
      since: '2022'
    },
    { 
      id: 2, 
      name: 'EN Times', 
      logo: '/client1.jpg', 
      type: 'client', 
      industry: 'Media',
      since: '2021'
    },
    { 
      id: 3, 
      name: 'Business Legacy', 
      logo: '/client2.jpg', 
      type: 'client', 
      industry: 'Consulting',
      since: '2023'
    },
    { 
      id: 4, 
      name: 'Paripoorna Foods', 
      logo: '/pariporna.png', 
      type: 'client', 
      industry: 'Food Tech',
      since: '2023'
    },
    { 
      id: 5, 
      name: 'CyberArt', 
      logo: '/cyberart.png', 
      type: 'partner', 
      industry: 'Technology',
      since: '2020'
    },
  ];

  const filteredEntities = entities.filter(e => e.type === activeType);
  const duplicatedEntities = [...filteredEntities, ...filteredEntities];

  // Auto-scroll for infinite effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scroll = () => {
      if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
        carousel.scrollLeft -= (carousel.scrollWidth / 2);
      } else {
        carousel.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [activeType]);

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
    <div className="relative w-full bg-black text-white py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/10 to-black" />
      
      <div className="relative z-10 w-full px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Our Network
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trusted by industry leaders and innovators worldwide
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['client', 'partner'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type as 'client' | 'partner')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {type === 'client' ? 'Clients' : 'Partners'}
            </button>
          ))}
        </div>

        {/* Carousel container */}
        <div className="relative w-full">
          {/* Carousel */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex overflow-x-auto scrollbar-hide space-x-6 py-4 px-4 cursor-grab active:cursor-grabbing"
          >
            {duplicatedEntities.map((entity, index) => (
              <motion.div
                key={`${entity.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-64"
              >
                <div className={`h-80 rounded-2xl overflow-hidden border transition-all ${
                  entity.type === 'client' 
                    ? 'border-blue-500/20 hover:border-blue-500/40' 
                    : 'border-purple-500/20 hover:border-purple-500/40'
                } bg-gradient-to-b from-gray-900/50 to-gray-900/0`}>
                  <div className="relative z-10 h-full flex flex-col p-6">
                    <div className="mb-4 flex justify-center">
                      <div className={`relative w-24 h-24 rounded-full ${
                        entity.type === 'client'
                          ? 'bg-blue-900/20 border border-blue-500/20'
                          : 'bg-purple-900/20 border border-purple-500/20'
                      } flex items-center justify-center backdrop-blur-sm`}>
                        <Image
                          src={entity.logo}
                          alt={entity.name}
                          width={80}
                          height={80}
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-1">{entity.name}</h3>
                      <div className={`text-xs font-medium mb-3 ${
                        entity.type === 'client' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {entity.industry}
                      </div>
                      
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3" />
                      
                      <div className="text-xs text-gray-400 mt-2">
                        Since {entity.since}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 max-w-4xl mx-auto bg-gray-900/30 rounded-xl border border-gray-700 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                value: entities.filter(e => e.type === 'client').length, 
                label: 'Satisfied Clients',
                color: 'text-blue-400'
              },
              { 
                value: entities.filter(e => e.type === 'partner').length, 
                label: 'Strategic Partners',
                color: 'text-purple-400'
              },
              { 
                value: new Set(entities.map(e => e.industry)).size, 
                label: 'Industries Served',
                color: 'text-blue-400'
              }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}+
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityShowcase;