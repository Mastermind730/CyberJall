/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// TypeScript interfaces
interface ClientLogo {
  id: number;
  name: string;
  logo: string;
  industry?: string;
  featured?: boolean;
}

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  color: string;
}

const ClientLogoShowcase: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeLogoIndex, setActiveLogoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(null);

  // Your 3-4 client logos
  const clientLogos: ClientLogo[] = useMemo(() => [
    { id: 1, name: 'Food Vez', logo: '/IMG-20250531-WA0000.jpg', industry: 'Food', featured: true },
    { id: 2, name: 'EN Times', logo: '/client1.jpg', industry: '', featured: true },
    { id: 3, name: 'Business Legacy', logo: '/client2.jpg', industry: '', featured: true },
    // Add your 4th client if needed
    // { id: 4, name: 'Your Client', logo: 'your-logo-url', industry: 'Industry' }
  ], []);

  // Particle system
  const createParticle = useCallback((): ParticleProps => ({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    velocity: {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    },
    color: ['#dc2626', '#ea580c', '#f97316'][Math.floor(Math.random() * 3)]
  }), []);

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 30 }, createParticle);
    setParticles(initialParticles);
  }, [createParticle]);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          opacity: particle.opacity > 0.01 ? particle.opacity - 0.001 : Math.random() * 0.5 + 0.1,
          ...(particle.x > (typeof window !== 'undefined' ? window.innerWidth : 1200) && { x: 0 }),
          ...(particle.x < 0 && { x: typeof window !== 'undefined' ? window.innerWidth : 1200 }),
          ...(particle.y > (typeof window !== 'undefined' ? window.innerHeight : 800) && { y: 0 }),
          ...(particle.y < 0 && { y: typeof window !== 'undefined' ? window.innerHeight : 800 })
        }))
      );
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-black"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-orange-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 animate-pulse" 
               style={{ 
                 backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220,38,38,0.3), transparent 200px)`,
                 transition: 'background-image 0.3s ease'
               }} />
        </div>
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: `scale(${1 + Math.sin(Date.now() * 0.001 + index) * 0.2})`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-red-600 mb-6 animate-pulse">
                TRUSTED PARTNERS
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-2xl rounded-lg -z-10 animate-pulse" />
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-32 animate-pulse" />
              <div className="mx-4 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-spin" />
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-32 animate-pulse" />
            </div>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Collaborating with <span className="text-red-400 font-semibold">{clientLogos.length}</span> industry pioneers 
              to shape the future of technology
            </p>
          </div>

          {/* Client Logo Grid - No Carousel Needed for 3-4 Logos */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Container */}
            <div className="relative overflow-hidden rounded-3xl p-12 border border-red-800/30 backdrop-blur-xl"
                 style={{
                   background: `linear-gradient(135deg, 
                     rgba(220,38,38,0.1) 0%, 
                     rgba(0,0,0,0.8) 50%, 
                     rgba(234,88,12,0.1) 100%)`,
                   boxShadow: `0 25px 50px -12px rgba(220,38,38,0.25), 
                              inset 0 1px 0 rgba(255,255,255,0.1)`
                 }}>
              
              {/* Logo Grid - Adjusted for 3-4 logos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {clientLogos.map((client, index) => (
                  <div
                    key={client.id}
                    className="group relative"
                    onMouseEnter={() => setActiveLogoIndex(client.id)}
                    onMouseLeave={() => setActiveLogoIndex(null)}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      transform: activeLogoIndex === client.id ? 'translateY(-12px) scale(1.05)' : 'translateY(0px) scale(1)'
                    }}
                  >
                    {/* Card */}
                    <div className="relative h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-red-800/30 transition-all duration-500 hover:border-orange-500/80 hover:shadow-2xl hover:shadow-red-500/30 group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:to-white/10">
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-orange-600/0 group-hover:from-red-600/20 group-hover:to-orange-600/20 rounded-2xl transition-all duration-500" />
                      
                      {/* Featured badge */}
                      {client.featured && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                          FEATURED
                        </div>
                      )}
                      
                      {/* Logo container */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="mb-6 transform transition-all duration-500 group-hover:scale-110">
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={100}
                            height={100}
                            className="max-h-20 max-w-full object-contain transition-all duration-500 group-hover:drop-shadow-2xl"
                            style={{
                              filter: activeLogoIndex === client.id ? 
                                'brightness(1.2) drop-shadow(0 0 20px rgba(220,38,38,0.8))' : 
                                'brightness(1)',
                              transform: activeLogoIndex === client.id ? 'scale(1.1)' : 'scale(1)'
                            }}
                          />
                        </div>
                        
                        <div className="text-center transition-all duration-500">
                          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-300 transition-colors duration-300">
                            {client.name}
                          </h3>
                          <p className="text-gray-400 text-sm group-hover:text-orange-300 transition-colors duration-300">
                            {client.industry}
                          </p>
                        </div>
                      </div>
                      
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-orange-600/40 to-red-600/40 rounded-2xl animate-pulse" 
                             style={{ animationDuration: '2s' }} />
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: clientLogos.length, label: 'Trusted Partners', suffix: '' },
              { number: clientLogos.filter(c => c.featured).length, label: 'Featured Clients', suffix: '' },
              { number: new Set(clientLogos.map(c => c.industry)).size, label: 'Industries Served', suffix: '+' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-500">
                    {stat.number}{stat.suffix}
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-gray-300 mt-2 text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-red-400/5 to-orange-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default ClientLogoShowcase;