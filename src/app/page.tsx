/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { SmoothScroll } from "./components/SmoothScroll";
import { PageLoader } from "./components/PageLoader";

// Lazy load heavy components for better performance with aggressive optimization
const AboutUs = dynamic(
  () =>
    import("./components/sections/AboutUs").then((mod) => ({
      default: mod.AboutUs,
    })),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const SecurityFeatures = dynamic(
  () =>
    import("./components/sections/SecurityFeatures").then((mod) => ({
      default: mod.SecurityFeatures,
    })),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const PlatformFeatures = dynamic(
  () =>
    import("./components/sections/PlatformFeatures").then((mod) => ({
      default: mod.PlatformFeatures,
    })),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const EntityShowcase = dynamic(() => import("./components/ClientCarousel"), {
  loading: () => <div className="h-64 bg-black" />,
  ssr: false,
});

const InsightsSection = dynamic(
  () =>
    import("./components/sections/CyberInsights").then((mod) => ({
      default: mod.InsightsSection,
    })),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const ComparisonSection = dynamic(
  () =>
    import("./components/sections/Comparison").then((mod) => ({
      default: mod.ComparisonSection,
    })),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const CyberJallPlatform = dynamic(
  () => import("./components/sections/ApproachSection"),
  {
    loading: () => <div className="h-96 bg-black" />,
    ssr: false,
  }
);

const ServicesDisplay = dynamic(() => import("./components/servicesDisplay"), {
  loading: () => <div className="h-96 bg-black" />,
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      {/* Page Loader with company logo */}
      <PageLoader />

      <SmoothScroll>
        <main className="min-h-screen bg-black relative overflow-x-hidden">
          {/* Optimized animated background gradient orbs - reduced animation */}
          <div className="fixed inset-0 pointer-events-none opacity-30">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div
              className="absolute bottom-40 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Hero Section - Load immediately with priority */}
          <div className="bg-black relative">
            <Hero />
          </div>

          {/* Lazy loaded sections with minimal spacing */}
          <Suspense fallback={<div className="h-64 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
              <div className="relative z-10">
                <EntityShowcase />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
              <div className="relative z-10">
                <AboutUs />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"></div>
              <div className="relative z-10">
                <ServicesDisplay />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
              <div className="relative z-10">
                <InsightsSection />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
              <div className="relative z-10">
                <CyberJallPlatform />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 via-transparent to-transparent"></div>
              <div className="relative z-10">
                <ComparisonSection />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/5 to-transparent"></div>
              <div className="relative z-10">
                <SecurityFeatures />
              </div>
            </section>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-black" />}>
            <section className="py-4 md:py-6 bg-black relative">
              <div className="relative z-10">
                <PlatformFeatures />
              </div>
            </section>
          </Suspense>
        </main>
      </SmoothScroll>
    </>
  );
};

export default Home;
