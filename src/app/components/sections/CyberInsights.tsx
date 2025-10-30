"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const InsightsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Enhanced Grid Background with Glow */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="insights-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="url(#insights-gradient)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient
              id="insights-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#insights-grid)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
        ref={ref}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold tracking-widest bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase mb-3"
          >
            Exclusive Intelligence
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-white sm:text-5xl mb-4"
          >
            CyberJall{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering businesses with the intelligence, tools, and support to
            stay ahead of evolving cyber threats.
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Unique Approach
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                CyberJall makes cybersecurity intelligence more collaborative,
                actionable, and tailored to your specific business needs.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    🔍
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    Industry Case Studies
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Real-world examples of how businesses tackled cybersecurity
                    challenges.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    📰
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    News Feed
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Curated threat alerts, regulatory shifts, and innovation
                    highlights.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    🎓
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    Expert Webinars
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Live sessions with top professionals on trends and
                    compliance.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    📊
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    Cyber Health Score
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    AI-powered analysis of your security posture and risk
                    exposure.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-12 lg:mt-0 h-[500px] rounded-2xl overflow-hidden border-2 border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative h-full rounded-2xl overflow-hidden">
              <Image
                src="/insights.png"
                alt="CyberJall Insights Dashboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/60 to-transparent"></div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-black/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group/card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover/card:text-red-400 transition-colors">
                      Personalized Security Suggestions
                    </h3>
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                      <svg
                        className="w-5 h-5 text-white"
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
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Receive tailored action points based on your health score,
                    industry, and business stage.
                  </p>
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-red-400 border border-red-500/30">
                      🆕 New Feature
                    </div>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Compliance Readiness Resources
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.03, translateY: -5 }}
            className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-red-400"
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
                <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                  Verified Providers
                </h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Access our network of pre-vetted cybersecurity experts and
                solution providers.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, translateY: -5 }}
            className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-red-400"
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
                <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                  Fast Implementation
                </h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get from insights to implementation with our streamlined
                onboarding.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, translateY: -5 }}
            className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-red-400"
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
                <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                  Continuous Protection
                </h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Regular updates ensure your defenses evolve with emerging
                threats.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
