/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMounted, setIsMounted] = useState(false);
 

  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    setIsMounted(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'mission', 'features', 'partners', 'cta'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return a simple loading state or null while client-side code isn't ready
  if (!isMounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-900 opacity-80"></div>
          <div className="absolute inset-0 z-10">
            <svg width="100%" height="100%" className="opacity-30">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="orange" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cybersecurity</span> Collaboration
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
            >
              A revolutionary marketplace bridging the gap between top-tier security providers and businesses seeking tailored solutions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            >
              <motion.button 
              onClick={()=>{router.push("/contact_us")}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-red-600/30"
              >
                Get Started
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-semibold text-lg border border-red-500 shadow-lg shadow-red-600/10"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 relative"
          >
            <div className="relative h-80 w-80 md:h-96 md:w-96 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M100,10 L180,40 L180,110 C180,150 140,180 100,190 C60,180 20,150 20,110 L20,40 Z"
                  stroke="url(#shieldGradient)"
                  strokeWidth="3"
                  fill="rgba(20, 20, 20, 0.7)"
                />
                
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  fill="none"
                  stroke="#FF6347"
                  strokeWidth="1.5"
                >
                  <path d="M60,60 L90,60 L90,100 L130,100 L130,140" />
                  <path d="M60,100 L80,100 L80,140" />
                  <path d="M100,60 L140,60 L140,80 L120,80 L120,120" />
                  <path d="M100,120 L110,120 L110,140" />
                </motion.g>
                
                {[
                  { cx: 60, cy: 60, delay: 1.5 },
                  { cx: 90, cy: 60, delay: 1.7 },
                  { cx: 90, cy: 100, delay: 1.9 },
                  { cx: 130, cy: 100, delay: 2.1 },
                  { cx: 130, cy: 140, delay: 2.3 },
                  { cx: 60, cy: 100, delay: 1.6 },
                  { cx: 80, cy: 100, delay: 1.8 },
                  { cx: 80, cy: 140, delay: 2.0 },
                  { cx: 100, cy: 60, delay: 1.7 },
                  { cx: 140, cy: 60, delay: 1.9 },
                  { cx: 140, cy: 80, delay: 2.1 },
                  { cx: 120, cy: 80, delay: 2.3 },
                  { cx: 120, cy: 120, delay: 2.5 },
                  { cx: 100, cy: 120, delay: 2.2 },
                  { cx: 110, cy: 120, delay: 2.4 },
                  { cx: 110, cy: 140, delay: 2.6 },
                ].map((node, index) => (
                  <motion.circle
                    key={index}
                    cx={node.cx}
                    cy={node.cy}
                    r="4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: node.delay }}
                    fill="#FF4500"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0.6;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </motion.circle>
                ))}
                
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                >
                  <circle cx="100" cy="100" r="25" fill="rgba(0,0,0,0.7)" stroke="#FF4500" strokeWidth="2" />
                  <path d="M90,100 L110,100 L110,115 L90,115 Z" fill="#FF4500" />
                  <path d="M95,100 L105,100 L105,85 A5,5 0 0,0 95,85 L95,100 Z" fill="none" stroke="#FF4500" strokeWidth="2" />
                </motion.g>
              </svg>
              
              {Array.from({ length: 20 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute h-1 w-1 bg-orange-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 50 - 25, 0],
                    y: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-red-900 opacity-20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Are</span></h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl opacity-30 blur-lg"></div>
                <div className="relative bg-gray-900 rounded-xl p-8 border border-red-500/30">
                  <div className="mb-6">
                    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-red-500">
                      <path d="M9 12L11 14L15 10M12 3L4 7V11.5C4 15.6 7.4 19.8 12 21C16.6 19.8 20 15.6 20 11.5V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">Redefining Cybersecurity Access</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    At CyberJall, we are redefining the way businesses access and integrate cybersecurity services. Our innovative marketplace bridges the gap between top-tier cybersecurity providers and organizations seeking tailored, collaborative security solutions.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We believe cybersecurity shouldn&apos;t be fragmented or complex. That&apos;s why we provide a centralized, transparent, and flexible platform where businesses can build customized security packages with multiple trusted providers all in one seamless subscription.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2"
            >
              <div className="relative h-80 w-full">
                {/* Abstract network visualization */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF4500" />
                      <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                  </defs>
                  
                  <rect width="400" height="300" fill="none" />
                  
                  {/* Nodes and connections */}
                  {[
                    { cx: 200, cy: 150, r: 30, connections: [[120, 80], [300, 70], [140, 220], [260, 230]] },
                    { cx: 120, cy: 80, r: 20, connections: [[60, 50], [80, 140]] },
                    { cx: 300, cy: 70, r: 20, connections: [[340, 120]] },
                    { cx: 140, cy: 220, r: 20, connections: [[70, 260]] },
                    { cx: 260, cy: 230, r: 20, connections: [[320, 260]] },
                    { cx: 60, cy: 50, r: 15 },
                    { cx: 80, cy: 140, r: 15 },
                    { cx: 340, cy: 120, r: 15 },
                    { cx: 70, cy: 260, r: 15 },
                    { cx: 320, cy: 260, r: 15 }
                  ].map((node, i) => (
                    <g key={i}>
                      {node.connections?.map((conn, j) => (
                        <motion.line
                          key={`${i}-${j}`}
                          x1={node.cx}
                          y1={node.cy}
                          x2={conn[0]}
                          y2={conn[1]}
                          stroke="url(#lineGradient)"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 1.5, delay: 0.1 * i }}
                          viewport={{ once: true }}
                        >
                          <animate
                            attributeName="opacity"
                            values="0.7;0.2;0.7"
                            dur={`${2 + i * 0.5}s`}
                            repeatCount="indefinite"
                          />
                        </motion.line>
                      ))}
                      
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill="rgba(0,0,0,0.7)"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
                        viewport={{ once: true }}
                      />
                      
                      {i === 0 && (
                        <motion.text
                          x={node.cx}
                          y={node.cy + 5}
                          textAnchor="middle"
                          fill="#FF4500"
                          fontSize="16"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          CyberJall
                        </motion.text>
                      )}
                    </g>
                  ))}
                </svg>
                
                {Array.from({ length: 15 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute h-1 w-1 bg-orange-500 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 50 - 25, 0],
                      y: [0, Math.random() * 50 - 25, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              With a commitment to trust, efficiency, and innovation, we empower businesses to strengthen their defenses while enabling cybersecurity experts to expand their reach and credibility. Join us in shaping the future of cybersecurity collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="mission" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-orange-900 opacity-20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Mission & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Vision</span></h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-gray-900 to-black p-1 rounded-xl"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-red-500/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-red-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  At CyberJall, our mission is to simplify and strengthen cybersecurity for businesses through a centralized platform that fosters collaboration, trust, and efficiency.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Committed to transparency and innovation, we eliminate complexity, ensure clear pricing, and enable seamless service integration. Our marketplace bridges the cybersecurity demand-supply gap, creating a secure, connected, and resilient business ecosystem.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-gray-900 to-black p-1 rounded-xl"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-orange-500/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  To be the leading global cybersecurity marketplace, revolutionizing how businesses and security providers collaborate.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We envision a future where every organization, regardless of size, has seamless access to trusted, transparent, and tailored cybersecurity solutions, ensuring a safer digital world.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 relative h-64 md:h-80"
          >
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
              
              <motion.path
                d="M50,100 C200,50 600,150 750,100"
                stroke="url(#roadGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              
              {[
                { x: 100, y: 85, label: "Build Trust", delay: 0.5 },
                { x: 300, y: 120, label: "Empower Business", delay: 0.8 },
                { x: 500, y: 70, label: "Foster Innovation", delay: 1.1 },
                { x: 700, y: 110, label: "Global Impact", delay: 1.4 }
              ].map((point, index) => (
                <g key={index}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="12"
                    fill="black"
                    stroke="url(#roadGradient)"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: point.delay }}
                    viewport={{ once: true }}
                  />
                  
                  <motion.text
                    x={point.x}
                    y={point.y + 30}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: point.delay + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {point.label}
                  </motion.text>
                </g>
              ))}
              
              {/* Pulsing future point */}
              <motion.circle
                cx="750"
                cy="100"
                r="15"
                fill="rgba(255, 69, 0, 0.3)"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                />
                </svg>
              </motion.div>
            </div>
          </section>
    
          <section id="features" className="py-20 relative overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-90"></div>
              <div className="absolute right-0 top-1/3 w-64 h-64 bg-red-900 rounded-full filter blur-3xl opacity-20"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Features</span></h2>
                <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: "Trusted Providers",
                    description: "Vetted cybersecurity experts with proven track records and transparent ratings."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    ),
                    title: "Custom Packages",
                    description: "Mix and match services from multiple providers in one subscription."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Transparent Pricing",
                    description: "Clear, upfront costs with no hidden fees or surprise charges."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: "Seamless Integration",
                    description: "Easy onboarding and coordination between multiple services."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Performance Monitoring",
                    description: "Real-time tracking and reporting of all security services."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ),
                    title: "24/7 Support",
                    description: "Dedicated assistance whenever you need it."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-red-500/30 transition-all duration-300"
                  >
                    <div className="text-red-500 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
    
          <section id="partners" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Partners</span></h2>
                <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
              </motion.div>
              

<section id="partners" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
  <div className="container mx-auto px-6 relative z-10">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Partners</span></h2>
      <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
    </motion.div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-xl p-6 flex items-center justify-center border border-gray-800 hover:border-red-500/30 transition-all duration-300"
        >
          <div className="text-gray-300 font-medium">Partner {i}</div>
        </motion.div>
      ))}
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center"
    >
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        We partner with the most trusted names in cybersecurity to bring you comprehensive protection.
      </p>
      <Link href="/companies">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-red-600/30"
        >
          View All Partners
        </motion.button>
      </Link>
    </motion.div>
  </div>
</section>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-16 text-center"
              >
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  We partner with the most trusted names in cybersecurity to bring you comprehensive protection.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-red-600/30"
                >
                  Become a Partner
                </motion.button>
              </motion.div>
            </div>
          </section>
    
          <section id="cta" className="py-32 relative overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-900 opacity-80"></div>
              <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl opacity-15"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Security</span>?</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                  Join hundreds of businesses who have already strengthened their cybersecurity with our collaborative marketplace.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <motion.button 
                  onClick={()=>{router.push("/contact_us")}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-red-600/30"
                  >
                    Get Started Now
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full font-semibold text-lg border border-red-500 shadow-lg shadow-red-600/10"
                  >
                    Request Demo
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>
    
          {/* Navigation dots */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
            {['hero', 'about', 'mission', 'features', 'partners', 'cta'].map((section) => (
              <motion.button
                key={section}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-3 h-3 rounded-full my-4 focus:outline-none"
                initial={{ backgroundColor: '#4B5563' }}
                animate={{ backgroundColor: currentSection === section ? '#EF4444' : '#4B5563' }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
                aria-label={`Go to ${section} section`}
              />
            ))}
          </div>
        </div>
      );
    }