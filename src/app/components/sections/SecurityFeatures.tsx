"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ModernCard } from "../ui/modern-card";

export const SecurityFeatures: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="py-12 bg-black relative overflow-hidden" ref={ref}>
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 uppercase mb-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm shadow-lg shadow-red-500/10">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Security Excellence
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            Shedding Light on Your{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Security Blind Spots
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Today&apos;s relentless cyber threats demand a security strategy that is just as relentless and proactive.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          {/* Feature 1 */}
          <ModernCard
            variant="glass"
            className="group p-5 hover:shadow-2xl hover:shadow-red-500/10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 p-3 rounded-xl border border-red-500/30">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors">
                  Recognize Everything
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Understand the far reaches of your attack surface better than your attackers.
                </p>
              </div>
            </motion.div>
          </ModernCard>

          {/* Feature 2 */}
          <ModernCard
            variant="glass"
            className="group p-5 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3 rounded-xl border border-orange-500/30">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                  Discover More
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Rely on a global community of trusted researchers to continuously find issues.
                </p>
              </div>
            </motion.div>
          </ModernCard>

          {/* Feature 3 */}
          <ModernCard
            variant="glass"
            className="group p-5 hover:shadow-2xl hover:shadow-red-500/10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                whileHover={{ rotate: -360 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-500/20 to-purple-500/20 p-3 rounded-xl border border-red-500/30">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors">
                  Justify & Prioritize
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Always know which bugs to fix. Receive only valid vulnerabilities.
                </p>
              </div>
            </motion.div>
          </ModernCard>

          {/* Feature 4 */}
          <ModernCard
            variant="glass"
            className="group p-5 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-3 rounded-xl border border-orange-500/30">
                  <svg
                    className="w-6 h-6 text-orange-400"
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
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                  Fix Faster
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Streamline your security processes with intelligent automation and workflows.
                </p>
              </div>
            </motion.div>
          </ModernCard>
        </motion.div>
      </div>
    </section>
  );
};
