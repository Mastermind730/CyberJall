"use client";
import type { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ModernSection } from "../ui/modern-section";
import { ModernCard } from "../ui/modern-card";
import { ModernButton } from "../ui/modern-button";

export const AboutUs: FC = () => {
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
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <ModernSection background="grid" spacing="lg">
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
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-gradient-to-l from-purple-500 to-red-500 rounded-full blur-3xl"
        />
      </div>

      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center mb-12 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 uppercase mb-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm shadow-lg shadow-red-500/10">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            About CyberJall
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
        >
          Cybersecurity,{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">
              Simplified
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          We bridge the gap between complex cybersecurity needs and accessible
          solutions, making enterprise-grade protection available to businesses
          of all sizes.
        </motion.p>
      </motion.div>

      {/* Two Column Layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="lg:grid lg:grid-cols-2 lg:gap-12 items-start relative z-10"
      >
        {/* Left Column - Cards */}
        <div className="space-y-5">
          {/* Welcome Card */}
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors">
                  Welcome to CyberJall
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted cybersecurity marketplace where businesses find
                  verified providers, compare services, and build custom
                  security solutions.
                </p>
              </div>
            </motion.div>
          </ModernCard>

          {/* Mission Card */}
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To democratize cybersecurity by making premium protection
                  accessible, transparent, and simple for every organization.
                </p>
              </div>
            </motion.div>
          </ModernCard>

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
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
                ),
                title: "Clarity",
                desc: "Transparent pricing and verified providers.",
                gradient: "from-blue-500/20 to-cyan-500/20",
                color: "text-blue-400",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
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
                title: "Control",
                desc: "Customize services to match your needs.",
                gradient: "from-yellow-500/20 to-orange-500/20",
                color: "text-yellow-400",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
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
                ),
                title: "Confidence",
                desc: "Verified providers with performance metrics.",
                gradient: "from-green-500/20 to-emerald-500/20",
                color: "text-green-400",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
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
                title: "Community",
                desc: "Shared knowledge from security experts.",
                gradient: "from-purple-500/20 to-pink-500/20",
                color: "text-purple-400",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ModernCard
                  variant="glass"
                  className="text-center group p-4 hover:scale-105 transition-transform duration-300"
                  animated={false}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mb-2 bg-gradient-to-br ${item.gradient} p-2.5 rounded-lg inline-flex ${item.color}`}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <motion.div
          variants={itemVariants}
          className="relative mt-8 lg:mt-16 space-y-4"
        >
          <ModernCard variant="glow" className="overflow-hidden group">
            <div className="relative h-72 lg:h-96 w-full">
              <Image
                src="/Aboutus.gif"
                alt="CyberJall Platform Dashboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                quality={90}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4"
              ></motion.div>
            </div>
          </ModernCard>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="absolute -top-16 -right-4 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 rounded-2xl p-4 shadow-2xl shadow-red-500/30 border border-red-400/20"
          >
            <div className="text-white text-center">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-xs font-medium opacity-90">
                Expert Support
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <ModernButton
              variant="glow"
              size="lg"
              className="group w-full sm:w-auto"
            >
              <span>Explore Our Platform</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </ModernButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </ModernSection>
  );
};
