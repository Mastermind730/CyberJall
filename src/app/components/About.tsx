'use client';
// import Image from 'next/image';
import type { FC } from 'react';

export const About: FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="lg:text-center mb-20">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Securing the Digital Future Together
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-300 lg:mx-auto">
            We are a community-driven ecosystem dedicated to making the digital world safer through innovative collaboration between security companies and organizations.
          </p>
        </div>

        {/* Business Features */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 mb-20">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Business To Business</h3>
            <p className="text-gray-300">India&apos;s pioneering B2B bug bounty platform connecting enterprises with security experts.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Business Collaboration</h3>
            <p className="text-gray-300">Facilitating partnerships between businesses and leading security companies for comprehensive vulnerability assessment.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Secure Environment</h3>
            <p className="text-gray-300">Providing a secure testing environment with robust communication channels and detailed reporting systems.</p>
          </div>
        </div>

        {/* Scope Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Program Scope</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Web Applications',
              'Mobile Applications',
              'APIs',
              'Backend Infrastructure',
              'SaaS Solutions',
              'Cloud Services'
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-white text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-500 mb-3">Rewards</h3>
              <p className="text-gray-300">Competitive compensation for validated security vulnerabilities based on severity and impact.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-500 mb-3">Recognition</h3>
              <p className="text-gray-300">Public acknowledgment and recognition for companies contributing to security improvements.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-500 mb-3">Safe Harbor</h3>
              <p className="text-gray-300">Legal protection guarantee for companies reporting vulnerabilities within program guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 