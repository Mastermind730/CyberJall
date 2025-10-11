/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/sections/AboutUs";
import { SmartestChoice } from "./components/sections/SmartestChoice";
import { WhatWeOffer } from "./components/sections/WhatWeOffer";
// import { Scope } from './components/sections/Scope';
// import { HowItWorks } from './components/sections/HowItWorks';
// import { GetStarted } from './components/sections/GetStarted';
import { SecurityFeatures } from "./components/sections/SecurityFeatures";
import { HowWeWork } from "./components/sections/HowWeWork";
import { PlatformFeatures } from "./components/sections/PlatformFeatures";
// import ClientLogoShowcase from './components/ClientCarousel';
import EntityShowcase from "./components/ClientCarousel";
import CyberJallBanner from "./components/sections/AtAGlance";
import ProblemSection from "./components/sections/ProblemSection";
import ApproachSection from "./components/sections/ApproachSection";
import { RequirementSubmission } from "./components/sections/OnBoarding";
import { InsightsSection } from "./components/sections/CyberInsights";
import { ComparisonSection } from "./components/sections/Comparison";
import CyberJallPlatform from "./components/sections/ApproachSection";
import ServicesDisplay from "./components/servicesDisplay";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-black">
        <Hero />
      </div>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Client/Entity Showcase */}
      <section className="py-16 md:py-20 bg-black relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          <EntityShowcase />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
        <div className="relative z-10">
          <AboutUs />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Services Display */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          <ServicesDisplay />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Insights Section */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
        <div className="relative z-10">
          <InsightsSection />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Smart Choice Section */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          <SmartestChoice />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Platform Approach */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
        <div className="relative z-10">
          <CyberJallPlatform />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          <ComparisonSection />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Security Features */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
        <div className="relative z-10">
          <SecurityFeatures />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Platform Features */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          <PlatformFeatures />
        </div>
      </section>
    </main>
  );
};

export default Home;
