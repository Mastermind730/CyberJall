import React from "react";

export const SecurityFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Header */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <h3 className="text-base font-medium bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-3">
              Embrace innovation with our game-changing platform.
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Shedding Light on Your Security Blind Spots
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Today&apos;s relentless cyber threats demand a security strategy
              that is just as relentless and proactive. That&apos;s why
              we&apos;ve engineered an all-in-one platform that gives you
              everything you need to secure your digital innovation.
            </p>
          </div>

          {/* Right side - Features Timeline */}
          <div className="lg:w-3/5 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 h-full w-px bg-gradient-to-b from-red-500/50 via-orange-500/30 to-transparent"></div>

            {/* Features */}
            <div className="space-y-12">
              {/* Feature 1 */}
              <div className="relative flex items-center group h-24">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-red-500 group-hover:text-orange-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-20 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    Recognize Everything
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Understand the far reaches of your attack surface better
                    than your attackers.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative flex items-center group h-24">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-red-500 group-hover:text-orange-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-20 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    Discover More
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Rely on a global community of trusted researchers to
                    continuously find issues that other approaches miss.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative flex items-center group h-24">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-red-500 group-hover:text-orange-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-20 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    Justify & Prioritize
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Always know which bugs to fix. Receive only valid
                    vulnerabilities, eliminate duplicates and false positives.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative flex items-center group h-24">
                <div className="absolute left-8 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-red-500 group-hover:text-orange-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-20 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
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
