'use client';
import type { FC } from 'react';

export const SmartestChoice: FC = () => {
  return (
    <section className="pt-4 pb-16 bg-gray-900 relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M20,0 L20,80 M0,20 L80,20 M40,40 L60,40 M40,60 L60,60" 
              stroke="currentColor" strokeWidth="1" fill="none"/>
            <circle cx="20" cy="20" r="2" fill="currentColor"/>
            <circle cx="60" cy="60" r="2" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          {/* New Professional SVG */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Circle with Gradient */}
                <circle cx="50" cy="50" r="48" className="text-red-500" 
                  stroke="url(#gradient)" strokeWidth="2"/>
                
                {/* Inner Hexagon */}
                <path d="M50 20L75 35V65L50 80L25 65V35L50 20Z" 
                  className="text-red-500" stroke="currentColor" strokeWidth="2"/>
                
                {/* Connection Lines */}
                <path d="M50 20V80M25 35L75 65M75 35L25 65" 
                  stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                
                {/* Center Shield */}
                <path d="M50 35L60 40V55C60 60 55 65 50 65C45 65 40 60 40 55V40L50 35Z" 
                  className="text-red-500" stroke="currentColor" strokeWidth="2"/>
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-red-500" stopColor="currentColor" stopOpacity="1"/>
                    <stop offset="100%" className="text-red-600" stopColor="currentColor" stopOpacity="0.5"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">The Smartest Choice for Your Business</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of cybersecurity with our innovative platform that brings together expertise, 
            efficiency, and enterprise-grade protection.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 relative group shadow-lg">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-3 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-500/30 transition-colors"></div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-4 group-hover:scale-110 transition-transform relative">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Business To Business</h3>
              <p className="text-gray-300 leading-relaxed">
                CyberJall is India&apos;s first B2B bug bounty platform, designed specifically for enterprise collaboration. 
                Our platform streamlines the process of identifying and resolving security vulnerabilities, making it 
                easier for businesses to maintain robust cybersecurity measures.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 relative group shadow-lg">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-3 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-500/30 transition-colors"></div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-4 group-hover:scale-110 transition-transform relative">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Business Collaboration</h3>
              <p className="text-gray-300 leading-relaxed">
                Our platform enables businesses to collaborate with skilled and leading security companies to identify 
                and fix vulnerabilities in their systems. We foster a community of experts working together to create 
                a more secure digital ecosystem through shared knowledge and expertise.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 relative group shadow-lg">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-3 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-500/30 transition-colors"></div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-4 group-hover:scale-110 transition-transform relative">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Secure Environment</h3>
              <p className="text-gray-300 leading-relaxed">
                We provide a secure and efficient environment for companies to crowdsource security testing, 
                ensuring the integrity of digital assets with robust features. Our platform implements industry-leading 
                security measures and best practices to facilitate safe and effective vulnerability discovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 