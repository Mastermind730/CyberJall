'use client';
import type { FC } from 'react';

export const SmartestChoice: FC = () => {
  return (
    <section className="py-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* Section Container with Border */}
      <div className="absolute inset-8 md:inset-12 border border-red-500/10 rounded-2xl backdrop-blur-sm bg-[#0A0F1C]/90"></div>

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

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 relative">
        <div className="text-center mb-20">
          {/* Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
              <svg className="w-full h-full relative" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" className="text-red-500" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 20L75 35V65L50 80L25 65V35L50 20Z" 
                  className="text-red-500" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 20V80M25 35L75 65M75 35L25 65" 
                  stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M50 35L60 40V55C60 60 55 65 50 65C45 65 40 60 40 55V40L50 35Z" 
                  className="text-red-500" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">
            The <span className="text-red-500">Smartest Choice</span> for Your Business
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of cybersecurity with our innovative platform that brings together expertise, 
            efficiency, and enterprise-grade protection.
          </p>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mt-8 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 py-4">
          {/* Cards */}
          <div className="group relative h-full">
            <div className="relative h-full mt-10 bg-[#141B2D]/90 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-gray-700/50 hover:border-red-500 hover:border-4">
              {/* White background overlay */}
              <div className="absolute inset-0 bg-white origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 z-0 rounded-xl"></div>
              
              {/* Icon */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-2 z-20">
                <div className="bg-gray-800 rounded-full p-4 group-hover:scale-110 transition-all duration-500 border border-red-500/50 group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <svg className="w-8 h-8 text-red-500 transition-all duration-500 group-hover:text-red-600 group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-500 group-hover:text-gray-900">Business To Business</h3>
                <p className="text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-600">
                  CyberJall is India&apos;s first B2B bug bounty platform, designed specifically for enterprise collaboration. 
                  Our platform streamlines the process of identifying and resolving security vulnerabilities.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group relative h-full">
            <div className="relative h-full mt-10 bg-[#141B2D]/90 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-gray-700/50 hover:border-red-500 hover:border-4">
              <div className="absolute inset-0 bg-white origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 z-0 rounded-xl"></div>
              
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-2 z-20">
                <div className="bg-gray-800 rounded-full p-4 group-hover:scale-110 transition-all duration-500 border border-red-500/50 group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <svg className="w-8 h-8 text-red-500 transition-all duration-500 group-hover:text-red-600 group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-500 group-hover:text-gray-900">Business Collaboration</h3>
                <p className="text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-600">
                  Our platform enables businesses to collaborate with skilled and leading security companies to identify 
                  and fix vulnerabilities in their systems, fostering a community of experts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group relative h-full">
            <div className="relative h-full mt-10 bg-[#141B2D]/90 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-gray-700/50 hover:border-red-500 hover:border-4">
              <div className="absolute inset-0 bg-white origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 z-0 rounded-xl"></div>
              
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-2 z-20">
                <div className="bg-gray-800 rounded-full p-4 group-hover:scale-110 transition-all duration-500 border border-red-500/50 group-hover:border-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <svg className="w-8 h-8 text-red-500 transition-all duration-500 group-hover:text-red-600 group_hover:filter group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-500 group-hover:text-gray-900">Secure Environment</h3>
                <p className="text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-600">
                  We provide a secure and efficient environment for companies to crowdsource security testing, 
                  implementing industry-leading security measures and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-red-500/20 rounded-tl-2xl"></div>
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-red-500/20 rounded-tr-2xl"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-red-500/20 rounded-bl-2xl"></div>
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-red-500/20 rounded-br-2xl"></div>
      </div>
    </section>
  );
};