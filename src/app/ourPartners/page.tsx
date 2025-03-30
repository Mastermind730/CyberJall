// pages/companies.js
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

// Sample company data
const companies = [
  { id: 1, name: 'TechNova', logo: '/company-logos/technova.svg' },
  { id: 2, name: 'Quantum Industries', logo: '/company-logos/quantum.svg' },
  { id: 3, name: 'Nexus Global', logo: '/company-logos/nexus.svg' },
  { id: 4, name: 'Apex Solutions', logo: '/company-logos/apex.svg' },
  { id: 5, name: 'Momentum Corp', logo: '/company-logos/momentum.svg' },
  { id: 6, name: 'Fusion Systems', logo: '/company-logos/fusion.svg' },
  { id: 7, name: 'Elevate Tech', logo: '/company-logos/elevate.svg' },
  { id: 8, name: 'Spectrum Data', logo: '/company-logos/spectrum.svg' },
  { id: 9, name: 'Zenith Partners', logo: '/company-logos/zenith.svg' },
  { id: 10, name: 'Pinnacle Group', logo: '/company-logos/pinnacle.svg' },
  { id: 11, name: 'Orbital Networks', logo: '/company-logos/orbital.svg' },
  { id: 12, name: 'Phoenix Innovations', logo: '/company-logos/phoenix.svg' },
];

// SVG placeholder for company logos
const LogoPlaceholder = ({ name }) => {
  // Generate a unique pattern based on company name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 20; // Keep in darker red range
  
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="w-full  h-full">
      <defs>
        <linearGradient id={`grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue}, 80%, 30%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 10}, 70%, 20%)`} />
        </linearGradient>
        <pattern id={`pattern-${hash}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2" fill="rgba(0,0,0,0.3)" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#grad-${hash})`} />
      <rect width="100" height="100" fill={`url(#pattern-${hash})`} />
      <text x="50" y="55" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
        {name.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
};

export default function Companies() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-900 mt-10 text-gray-100">
     

      {/* Header with animated background */}
      <header className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-950 via-red-900 to-amber-900 opacity-90">
          {/* Animated SVG pattern */}
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(180,80,50,0.3)" />
                <stop offset="100%" stopColor="rgba(180,30,30,0)" />
              </radialGradient>
            </defs>
            <motion.circle 
              cx="50" 
              cy="50" 
              r="30" 
              fill="url(#glow)"
              animate={{
                r: [30, 40, 30],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <motion.h1 
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Partners
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Discover the innovative companies that are revolutionizing the industry
          </motion.p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {companies.map((company) => (
            <motion.div
              key={company.id}
              className="relative bg-gradient-to-br from-zinc-800 to-black rounded-lg overflow-hidden transform"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulsing background effect - more subdued */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-800 to-amber-900 opacity-0 hover:opacity-20 transition-opacity duration-300"/>
              
              {/* Card content */}
              <div className="p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-black bg-opacity-60 p-4 border-2 border-red-800 shadow-lg">
                  <LogoPlaceholder name={company.name} />
                </div>
                
                <h2 className="text-xl font-bold text-center mb-2 text-amber-700">{company.name}</h2>
                
                <div className="flex justify-center mt-4">
                  <motion.button 
                    className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
              
              {/* Decorative corner SVG */}
              <svg className="absolute bottom-0 right-0 w-16 h-16 text-red-900 opacity-20" viewBox="0 0 100 100">
                <path d="M0,100 L100,100 L100,0 Q50,50 0,100 Z" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </main>

      
    </div>
  );
}