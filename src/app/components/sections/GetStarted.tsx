import React from 'react';

export const GetStarted: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Objects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-500 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 border-2 border-red-500 rounded-lg rotate-45 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-red-400 rotate-12 animate-float-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-red-500/20 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Content Box */}
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-500/10 p-8 md:p-12 max-w-6xl mx-auto relative overflow-hidden border border-red-500/10 hover:border-red-500/20 transition-all duration-500">
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-950/50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative">
            {/* Title */}
            <h2 className="text-center mb-12 relative">
              <span className="text-[2.5rem] font-bold text-white inline-block hover:translate-y-[-2px] transition-transform duration-300">
                Get Started with Our{' '}
              </span>
              <span className="text-[2.5rem] font-bold text-red-500 inline-block hover:translate-y-[-2px] transition-transform duration-300">
                Bug Bounty Platform
              </span>
            </h2>

            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left Side - Text Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-semibold">
                  <span className="text-red-500 hover:text-red-400 transition-colors duration-300">
                    Register here
                  </span>{' '}
                  <span className="text-white">to join us.</span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed hover:text-gray-200 transition-colors duration-300">
                  We would be delighted to discuss the details of our bug bounty platform and how it can benefit your organization. Please let me know if you have any questions or would like to schedule a call to explore the possibilities further.
                </p>
                <a
                  href="/register"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/20"
                >
                  Register Now
                </a>
              </div>

              {/* Right Side - Illustration */}
              <div className="flex-1 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="relative w-full aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg border border-red-500/20">
                    {/* Decorative Elements */}
                    <div className="absolute w-full h-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-400/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    {/* Contact Form Illustration */}
                    <div className="absolute right-4 bottom-4 w-2/3 h-2/3 transform hover:scale-105 transition-transform duration-500">
                      <div className="w-full h-full bg-gray-800 rounded-xl shadow-lg p-4 border border-red-500/10">
                        <div className="w-full h-4 bg-red-400/20 rounded mb-3"></div>
                        <div className="w-3/4 h-4 bg-red-400/10 rounded mb-3"></div>
                        <div className="w-1/2 h-4 bg-red-400/5 rounded"></div>
                      </div>
                    </div>
                    {/* Person Icon */}
                    <div className="absolute left-8 top-1/4 w-1/2 transform hover:scale-105 transition-transform duration-500">
                      <div className="w-16 h-16 bg-red-500/30 rounded-full mb-2 border border-red-400/30"></div>
                      <div className="w-24 h-3 bg-red-400/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 