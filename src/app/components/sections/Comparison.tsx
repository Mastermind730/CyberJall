"use client";
import Image from "next/image";
import Link from "next/link";

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
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
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-red-500 uppercase mb-3">
            Transformation
          </h2>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            From <span className="text-gray-400">Confusion</span> to{" "}
            <span className="text-red-400">Clarity</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-transparent my-6 mx-auto"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What changes when you choose CyberJall for your cybersecurity needs
          </p>
        </div>

        {/* Comparison Component */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="lg:grid lg:grid-cols-2">
            {/* Before Column */}
            <div className="p-10 border-b lg:border-b-0 lg:border-r border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-400">
                  Before CyberJall
                </h3>
                <div className="bg-red-500/10 px-3 py-1 rounded-full text-sm font-medium text-red-400">
                  X-Operator
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    Dozens of unknown vendors
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">No idea who to trust</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Generic pitches</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    Can&apos;t compare services easily
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Confusing onboarding</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    One-size-fits-all options
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    No extra support after sale
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-500/10 p-1 rounded-full mr-4 mt-1">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Unclear outcomes or ROI</span>
                </li>
              </ul>
            </div>

            {/* After Column */}
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-red-400">
                  After CyberJall
                </h3>
                <div className="bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium text-green-400">
                  Offset Operator
                </div>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Curated, verified providers only
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    AI-guided Smart Match feature
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Profiles with ratings, certifications & reviews
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Side-by-side profile comparison tool
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Guided onboarding with CyberJall team
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Choose multiple providers in one engagement
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    1-month extended support & premium Insights
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/10 p-1 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white">
                    Measurable improvement via Cyber Health Score
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
