'use client';
import type { FC } from 'react';

export const WhatWeOffer: FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-[#0A0F1C] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="binary" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="20" className="text-[10px] font-mono" fill="currentColor">01001100</text>
            <text x="20" y="40" className="text-[10px] font-mono" fill="currentColor">10110011</text>
            <text x="40" y="60" className="text-[10px] font-mono" fill="currentColor">11001010</text>
            <text x="60" y="80" className="text-[10px] font-mono" fill="currentColor">00110101</text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#binary)"/>
        </svg>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-6">
            What We Offer
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Comprehensive security solutions designed to protect and empower your business
          </p>
          <div className="w-32 h-1 mx-auto mt-8 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rewards Card */}
          <div className="group relative h-full transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative flex flex-col h-full bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 transition-all duration-700 group-hover:border-blue-500/50 overflow-hidden">
              {/* Sliding background fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-500 translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
              
              <div className="mb-8 relative z-10">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 w-16 h-16 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-white/10 group-hover:to-white/20">
                  <svg className="w-8 h-8 text-blue-500 transform transition duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 transition duration-500 group-hover:text-white group-hover:translate-x-1 relative z-10">Rewards</h3>
              <p className="text-gray-400 text-lg leading-relaxed transition duration-500 group-hover:text-white/90 flex-grow relative z-10">
                We offer competitive rewards for valid security vulnerabilities identified by the companies. 
                Rewards vary depending on the severity and impact of the reported issue.
              </p>
            </div>
          </div>

          {/* Recognition Card */}
          <div className="group relative h-full transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative flex flex-col h-full bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 transition-all duration-700 group-hover:border-purple-500/50 overflow-hidden">
              {/* Sliding background fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-500 translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
              
              <div className="mb-8 relative z-10">
                <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 w-16 h-16 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-white/10 group-hover:to-white/20">
                  <svg className="w-8 h-8 text-purple-500 transform transition duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 transition duration-500 group-hover:text-white group-hover:translate-x-1 relative z-10">Recognition</h3>
              <p className="text-gray-400 text-lg leading-relaxed transition duration-500 group-hover:text-white/90 flex-grow relative z-10">
                Companies who responsibly report valid vulnerabilities will be acknowledged and recognized for 
                their contributions to improving security.
              </p>
            </div>
          </div>

          {/* Safe Harbor Card */}
          <div className="group relative h-full transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative flex flex-col h-full bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 transition-all duration-700 group-hover:border-teal-500/50 overflow-hidden">
              {/* Sliding background fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-500 translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
              
              <div className="mb-8 relative z-10">
                <div className="bg-gradient-to-br from-teal-500/10 to-emerald-600/10 w-16 h-16 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-white/10 group-hover:to-white/20">
                  <svg className="w-8 h-8 text-teal-500 transform transition duration-500 group-hover:scale-110 group_hover:rotate-6 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 transition duration-500 group-hover:text-white group_hover:translate-x-1 relative z-10">Safe Harbor</h3>
              <p className="text-gray-400 text-lg leading-relaxed transition duration-500 group-hover:text-white/90 flex-grow relative z-10">
                We commit to not pursuing legal action against companies who report vulnerabilities in accordance 
                with our program guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};