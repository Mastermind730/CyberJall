import React from 'react';

const CyberJallBanner = () => {
  return (
    <div className="bg-black mt-20 mb-20 text-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          <span className="text-red-600">Cyber</span>
          <span className="text-orange-500 mr-8">Jall</span>
          At a Glance
        </h1>
        <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
          New
        </span>
      </div>
      
      {/* Tagline */}
      <h2 className="text-xl text-red-600 font-semibold mb-4">
        A new way to secure your business.
      </h2>
      
      {/* Description */}
      <p className="text-gray-300 mb-6">
        CyberJall is India&apos;s first collaborative cybersecurity marketplace — where companies find trusted experts, 
        customize protection plans, and stay secure in a fast-moving threat landscape.
      </p>
      
      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* For Businesses */}
        <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-orange-500">
          <div className="flex items-center mb-3">
            <div className="bg-red-600 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-orange-500">For Businesses</h3>
          </div>
          <p className="text-gray-300">
            Find the right cybersecurity services from verified partners — all in one place.
          </p>
        </div>
        
        {/* For Providers */}
        <div className="bg-gray-900 p-5 rounded-lg border-l-4 border-red-600">
          <div className="flex items-center mb-3">
            <div className="bg-orange-500 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-red-600">For Providers</h3>
          </div>
          <p className="text-gray-300">
            Showcase your expertise, earn trust, and reach new clients faster.
          </p>
        </div>
      </div>
    
    </div>
  );
};

export default CyberJallBanner;