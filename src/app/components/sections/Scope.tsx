'use client';
import type { FC } from 'react';

export const Scope: FC = () => {
  const scopeItems = [
    {
      title: 'Website',
      description: 'Complete website infrastructure and functionality',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
      )
    },
    {
      title: 'Web Application',
      description: 'All web-based applications and services',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      )
    },
    {
      title: 'Mobile Application',
      description: 'iOS and Android applications',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      )
    },
    {
      title: 'APIs',
      description: 'All public and authenticated APIs',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      )
    },
    {
      title: 'Backend Infrastructure',
      description: 'Server and database systems',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
      )
    },
    {
      title: 'SaaS',
      description: 'Software as a Service offerings',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
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
          <h2 className="text-3xl font-bold text-white mb-4">Program Scope</h2>
          <div className="w-20 h-0.5 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our Bug Bounty Program covers all our digital assets, including but not limited to
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scopeItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500/50 hover:bg-gray-800/80 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-600/20 transition-all duration-300">
                  <svg 
                    className="w-6 h-6 text-red-500 transform group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 