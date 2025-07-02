import React from 'react';

export const SecurityFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="security-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#security-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Header */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <h3 className="text-lg font-medium text-red-500 mb-4">
              Embrace innovation with our game-changing platform.
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Shedding Light on Your Security Blind Spots
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Today&apos;s relentless cyber threats demand a security strategy that is just as relentless and proactive. 
              That&apos;s why we&apos;ve engineered an all-in-one platform that gives you everything you need to secure your digital innovation.
            </p>
          </div>

          {/* Right side - Features Timeline */}
          <div className="lg:w-3/5 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 h-full w-px bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent"></div>

            {/* Features */}
            <div className="space-y-16">
              {/* Feature 1 */}
              <div className="relative flex items-center group h-32">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-24 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    Recognize Everything
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Understand the far reaches of your attack surface better than your attackers.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative flex items-center group h-32">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-24 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    Discover More
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Rely on a global community of trusted researchers to continuously find issues that other approaches miss.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative flex items-center group h-32">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-24 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    Justify & Prioritize
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Always know which bugs to fix. Receive only valid vulnerabilities, eliminate duplicates and false positives.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative flex items-center group h-32">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-24 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    Fix Quickly
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Solve quickly with our innovative suite of services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};