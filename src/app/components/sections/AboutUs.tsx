'use client';
import type { FC } from 'react';

export const AboutUs: FC = () => {
  return (
    <section className="pt-32 pb-8 bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background SVG Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="30" cy="30" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="lg:text-center mb-24">
          {/* Enhanced Shield SVG Icon with Animation */}
          <div className="flex justify-center mb-8 relative">
            <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <svg className="w-20 h-20 text-red-500 relative transform hover:scale-110 transition-transform duration-300" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <div className="space-y-6">
            <h2 className="text-base text-red-500 font-semibold tracking-wider uppercase">About Us</h2>
            <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
              Securing the Digital Future Together
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full my-8"></div>
            <p className="mt-6 text-xl leading-8 text-gray-300 max-w-4xl mx-auto font-light">
              Welcome to CyberJall, where security meets innovation. We&apos;re not just another Cyber Security platform,
              we&apos;re a community-driven ecosystem passionate about making the digital world safer for everyone.
            </p>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-4xl mx-auto font-light">
            At CyberJall, we are redefining how businesses access and manage cybersecurity services. Our mission is to bridge the gap between businesses and top-tier cybersecurity providers by offering a centralized, transparent, and flexible marketplace.
We understand that cyber threats are constantly evolving, and businesses need reliable, customizable, and collaborative security solutions. That&apos;s why CyberJall empowers companies to explore, compare, and bundle multiple service providers in a single subscription package, ensuring they get the protection they need on their terms.





            </p>
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-10">
            <svg className="w-64 h-64 text-red-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" 
                d="M40,100 C40,60 60,40 100,40 C140,40 160,60 160,100 C160,140 140,160 100,160 C60,160 40,140 40,100 Z" 
                className="animate-[spin_20s_linear_infinite]"/>
              <path fill="none" stroke="currentColor" strokeWidth="1" 
                d="M70,100 C70,80 80,70 100,70 C120,70 130,80 130,100 C130,120 120,130 100,130 C80,130 70,120 70,100 Z"
                className="animate-[spin_15s_linear_infinite_reverse]"/>
            </svg>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg className="w-80 h-80 text-red-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" 
                d="M100,20 L180,100 L100,180 L20,100 Z" 
                className="animate-[spin_25s_linear_infinite]"/>
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" 
                className="animate-[ping_4s_ease-in-out_infinite]"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}; 