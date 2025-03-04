'use client';
import type { FC } from 'react';

export const WhatWeOffer: FC = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Binary Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="binary" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="20" className="text-xs" fill="currentColor">01001100</text>
            <text x="20" y="40" className="text-xs" fill="currentColor">10110011</text>
            <text x="40" y="60" className="text-xs" fill="currentColor">11001010</text>
            <text x="60" y="80" className="text-xs" fill="currentColor">00110101</text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#binary)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive security solutions designed to protect and empower your business
          </p>
          <div className="w-20 h-0.5 bg-red-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rewards Card */}
          <div className="group bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
            {/* Icon Container */}
            <div className="mb-6">
              <div className="bg-red-600/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            
            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">Rewards</h3>
            <p className="text-gray-300 text-lg">
              We offer competitive rewards for valid security vulnerabilities identified by the companies. 
              Rewards vary depending on the severity and impact of the reported issue.
            </p>
          </div>

          {/* Recognition Card */}
          <div className="group bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
            <div className="mb-6">
              <div className="bg-red-600/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">Recognition</h3>
            <p className="text-gray-300 text-lg">
              Companies who responsibly report valid vulnerabilities will be acknowledged and recognized for 
              their contributions to improving security.
            </p>
          </div>

          {/* Safe Harbor Card */}
          <div className="group bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
            <div className="mb-6">
              <div className="bg-red-600/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">Safe Harbor</h3>
            <p className="text-gray-300 text-lg">
              We commit to not pursuing legal action against companies who report vulnerabilities in accordance 
              with our program guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 