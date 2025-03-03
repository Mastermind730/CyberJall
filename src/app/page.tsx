import type { NextPage } from 'next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default Home;
