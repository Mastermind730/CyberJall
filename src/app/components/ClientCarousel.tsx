/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Your entities data
  const entities: Entity[] = useMemo(() => [
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
   
  ], []);

  // Filter entities based on active type
  const filteredEntities = useMemo(() => {
    if (activeType === 'all') return entities;
    return entities.filter(e => e.type === activeType);
  }, [activeType, entities]);

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse position tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Parallax effect calculation
  const calculateParallax = (speed: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    
    return {
      x: (mousePosition.x - centerX) * speed,
      y: (mousePosition.y - centerY) * speed
    };
  };

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatFast: {
      y: [0, -25, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Animated cosmic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        
        {/* Animated stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating cosmic elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"
          variants={floatingVariants}
          animate="floatFast"
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated title */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-700 to-red-900">
                  Our Network
                </span>
              </h1>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-700/20 rounded-full blur-xl -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Collaborating with industry leaders and innovators to create extraordinary results
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div 
            className="flex justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {['all', 'client', 'partner'].map((type) => (
              <button
                key={type}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveType(type as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeType === type
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {type === 'all' ? 'All' : type === 'client' ? 'Clients' : 'Partners'}
              </button>
            ))}
          </motion.div>

          {/* Entities grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntities.map((entity) => {
              const parallax = calculateParallax(0.03);
              
              return (
                <motion.div
                  key={entity.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: hoveredId === entity.id ? parallax.x : 0,
                    y: hoveredId === entity.id ? parallax.y : 0,
                    scale: hoveredId === entity.id ? 1.05 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.25)'
                  }}
                  onHoverStart={() => setHoveredId(entity.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="relative group"
                >
                  {/* Card */}
                  <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                    entity.type === 'client' 
                      ? 'border-cyan-500/30 hover:border-cyan-500/70' 
                      : 'border-purple-500/30 hover:border-purple-500/70'
                  }`}>
                    {/* Background gradient */}
                    <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${
                      entity.type === 'client' 
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20' 
                        : 'bg-gradient-to-br from-purple-500/20 to-pink-600/20'
                    }`} />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute inset-0 ${
                        entity.type === 'client' 
                          ? 'bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-cyan-500/10' 
                          : 'bg-gradient-to-br from-purple-500/10 via-pink-600/10 to-purple-500/10'
                      } animate-pulse`} />
                    </div>
                    
                    {/* Featured badge */}
                    {entity.featured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`absolute -top-0 -right-0 z-10 px-3 py-1 rounded-full text-xs font-bold ${
                          entity.type === 'client'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                            : 'bg-gradient-to-r from-purple-500 to-pink-600'
                        } shadow-lg`}
                      >
                        FEATURED
                      </motion.div>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-8">
                      {/* Logo */}
                      <div className="mb-6 flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`relative w-32 h-32 rounded-full ${
                            entity.type === 'client'
                              ? 'bg-cyan-900/30 border border-cyan-500/30'
                              : 'bg-purple-900/30 border border-purple-500/30'
                          } flex items-center justify-center backdrop-blur-sm`}
                        >
                          <Image
                            src={entity.logo}
                            alt={entity.name}
                            width={110}
                            height={100}
                            className=" object-contain"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Details */}
                      <div className="text-center flex-grow">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {entity.name}
                        </h3>
                        <div className={`text-sm font-medium mb-4 ${
                          entity.type === 'client' ? 'text-cyan-400' : 'text-purple-400'
                        }`}>
                          {entity.industry}
                        </div>
                        
                        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4" />
                        
                        <p className="text-gray-300 text-sm mb-4 italic">
                          {entity.testimonial}
                        </p>
                        
                        <div className="text-xs text-gray-400">
                          Partner since {entity.since}
                        </div>
                      </div>
                      
                      {/* Type indicator */}
                      <div className={`mt-6 text-center text-xs font-bold ${
                        entity.type === 'client' ? 'text-cyan-400' : 'text-purple-400'
                      }`}>
                        {entity.type === 'client' ? 'VALUED CLIENT' : 'STRATEGIC PARTNER'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-32"
          >
            <div className="bg-gradient-to-r from-black via-blue-900/30 to-black rounded-3xl border border-cyan-500/30 p-8 md:p-12 backdrop-blur-sm">
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
                  <div key={i} className="text-center group">
                    <div className="relative inline-block">
                      <div className={`text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                        {stat.value}+
                      </div>
                      <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>
                    <div className="text-lg text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 group">
          <span>Join Our Network</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            →
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
};

export default EntityShowcase;