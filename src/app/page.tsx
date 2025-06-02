import type { NextPage } from 'next';
import { Hero } from './components/Hero';
import { AboutUs } from './components/sections/AboutUs';
import { SmartestChoice } from './components/sections/SmartestChoice';
import { WhatWeOffer } from './components/sections/WhatWeOffer';
// import { Scope } from './components/sections/Scope';
// import { HowItWorks } from './components/sections/HowItWorks';
// import { GetStarted } from './components/sections/GetStarted';
import { SecurityFeatures } from './components/sections/SecurityFeatures';
import { HowWeWork } from './components/sections/HowWeWork';
import { PlatformFeatures } from './components/sections/PlatformFeatures';
// import ClientLogoShowcase from './components/ClientCarousel';
import EntityShowcase from './components/ClientCarousel';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />
      <EntityShowcase/>
      <AboutUs />
      <SmartestChoice />
      <WhatWeOffer />
      {/* <Scope /> */}
      {/* <HowItWorks /> */}
      {/* <GetStarted /> */}
      <SecurityFeatures />
      <HowWeWork />
      <PlatformFeatures />
    </main>
  );
};

export default Home;
