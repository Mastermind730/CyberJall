'use client';
import type { FC } from 'react';
import Image from 'next/image';

export const AboutUs: FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-medium tracking-wider text-red-500 uppercase mb-4">
            About CyberJall
          </h2>
          <h1 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
            Cybersecurity, Simplified
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-transparent my-6 mx-auto"></div>
        </div>

        {/* Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Cards */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg transition-all hover:shadow-xl hover:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="bg-red-500/10 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Welcome to CyberJall</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We&apos;re redefining how businesses access cybersecurity services through our centralized, transparent marketplace that connects you with top-tier providers.
              </p>
            </div>

            {/* Decision Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg transition-all hover:shadow-xl hover:border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4">
                Cybersecurity Isn&apos;t Just a Service — <span className="text-red-400">It&apos;s a Decision You Can&apos;t Get Wrong</span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Finding the right cybersecurity partner is overwhelming — too many providers, unclear pricing, and no way to compare.
              </p>
              <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-white font-medium">
                  CyberJall simplifies it all.
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Explore trusted service providers, use Smart Match Filters, compare profiles side-by-side, and get free consultation if you&apos;re unsure.
                </p>
              </div>
            </div>

            {/* Small Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Clarity
                </h4>
                <p className="text-gray-400 text-sm">
                  Transparent pricing and service details from vetted providers.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Control
                </h4>
                <p className="text-gray-400 text-sm">
                  Customize and bundle services to match your exact needs.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Confidence
                </h4>
                <p className="text-gray-400 text-sm">
                  Verified providers with performance metrics and reviews.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Community
                </h4>
                <p className="text-gray-400 text-sm">
                  Shared knowledge from security professionals worldwide.
                </p>
              </div>
            </div>

            {/* Final Statement */}
            <div className="mt-8 bg-gray-800/30 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <p className="text-white text-center font-light">
                Whether you&apos;re a startup or an enterprise — CyberJall gives you <span className="text-red-400 font-medium">clarity, control, and confidence</span> in every cybersecurity decision.
              </p>
            </div>
          </div>

          {/* Right Column - Single Image Container */}
          <div className="relative mt-10 lg:mt-0">
            <div className="sticky top-24">
              <div className="relative h-[700px] min-h-[920px] w-full rounded-xl overflow-hidden">
                <Image
                  src="/aboutus.png"
                  alt="CyberJall Security Platform"
                  fill
                  className="object-cover rounded-xl"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="max-w-xs">
                    <div className="bg-red-500/10 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center mb-4">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-white text-xs font-medium">Trusted Network</span>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">The Smart Way to Secure Your Business</h3>
                    <p className="text-gray-300">Compare, customize, and connect with confidence through our curated marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/3 -translate-x-1/2 opacity-10">
          <svg className="w-64 h-64 text-red-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeWidth="1" 
              d="M100,20 L180,100 L100,180 L20,100 Z" 
              className="animate-[spin_30s_linear_infinite]"/>
          </svg>
        </div>
      </div>
    </section>
  );
};