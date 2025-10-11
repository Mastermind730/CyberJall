"use client";
import Image from "next/image";

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-wider bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase mb-2">
            Exclusive Intelligence
          </h2>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            CyberJall{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 my-4 mx-auto"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Empowering businesses with the intelligence, tools, and support to
            stay ahead of evolving cyber threats.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Our Unique Approach
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                CyberJall makes cybersecurity intelligence more collaborative,
                actionable, and tailored to your specific business needs.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3 text-red-400">
                  🔍
                </div>
                <h4 className="text-base font-semibold text-white mb-2">
                  Industry Case Studies
                </h4>
                <p className="text-gray-300 text-sm">
                  Real-world examples of how businesses tackled cybersecurity
                  challenges.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3 text-red-400">
                  📰
                </div>
                <h4 className="text-base font-semibold text-white mb-2">
                  News Feed
                </h4>
                <p className="text-gray-300 text-sm">
                  Curated threat alerts, regulatory shifts, and innovation
                  highlights.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3 text-red-400">
                  🎓
                </div>
                <h4 className="text-base font-semibold text-white mb-2">
                  Expert Webinars
                </h4>
                <p className="text-gray-300 text-sm">
                  Live sessions with top professionals on trends and compliance.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-red-500/30 transition-colors">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3 text-red-400">
                  📊
                </div>
                <h4 className="text-base font-semibold text-white mb-2">
                  Cyber Health Score
                </h4>
                <p className="text-gray-300 text-sm">
                  AI-powered analysis of your security posture and risk
                  exposure.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative mt-8 lg:mt-0 h-[400px] rounded-lg overflow-hidden border border-gray-700">
            <Image
              src="/insights.png" // Replace with your image
              alt="CyberJall Insights Dashboard"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-5 border border-gray-700 max-w-md">
                <h3 className="text-lg font-bold text-white mb-2">
                  Personalized Security Suggestions
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Receive tailored action points based on your health score,
                  industry, and business stage.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 px-2 py-1 rounded-full text-xs font-medium text-red-400">
                    New Feature
                  </div>
                  <span className="text-gray-400 text-xs">
                    Compliance Readiness Resources
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-colors">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-2 rounded-lg mr-3">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-white">
                Verified Providers
              </h4>
            </div>
            <p className="text-gray-300 text-sm">
              Access our network of pre-vetted cybersecurity experts and
              solution providers.
            </p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-colors">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-2 rounded-lg mr-3">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-white">
                Fast Implementation
              </h4>
            </div>
            <p className="text-gray-300 text-sm">
              Get from insights to implementation with our streamlined
              onboarding.
            </p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-red-500/30 transition-colors">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-2 rounded-lg mr-3">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-white">
                Continuous Protection
              </h4>
            </div>
            <p className="text-gray-300 text-sm">
              Regular updates ensure your defenses evolve with emerging threats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
