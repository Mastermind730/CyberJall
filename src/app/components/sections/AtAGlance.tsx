"use client";
import React, { useState } from 'react';

const CyberJallBanner = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto border border-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-red-500">Cyber</span>
            <span className="text-orange-400">Jall</span>
          </h1>
          <span className="ml-3 bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
            New Platform
          </span>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
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
            <h2 className="text-xl font-semibold text-gray-100">
              India&apos;s Collaborative Cybersecurity Marketplace
            </h2>
            <p className="text-gray-300 leading-relaxed">
              CyberJall revolutionizes cybersecurity by connecting businesses with trusted experts through 
              a streamlined marketplace. Customize protection plans and stay secure in today&apos;s evolving 
              threat landscape.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Verified Experts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-400/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Collaborative Approach</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'businesses' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-100">For Businesses</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Find the right cybersecurity services tailored to your specific needs from our network of 
              verified experts. Our marketplace simplifies the process of securing your business.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customized security solutions</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Vetted cybersecurity partners</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Transparent pricing and reviews</span>
              </li>
            </ul>
          </div>
        )}
        
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-400/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-100">For Security Providers</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Showcase your expertise to businesses seeking cybersecurity solutions. Grow your client base 
              through our trusted marketplace platform.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access to qualified leads</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Profile showcasing your specialties</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Streamlined project management</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
        <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CyberJallBanner;