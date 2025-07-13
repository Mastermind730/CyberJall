'use client';
import type { FC } from 'react';
import Image from 'next/image';

export const SmartestChoice: FC = () => {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Heading, subheading and image */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Smartest Choice
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Here&apos;s why CyberJall is your smartest choice for vulnerability identification and management.
            </p>
            
            {/* Added Image */}
            <div className="relative h-72 w-full rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:border-red-500/50">
              <Image
                src="/smart_choice.png" // Replace with your image path
                alt="Cyber Security"
                fill
                className="object-cover animate-bounce hover:animate-pulse"
                priority
              />
              {/* <div className="absolute inset-0 bg-black/30"></div> */}
            </div>
          </div>

          {/* Right side - Cards grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-6">
                {/* Expert Teams Card */}
                <div className="group h-[250px] relative transform transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition duration-500 group-hover:border-red-500/50 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-red-500/20 group-hover:to-red-600/20">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white transition duration-500 group-hover:text-red-400">
                        Expert Teams
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-16 transition duration-500 group-hover:text-gray-300">
                      Our teams consist of highly skilled professionals with extensive experience in vulnerability assessment.
                    </p>
                  </div>
                </div>

                {/* Global Coverage Card */}
                <div className="group h-[250px] relative transform transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition duration-500 group-hover:border-red-500/50 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-red-500/20 group-hover:to-red-600/20">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935M3.055 11a7 7 0 1113.89 0M3.055 11a7 7 0 0113.89 0" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white transition duration-500 group-hover:text-red-400">
                        Global Coverage
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-16 transition duration-500 group-hover:text-gray-300">
                      We provide 24/7 coverage across all major regions, ensuring comprehensive vulnerability management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                {/* Rapid Response Card */}
                <div className="group h-[250px] relative transform transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition duration-500 group-hover:border-red-500/50 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-red-500/20 group-hover:to-red-600/20">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white transition duration-500 group-hover:text-red-400">
                        Rapid Response
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-16 transition duration-500 group-hover:text-gray-300">
                      Our team quickly assesses and responds to reported vulnerabilities, ensuring timely resolution.
                    </p>
                  </div>
                </div>

                {/* Industry Standards Card */}
                <div className="group h-[250px] relative transform transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition duration-500 group-hover:border-red-500/50 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center transition duration-500 group-hover:from-red-500/20 group-hover:to-red-600/20">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white transition duration-500 group-hover:text-red-400">
                        Industry Standards
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed pl-16 transition duration-500 group-hover:text-gray-300">
                      We follow industry best practices and compliance standards for vulnerability reporting and management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-500/10 to-transparent blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/10 to-transparent blur-3xl opacity-20"></div>
    </section>
  );
};