'use client';
import type { FC } from 'react';

export const HowItWorks: FC = () => {
  const businessSteps = [
    {
      title: 'Explore & Compare',
      description: 'Browse verified cybersecurity providers offering various security services.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      )
    },
    {
      title: 'Customize Your Security Package',
      description: 'Select multiple providers and bundle their services into one tailored Package.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      )
    },
    {
      title: 'Get Matched & Engage',
      description: 'Our platform helps you find the best service providers based on your needs and budget.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      )
    },
    {
      title: 'Manage Everything in One Place',
      description: 'Track progress, communicate with providers, and handle payments seamlessly.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      )
    }
  ];

  const providerSteps = [
    {
      title: 'Create a Profile',
      description: 'Sign up, list your services, and showcase your expertise.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      )
    },
    {
      title: 'Receive Business Leads',
      description: 'Get matched with businesses looking for cybersecurity solutions.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M13 10V3L4 14h7v7l9-11h-7z"/>
      )
    },
    {
      title: 'Collaborate & Deliver Services',
      description: 'Work with businesses directly while benefiting from a structured service package model.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      )
    },
    {
      title: 'Grow Your Business',
      description: 'Increase visibility, gain credibility, and secure long-term clients.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Matrix Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="matrix" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="currentColor"/>
            <path d="M30 0v60M0 30h60" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#matrix)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            In today's digital world, cybersecurity isn't optional it's essential. But finding the right security services can be complex, costly, and time consuming. That's why we built CyberJall Infotech, a unique cybersecurity marketplace that simplifies the process for businesses while opening new opportunities for security providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Businesses Card */}
          <div className="group bg-gray-800 rounded-2xl border border-gray-700 p-8 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-red-600/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-red-600/20 transition-all duration-300">
                <svg 
                  className="w-7 h-7 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">For Businesses</h3>
            </div>
            <div className="space-y-6">
              {businessSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600/10 rounded-full flex items-center justify-center mt-1 group-hover:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Cybersecurity Providers Card */}
          <div className="group bg-gray-800 rounded-2xl border border-gray-700 p-8 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-red-600/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-red-600/20 transition-all duration-300">
                <svg 
                  className="w-7 h-7 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">For Cybersecurity Providers</h3>
            </div>
            <div className="space-y-6">
              {providerSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600/10 rounded-full flex items-center justify-center mt-1 group-hover:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 