"use client";
import type { FC } from "react";
import Image from "next/image";
import { ModernSection } from "../ui/modern-section";
import { ModernCard } from "../ui/modern-card";
import { ModernButton } from "../ui/modern-button";

export const AboutUs: FC = () => {
  return (
    <ModernSection background="grid" spacing="lg">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold tracking-widest text-red-500 uppercase mb-3 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/5">
          About CyberJall
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Cybersecurity,{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Simplified
          </span>
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We bridge the gap between complex cybersecurity needs and accessible
          solutions, making enterprise-grade protection available to businesses
          of all sizes.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        {/* Left Column - Cards */}
        <div className="space-y-6">
          {/* Welcome Card */}
          <ModernCard variant="feature" className="group">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
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
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Welcome to CyberJall
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted cybersecurity marketplace where businesses find
                  verified providers, compare services, and build custom
                  security solutions.
                </p>
              </div>
            </div>
          </ModernCard>

          {/* Mission Card */}
          <ModernCard variant="feature" className="group">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-orange-400"
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
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To democratize cybersecurity by making premium protection
                  accessible, transparent, and simple for every organization.
                </p>
              </div>
            </div>
          </ModernCard>

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "🎯",
                title: "Clarity",
                desc: "Transparent pricing and verified providers.",
              },
              {
                icon: "⚡",
                title: "Control",
                desc: "Customize services to match your needs.",
              },
              {
                icon: "🛡️",
                title: "Confidence",
                desc: "Verified providers with performance metrics.",
              },
              {
                icon: "🤝",
                title: "Community",
                desc: "Shared knowledge from security experts.",
              },
            ].map((item, index) => (
              <ModernCard
                key={index}
                variant="feature"
                className="text-center group p-3"
              >
                <div className="text-xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </ModernCard>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <ModernButton size="md" className="shadow-lg">
              Explore Our Platform
              <svg
                className="w-4 h-4 ml-1"
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
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative mt-10 lg:mt-0">
          <ModernCard variant="pro" className="overflow-hidden">
            <div className="relative h-72 lg:h-96 w-full">
              <Image
                src="/Aboutus.gif"
                alt="CyberJall Platform Dashboard"
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white text-base font-bold mb-1">
                  Modern Security Dashboard
                </h4>
                <p className="text-gray-300 text-xs">
                  Intuitive interface designed for security professionals.
                </p>
              </div>
            </div>
          </ModernCard>

          {/* Floating Stats */}
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 shadow-lg">
            <div className="text-white text-center">
              <div className="text-xl font-bold">500+</div>
              <div className="text-xs opacity-90">Trusted Providers</div>
            </div>
          </div>

          <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 shadow-lg">
            <div className="text-white text-center">
              <div className="text-xl font-bold">24/7</div>
              <div className="text-xs opacity-90">Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 opacity-5 pointer-events-none">
        <div className="w-48 h-48 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute right-0 bottom-1/3 translate-x-1/2 opacity-5 pointer-events-none">
        <div className="w-48 h-48 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"></div>
      </div>
    </ModernSection>
  );
};
