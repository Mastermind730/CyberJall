"use client";
import React, { useState, useEffect } from 'react';

export const PlatformFeatures = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredHex, setHoveredHex] = useState<number|null>(null);

  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-500/5 to-transparent rounded-full animate-spin-slow"></div>
        
        {/* Dynamic Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>

        {/* Floating Particles */}
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono animate-binary-rain"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              {Array.from({ length: 50 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
          ))}
        </div>
      </div>

      {/* Mouse Follower Gradient */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(249,115,22,0.2) 50%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.3s ease-out'
        }}
      />

      <div className="container mx-auto px-4 relative z-20 py-24">
        {/* Header with Animated Elements */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="relative">
            <h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 uppercase tracking-[0.3em] mb-6 animate-fade-in-up">
              CYBERJALL PLATFORM
            </h2>
            
            {/* Animated Lines */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up delay-200">
              Our platform delivers{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-red-600 animate-gradient-x">
                continuous
              </span>
              ,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-gradient-x">
                proactive security
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              We&apos;ve all seen it: Siloed solutions often lead to surprise attacks. Only CyberJall offers a 
              <span className="text-orange-400 font-semibold"> multi-solution SaaS platform</span> that continuously 
              delivers high-impact insights about vulnerabilities directly into your security and dev processes.
            </p>
          </div>
        </div>

        {/* Enhanced Hexagonal Layout */}
        <div className="max-w-7xl mx-auto relative">
          {/* Animated Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6"/>
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            {/* Connection lines between hexagons */}
            <g className="animate-pulse">
              <line x1="250" y1="150" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="750" y1="150" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="150" y1="300" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="850" y1="300" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="250" y1="450" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="750" y1="450" x2="500" y2="300" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5"/>
            </g>
          </svg>

          {/* Hexagonal Feature Layout */}
          <div className="relative flex flex-col items-center">
            {/* Top Row */}
            <div className="flex justify-center mb-12 space-x-16">
              {[features[1], features[2]].map((feature, index) => (
                <div 
                  key={feature.id}
                  className="hexagon-container animate-float-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredHex(feature.id)}
                  onMouseLeave={() => setHoveredHex(null)}
                >
                  <div className={`hexagon group cursor-pointer transition-all duration-500 ${
                    hoveredHex === feature.id ? 'scale-110' : ''
                  }`}>
                    <div className="hexagon-bg bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"></div>
                    <div className="hexagon-border border-gradient"></div>
                    <div className="hexagon-glow"></div>
                    <div className="hexagon-content">
                      <div className="text-center">
                        <div className="text-2xl mb-3 animate-bounce">{feature.icon}</div>
                        <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-orange-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Row with Center Logo */}
            <div className="flex justify-center items-center mb-12 space-x-20">
              <div 
                className="hexagon-container animate-float-in"
                style={{ animationDelay: '400ms' }}
                onMouseEnter={() => setHoveredHex(features[0].id)}
                onMouseLeave={() => setHoveredHex(null)}
              >
                <div className={`hexagon group cursor-pointer transition-all duration-500 ${
                  hoveredHex === features[0].id ? 'scale-110' : ''
                }`}>
                  <div className="hexagon-bg bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"></div>
                  <div className="hexagon-border border-gradient"></div>
                  <div className="hexagon-glow"></div>
                  <div className="hexagon-content">
                    <div className="text-center">
                      <div className="text-2xl mb-3 animate-bounce">{features[0].icon}</div>
                      <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-orange-300 transition-colors duration-300">
                        {features[0].title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Logo - Enhanced */}
              <div className="center-hexagon animate-float-in" style={{ animationDelay: '600ms' }}>
                <div className="hexagon-large group cursor-pointer">
                  <div className="hexagon-bg-large bg-gradient-to-br from-red-600 via-orange-500 to-red-700 animate-gradient-xy"></div>
                  <div className="hexagon-border-large border-gradient-center"></div>
                  <div className="hexagon-glow-large"></div>
                  <div className="hexagon-content-large">
                    <div className="text-center">
                      {/* Animated Logo */}
                      <div className="relative mb-4">
                        <div className="w-16 h-16 mx-auto bg-white rounded-xl flex items-center justify-center shadow-2xl animate-pulse">
                          <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.83 9 11 5.16-1.17 9-5.45 9-11V7L12 2z"/>
                          </svg>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-20 animate-ping"></div>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1 animate-pulse">The CyberJall Security</h3>
                      <h3 className="text-white font-bold text-sm animate-pulse">Knowledge Platform</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="hexagon-container animate-float-in"
                style={{ animationDelay: '800ms' }}
                onMouseEnter={() => setHoveredHex(features[3].id)}
                onMouseLeave={() => setHoveredHex(null)}
              >
                <div className={`hexagon group cursor-pointer transition-all duration-500 ${
                  hoveredHex === features[3].id ? 'scale-110' : ''
                }`}>
                  <div className="hexagon-bg bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"></div>
                  <div className="hexagon-border border-gradient"></div>
                  <div className="hexagon-glow"></div>
                  <div className="hexagon-content">
                    <div className="text-center">
                      <div className="text-2xl mb-3 animate-bounce">{features[3].icon}</div>
                      <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-orange-300 transition-colors duration-300">
                        {features[3].title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center space-x-16">
              {[features[4], features[5]].map((feature, index) => (
                <div 
                  key={feature.id}
                  className="hexagon-container animate-float-in"
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                  onMouseEnter={() => setHoveredHex(feature.id)}
                  onMouseLeave={() => setHoveredHex(null)}
                >
                  <div className={`hexagon group cursor-pointer transition-all duration-500 ${
                    hoveredHex === feature.id ? 'scale-110' : ''
                  }`}>
                    <div className="hexagon-bg bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"></div>
                    <div className="hexagon-border border-gradient"></div>
                    <div className="hexagon-glow"></div>
                    <div className="hexagon-content">
                      <div className="text-center">
                        <div className="text-2xl mb-3 animate-bounce">{feature.icon}</div>
                        <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-orange-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
          <button className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-gradient-x">
            <span className="relative z-10">Explore the platform</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-in {
          0% { 
            opacity: 0; 
            transform: translateY(50px) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        
        @keyframes binary-rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
        
        .animate-gradient-xy { 
          background-size: 200% 200%; 
          animation: gradient-xy 4s ease infinite; 
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-in { animation: float-in 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-binary-rain { animation: binary-rain linear infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }

        .hexagon-container {
          width: 200px;
          height: 173px;
          position: relative;
        }

        .center-hexagon {
          width: 280px;
          height: 242px;
          position: relative;
        }

        .hexagon, .hexagon-large {
          width: 100%;
          height: 100%;
          position: relative;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .hexagon-bg, .hexagon-bg-large {
          position: absolute;
          inset: 0;
          clip-path: inherit;
        }

        .hexagon-border, .hexagon-border-large {
          position: absolute;
          inset: 0;
          clip-path: inherit;
          padding: 2px;
        }

        .border-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(45deg, #ef4444, #f97316, #ef4444);
          clip-path: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .border-gradient-center::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 3px;
          background: linear-gradient(45deg, #fbbf24, #fff, #fbbf24);
          clip-path: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .hexagon-glow, .hexagon-glow-large {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hexagon:hover .hexagon-glow,
        .hexagon-large:hover .hexagon-glow-large {
          opacity: 1;
        }

        .hexagon-content, .hexagon-content-large {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          z-index: 10;
        }

        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default PlatformFeatures;