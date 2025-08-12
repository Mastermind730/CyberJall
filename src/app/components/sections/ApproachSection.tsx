"use client";
import React, { useState } from 'react';

const CyberJallPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                CyberJall
              </h1>
              <span className="ml-3 bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                New Platform
              </span>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'businesses', label: 'For Businesses' },
                { id: 'providers', label: 'For Providers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-gray-700 text-white shadow'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-100">
                  India&apos;s First Collaborative Cybersecurity Marketplace
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
                  CyberJall revolutionizes digital protection by connecting businesses with vetted experts through 
                  an intelligent marketplace. Customize comprehensive security plans and stay ahead of evolving threats.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg">
                    <div className="p-2 bg-red-500/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">Verified Experts</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg">
                    <div className="p-2 bg-orange-400/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">Collaborative Ecosystem</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'businesses' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-100">Enterprise-Grade Protection Made Simple</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Find precisely tailored cybersecurity services from our network of certified experts. 
                  Our marketplace eliminates the complexity of securing your digital assets.
                </p>
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Customized security solutions",
                    "Vetted cybersecurity partners",
                    "Transparent pricing and reviews",
                    "Continuous protection monitoring"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'providers' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-400/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-100">Amplify Your Security Expertise</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Showcase your capabilities to businesses seeking cybersecurity solutions. 
                  Grow your practice through our trusted marketplace platform.
                </p>
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Access to qualified enterprise leads",
                    "Detailed profile showcasing your specialties",
                    "Streamlined project management tools",
                    "Performance-based reputation system"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl border border-gray-700/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-red-500">The Cybersecurity</span>{' '}
              <span className="text-orange-400">Challenge</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl">
              Traditional approaches leave businesses vulnerable in today&apos;s threat landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                The cybersecurity market is fragmented and opaque. Businesses struggle to find 
                trustworthy partners, while providers face challenges demonstrating their value.
              </p>
              
              <ul className="space-y-5">
                {[
                  { text: "Confusing array of service options", color: "orange" },
                  { text: "Lack of pricing transparency", color: "red" },
                  { text: "Rigid, one-size-fits-all solutions", color: "orange" },
                  { text: "No collaboration between providers", color: "red" },
                  { text: "Difficulty measuring effectiveness", color: "orange" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`text-2xl mr-4 ${item.color === 'orange' ? 'text-orange-400' : 'text-red-500'}`}>•</span>
                    <span className="text-gray-300 text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-orange-400 mb-4">
                The Fragmentation Problem
              </h3>
              <p className="text-gray-300 text-center text-lg">
                CyberJall brings clarity and collaboration to cybersecurity, 
                making protection accessible for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Approach */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-2xl shadow-2xl border border-gray-700/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-red-500">The CyberJall</span>{' '}
              <span className="text-orange-400">Difference</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A revolutionary approach to cybersecurity services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-orange-400">Our Core Advantages</h3>
              
              <ul className="space-y-6">
                {[
                  "Verified provider network with performance metrics",
                  "Build custom protection packages from multiple vendors",
                  "Transparent pricing and service level agreements",
                  "AI-powered security health scoring",
                  "Community insights and threat intelligence sharing",
                  "Continuous monitoring and improvement recommendations"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`text-2xl mr-4 ${index % 2 === 0 ? 'text-orange-400' : 'text-red-500'}`}>✓</span>
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 p-8 rounded-xl border-2 border-orange-500/30 flex flex-col justify-center backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-center text-orange-400 mb-6">
                Unified Cybersecurity Ecosystem
              </h3>
              <p className="text-gray-300 text-center text-lg mb-6">
                One platform connecting businesses with the right security experts for their unique needs
              </p>
              <div className="flex justify-center">
                <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-red-500">How CyberJall</span>{' '}
              <span className="text-orange-400">Works</span>
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Simple three-step process to comprehensive protection
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Discover & Compare",
                  description: "Explore cybersecurity solutions across all domains",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  border: "red"
                },
                {
                  title: "Evaluate Providers",
                  description: "Review verified profiles and case studies",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  border: "orange"
                },
                {
                  title: "Get Protected",
                  description: "Receive a tailored cybersecurity plan",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  border: "red"
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/50 p-6 rounded-xl border-t-4 ${step.border === 'red' ? 'border-red-500' : 'border-orange-500'} hover:bg-gray-800/70 transition-all`}
                >
                  <div className="flex items-center mb-5">
                    <div className={`${step.border === 'red' ? 'bg-red-500' : 'bg-orange-500'} text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4`}>
                      {index + 1}
                    </div>
                    <h4 className={`text-xl font-bold ${step.border === 'red' ? 'text-red-400' : 'text-orange-400'}`}>
                      {step.title}
                    </h4>
                  </div>
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center">
              Explore the Platform
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberJallPlatform;