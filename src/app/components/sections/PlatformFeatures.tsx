/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export const PlatformFeatures: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Multiple solutions on a single platform',
      description: 'Access all your cybersecurity needs in one centralized location.'
    },
    {
      id: 2,
      title: 'Platform-powered, best-in-class triage',
      description: 'Efficiently prioritize and manage vulnerabilities with our advanced triage system.'
    },
    {
      id: 3,
      title: 'The right security researchers at the right time',
      description: 'Connect with specialized security experts when you need them most.'
    },
    {
      id: 4,
      title: 'Automated, orchestrated workflows',
      description: 'Streamline your security processes with intelligent automation.'
    },
    {
      id: 5,
      title: 'Rich reporting and recommendations',
      description: 'Gain valuable insights with comprehensive vulnerability reports and actionable recommendations.'
    },
    {
      id: 6,
      title: 'Real-time integration with your SDLC',
      description: 'Seamlessly incorporate security into your development lifecycle.'
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Binary Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="binary-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <text x="0" y="5" fill="currentColor" fontSize="3">01</text>
            <text x="5" y="10" fill="currentColor" fontSize="3">10</text>
          </pattern>
          <rect width="100" height="100" fill="url(#binary-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
            CyberJall Platform
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Experience uninterrupted, preemptive security with our platform.
          </h3>
        </div>

        {/* Honeycomb Layout */}
        <div className="max-w-6xl mx-auto relative">
          

          <div className="relative">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                The CyberJall Security Knowledge Platform
              </h3>
            </div>

           
          </div>
        </div>

        {/* Feature Points */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Leading group of cyber security companies work for your company.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Multiple solutions on single platform.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <p className="text-white font-medium">Collaborative services with industry partnership.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Affordable pricing with quality of services.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Professional Team & Industry Awareness with global community.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-medium">This is the best platform for SMB&apos;s & Big Enterprises to run their bug bounty program.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a href="#" className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore the platform
          </a>
        </div>
      </div>
    </section>
  );
}; 