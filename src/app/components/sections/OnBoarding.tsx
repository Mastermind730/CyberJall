'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const RequirementSubmission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'process'>('submit');

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

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-red-500 uppercase mb-3">
            Cybersecurity Solutions
          </h2>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Submit Your <span className="text-red-400">Opportunity Requirements</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-transparent my-6 mx-auto"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The cybersecurity landscape is broken for most businesses. Let us help you fix it.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'submit' ? 'bg-gray-700 shadow-sm text-red-400' : 'text-gray-400 hover:text-white'}`}
            >
              Submit Requirements
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'process' ? 'bg-gray-700 shadow-sm text-red-400' : 'text-gray-400 hover:text-white'}`}
            >
              Our Process
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {activeTab === 'submit' ? (
            <div className="lg:grid lg:grid-cols-2">
              {/* Left side - Content */}
              <div className="p-12">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Your Cybersecurity Needs, Matched with the Right Experts
                </h3>
                <p className="text-gray-300 mb-8">
                  At CyberJall, we understand that every business faces unique security challenges — from regulatory requirements to operational risk.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-500/10 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      Use our streamlined requirement form to share key details about your cybersecurity objectives.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-500/10 p-2 rounded-lg mr-4">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      Our expert team reviews your input and connects you with pre-vetted, industry-aligned providers.
                    </p>
                  </div>
                  
                  <div className="pt-6">
                    <Link 
                      href="/cyberrequirements"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      Submit Your Requirements
                      <svg className="ml-3 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Right side - Image Container */}
              <div className="hidden lg:block relative min-h-[500px]">
                <Image
                  src="/req.png" // Replace with your image path
                  alt="Cybersecurity professionals discussing solutions"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900/90"></div>
                <div className="absolute inset-0 flex items-end p-12">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Streamlined Provider Matching</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-red-500/20 p-1 rounded-full mr-3 mt-1">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300">Expert review of your requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-500/20 p-1 rounded-full mr-3 mt-1">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300">Personalized provider recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-500/20 p-1 rounded-full mr-3 mt-1">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300">Transparent pricing comparisons</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Our Matching Process
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-red-500/30 transition-colors">
                  <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Expert Review</h4>
                  <p className="text-gray-300">
                    Your requirement is analyzed by our team to ensure strategic alignment.
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-red-500/30 transition-colors">
                  <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Curated Recommendations</h4>
                  <p className="text-gray-300">
                    Receive tailored options with provider profiles, engagement models, and pricing clarity.
                  </p>
                </div>
                
                {/* Step 3 */}
                <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-red-500/30 transition-colors">
                  <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Simplified Decision-Making</h4>
                  <p className="text-gray-300">
                    Skip the noise — compare only relevant, verified providers that meet your business criteria.
                  </p>
                </div>
                
                {/* Step 4 */}
                <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-red-500/30 transition-colors">
                  <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Onboarding Support</h4>
                  <p className="text-gray-300">
                    CyberJall assists throughout the selection and engagement process for a smooth start.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};