"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import "@/app/globals.css";

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
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const entities: Entity[] = [
    { 
      id: 1, 
      name: 'Food Vez', 
      logo: '/IMG-20250531-WA0000.jpg', 
      type: 'client', 
      industry: 'Food Tech',
      since: '2022',
      featured: true
    },
    { 
      id: 2, 
      name: 'EN Times', 
      logo: '/client1.jpg', 
      type: 'client', 
      industry: 'Media',
      since: '2021',
      featured: true
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
      since: '2020',
      featured: true
    },
    
  ];

  // Filter and duplicate entities for the carousel
  const filteredEntities = entities.filter(e => e.type === activeType);
  const duplicatedEntities = [...filteredEntities, ...filteredEntities];

  // Debugging - log the filtered entities
  // useEffect(() => {
  //   console.log(`Filtered ${activeType}s:`, filteredEntities);
  // }, [activeType, filteredEntities]);

  // Auto-scroll for infinite effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || filteredEntities.length === 0) return;

    const scroll = () => {
      if (!isHovered) {
        if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
          carousel.scrollLeft -= (carousel.scrollWidth / 2);
        } else {
          carousel.scrollLeft += 0.5;
        }
      }
    };

    const interval = setInterval(scroll, 16);
    return () => clearInterval(interval);
  }, [activeType, isHovered, filteredEntities.length]);

  // Animation on filter change
  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [20, 0],
      transition: { duration: 0.5 }
    });
  }, [activeType, controls]);

  return (
    <div className="relative w-full bg-black text-white py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/5 to-black" />
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 filter blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600 filter blur-[100px]"></div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Trusted Network
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the ecosystem of industry leaders and innovators who trust our platform
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-16"
        >
          {['client'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type as 'client' | 'partner')}
              className={`px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                activeType === type
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {type === 'client' ? 'Our Clients and Partners' : 'Our Partners'}
            </button>
          ))}
        </motion.div>

        {/* Carousel container - only show if there are entities */}
        {filteredEntities.length > 0 ? (
          <div 
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient fade effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
            
            {/* Carousel */}
            <motion.div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide space-x-8 py-2"
              style={{ scrollBehavior: isHovered ? 'smooth' : 'auto' }}
            >
              {duplicatedEntities.map((entity, index) => (
                <motion.div
                  key={`${entity.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  className="flex-shrink-0 w-72 sm:w-80"
                >
                  <div className={`h-96 rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    entity.type === 'client' 
                      ? 'border-blue-500/20 hover:border-blue-500/40' 
                      : 'border-purple-500/20 hover:border-purple-500/40'
                  } bg-gradient-to-b from-gray-900/50 to-gray-900/0 backdrop-blur-sm relative group`}>
                    {/* Glow effect */}
                    {entity.featured && (
                      <div className={`absolute inset-0 rounded-3xl ${
                        entity.type === 'client' 
                          ? 'bg-blue-500/10 group-hover:bg-blue-500/20' 
                          : 'bg-purple-500/10 group-hover:bg-purple-500/20'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    )}
                    
                    <div className="relative z-10 h-full flex flex-col p-8">
                      {/* Logo */}
                      <div className="mb-6 flex justify-center">
                        <div className={`relative w-28 h-28 rounded-2xl ${
                          entity.type === 'client'
                            ? 'bg-blue-900/20 border-2 border-blue-500/20'
                            : 'bg-purple-900/20 border-2 border-purple-500/20'
                        } flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}>
                          <Image
                            src={entity.logo}
                            alt={entity.name}
                            width={100}
                            height={100}
                            className="object-contain p-3"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center flex-grow flex flex-col">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{entity.name}</h3>
                        <div className={`text-sm font-medium mb-4 ${
                          entity.type === 'client' ? 'text-blue-400' : 'text-purple-400'
                        }`}>
                          {entity.industry}
                        </div>
                        
                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4 w-3/4 mx-auto"></div>
                        
                        {/* Since */}
                        <div className="mt-auto text-xs text-gray-400">
                          Partner since {entity.since}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            No {activeType === 'client' ? 'clients' : 'partners'} to display
          </div>
        )}

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 max-w-5xl mx-auto bg-gradient-to-br from-gray-900/50 to-gray-900/0 rounded-2xl border border-gray-700/50 p-8 sm:p-10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                value: entities.filter(e => e.type === 'client').length, 
                label: 'Satisfied Clients',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              { 
                value: entities.filter(e => e.type === 'partner').length, 
                label: 'Strategic Partners',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              { 
                value: new Set(entities.map(e => e.industry)).size, 
                label: 'Industries Served',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  {stat.value}+
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EntityShowcase;