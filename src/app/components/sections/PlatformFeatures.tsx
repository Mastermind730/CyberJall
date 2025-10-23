"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ModernCard } from "../ui/modern-card";
import { ModernButton } from "../ui/modern-button";
import Link from "next/link";

export const PlatformFeatures = () => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const features = [
    {
      id: 1,
      title: "Multiple solutions on a single platform",
      description:
        "Access all your cybersecurity needs in one centralized location.",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      gradient: "from-red-500 to-orange-500",
      color: "text-red-400",
    },
    {
      id: 2,
      title: "Platform-powered, best-in-class triage",
      description:
        "Efficiently prioritize and manage vulnerabilities with our advanced triage system.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-yellow-500",
      color: "text-orange-400",
    },
    {
      id: 3,
      title: "The right security researchers at the right time",
      description:
        "Connect with specialized security experts when you need them most.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-yellow-500 to-green-500",
      color: "text-yellow-400",
    },
    {
      id: 4,
      title: "Automated, orchestrated workflows",
      description:
        "Streamline your security processes with intelligent automation.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      gradient: "from-green-500 to-blue-500",
      color: "text-green-400",
    },
    {
      id: 5,
      title: "Rich reporting and recommendations",
      description:
        "Gain valuable insights with comprehensive vulnerability reports.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-purple-500",
      color: "text-blue-400",
    },
    {
      id: 6,
      title: "Real-time integration with your SDLC",
      description:
        "Seamlessly incorporate security into your development lifecycle.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      color: "text-purple-400",
    },
  ];

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
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
              Platform Capabilities
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            Continuous, proactive security{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              built for enterprises
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Our multi-solution SaaS platform delivers high-impact insights that
            help you secure what you build.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-8"
        >
          {features.map((feature, index) => (
            <ModernCard
              key={feature.id}
              variant="glass"
              className="group p-5 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-gradient-to-br ${feature.gradient} bg-opacity-20 p-3 rounded-xl border border-red-500/30`}
                  >
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ModernCard>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/products">
            <ModernButton variant="glow" size="lg">
              Explore Platform
            </ModernButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
