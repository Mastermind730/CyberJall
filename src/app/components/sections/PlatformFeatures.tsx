"use client";
import React, { useState, useEffect } from 'react';

export const PlatformFeatures = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      id: 1,
      title: 'Multiple solutions on a single platform',
      description: 'Access all your cybersecurity needs in one centralized location.',
      icon: '🔗'
    },
    {
      id: 2,
      title: 'Platform-powered, best-in-class triage',
      description: 'Efficiently prioritize and manage vulnerabilities with our advanced triage system.',
      icon: '🎯'
    },
    {
      id: 3,
      title: 'The right security researchers at the right time',
      description: 'Connect with specialized security experts when you need them most.',
      icon: '👥'
    },
    {
      id: 4,
      title: 'Automated, orchestrated workflows',
      description: 'Streamline your security processes with intelligent automation.',
      icon: '⚡'
    },
    {
      id: 5,
      title: 'Rich reporting and recommendations',
      description: 'Gain valuable insights with comprehensive vulnerability reports.',
      icon: '📊'
    },
    {
      id: 6,
      title: 'Real-time integration with your SDLC',
      description: 'Seamlessly incorporate security into your development lifecycle.',
      icon: '🔄'
    }
  ];

  return (
    <section className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNjAgMCBMIDAgMCAwIDYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-950/80"></div>

      <div className="container mx-auto px-4 relative z-10 py-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-widest text-blue-400 mb-4">
            CYBERJALL PLATFORM
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Continuous, proactive security <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              built for enterprises
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our multi-solution SaaS platform delivers high-impact insights about vulnerabilities 
            directly into your security and development processes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600 to-blue-700"></span>
            <span className="relative">Explore the platform</span>
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating particles - only render on client to avoid hydration issues */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
  );
};

export default PlatformFeatures;