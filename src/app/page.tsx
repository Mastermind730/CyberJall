import type { NextPage } from 'next';
import { Hero } from './components/Hero';
import { AboutUs } from './components/sections/AboutUs';
import { SmartestChoice } from './components/sections/SmartestChoice';
import { WhatWeOffer } from './components/sections/WhatWeOffer';
import { Scope } from './components/sections/Scope';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />
      <AboutUs />
      <SmartestChoice />
      <WhatWeOffer />
      <Scope />
    </main>
  );
};

export default Home;
