'use client';
import type { FC } from 'react';

export const WhyChooseCyberJall: FC = () => {
  return (
    <>
      {/* First Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Matrix Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="why-matrix" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor"/>
              <path d="M30 0v60M0 30h60" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#why-matrix)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - SVG Illustration */}
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 600 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Central Server Stack */}
                  <g transform="translate(250,150)">
                    {/* Server Base */}
                    <rect x="-50" y="-60" width="100" height="120" fill="#1F2937" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="-45" y="-55" width="90" height="20" fill="#111827" stroke="#3B82F6" strokeWidth="1"/>
                    <rect x="-45" y="-25" width="90" height="20" fill="#111827" stroke="#3B82F6" strokeWidth="1"/>
                    <rect x="-45" y="5" width="90" height="20" fill="#111827" stroke="#3B82F6" strokeWidth="1"/>
                    <rect x="-45" y="35" width="90" height="20" fill="#111827" stroke="#3B82F6" strokeWidth="1"/>
                    
                    {/* Server LEDs */}
                    <circle cx="-35" cy="-45" r="2" fill="#22C55E"/>
                    <circle cx="-35" cy="-15" r="2" fill="#22C55E"/>
                    <circle cx="-35" cy="15" r="2" fill="#22C55E"/>
                    <circle cx="-35" cy="45" r="2" fill="#22C55E"/>
                  </g>

                  {/* Globe on Top */}
                  <g transform="translate(300,80)">
                    <circle cx="0" cy="0" r="40" fill="url(#globe-gradient)" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M-30 0h60 M0 -30v60" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4"/>
                    <ellipse cx="0" cy="0" rx="40" ry="15" stroke="#3B82F6" strokeWidth="1"/>
                  </g>

                  {/* Connected Devices */}
                  {/* Folder */}
                  <g transform="translate(150,200)">
                    <path d="M0 0h60v40h-60z M0 0l10-10h50v40" fill="#EAB308" fillOpacity="0.9" stroke="#B45309" strokeWidth="1"/>
                  </g>

                  {/* Shield */}
                  <g transform="translate(450,200)">
                    <path d="M0 0l30-20h30l30 20v40l-45 30l-45-30z" fill="url(#shield-gradient)" stroke="#22C55E" strokeWidth="2"/>
                    <path d="M30 10l15 15l-15 15l-15-15z" stroke="#22C55E" strokeWidth="2"/>
                  </g>

                  {/* Laptops */}
                  <g transform="translate(150,300)">
                    <rect x="0" y="0" width="80" height="50" fill="#1F2937" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M-10 50h100v10h-100z" fill="#1F2937" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="5" y="5" width="70" height="40" fill="url(#screen-gradient)" stroke="#3B82F6" strokeWidth="1"/>
                  </g>

                  <g transform="translate(450,300)">
                    <rect x="-80" y="0" width="80" height="50" fill="#1F2937" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M-90 50h100v10h-100z" fill="#1F2937" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="-75" y="5" width="70" height="40" fill="url(#screen-gradient)" stroke="#3B82F6" strokeWidth="1"/>
                  </g>

                  {/* Connection Lines */}
                  <path d="M300 180L150 220M300 180L450 220M300 180L150 320M300 180L450 320" 
                    stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4"/>

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="globe-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="shield-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="screen-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                We Secure the Digitally Connected World
              </h2>
              <div className="w-24 h-1 bg-red-600"></div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our goal is to bridge the gap between cost and quality ensuring that cybersecurity is accessible to everyone without compromising the effectiveness of protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-gray-800/50 relative overflow-hidden">
        {/* Background Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M20 0v80M40 0v80M60 0v80M0 20h80M0 40h80M0 60h80" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
              <circle cx="20" cy="20" r="2" fill="currentColor"/>
              <circle cx="40" cy="40" r="2" fill="currentColor"/>
              <circle cx="60" cy="60" r="2" fill="currentColor"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Who We Are?
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <h3 className="text-2xl font-semibold text-red-400 mb-8">
              Embrace Innovation with Our Game-Changing Platform
            </h3>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                At CyberJall, we are redefining the way businesses access and integrate cybersecurity services. Our innovative marketplace bridges the gap between top-tier cybersecurity providers and organizations seeking tailored, collaborative security solutions.
              </p>
              <p>
                We believe cybersecurity shouldn&apos;t be fragmented or complex. That&apos;s why we provide a centralized, transparent, and flexible platform where businesses can build customized security packages with multiple trusted providers all in one seamless subscription. With a commitment to trust, efficiency, and innovation, we empower businesses to strengthen their defenses while enabling cybersecurity experts to expand their reach and credibility.
              </p>
              <p className="text-xl font-medium text-red-400">
                Join us in shaping the future of cybersecurity collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}; 