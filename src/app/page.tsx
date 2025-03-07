import type { NextPage } from 'next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/sections/AboutUs';
import { SmartestChoice } from './components/sections/SmartestChoice';
import { WhatWeOffer } from './components/sections/WhatWeOffer';
import { Scope } from './components/sections/Scope';
import { HowItWorks } from './components/sections/HowItWorks';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <AboutUs />
      <SmartestChoice />
      <WhatWeOffer />
      <Scope />
      <HowItWorks />
    </main>
  );
};

export default Home;
