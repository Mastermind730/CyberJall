// pages/dashboard.js
"use client";
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Dashboard() {
  // const [companyName, setCompanyName] = useState('CyberTech Solutions');
  // const [userName, setUserName] = useState('John Doe');
  const [activeAssetType, setActiveAssetType] = useState('Web App');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>CyberJall Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
      </Head>

      <main className="p-6 md:p-8 lg:p-12">
        <motion.div 
          className="max-w-6xl mx-auto bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden border border-orange-600 border-opacity-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* User Info Section */}
          <motion.div className="flex items-center pb-6 border-b border-orange-500 border-opacity-30 mb-8" variants={itemVariants}>
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-full p-1 mr-4">
              <div className="bg-gray-900 rounded-full p-1">
                <Image
                  src="/logo.png"
                  alt="Company Icon"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-500">{companyName}</h2>
              <p className="text-gray-300">{userName}</p>
            </div>
          </motion.div>

          {/* Asset Type Section */}
          <motion.div className="mb-10" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-4">Select Asset Type</h3>
            <div className="flex flex-wrap gap-4">
              {['Web App', 'API Testing', 'Android','iOS','Network Testing'].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1 ${
                    activeAssetType === type 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium shadow-lg shadow-orange-900/30' 
                      : 'bg-gray-800 border border-orange-600 border-opacity-30 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveAssetType(type)}
                >
                  <i className={`fas ${getIconForAssetType(type)}`}></i>
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Welcome Section */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-6">
              <span className="text-white">Welcome to our </span>
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Bug Bounty Program!</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              No technology is perfect and we believe that working with
              skilled and leading cyber security companies across the globe
              is crucial in identifying weaknesses in any technology. We are
              excited for you to participate as a security company to help
              other business to identify vulnerabilities in their assets.
              Good luck, and Happy Hunting!!!
            </p>
          </motion.div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Animation */}
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 rounded-full opacity-20 blur-xl"></div>
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="relative z-10"
                >
                  <Image
                    src="/security-vector.svg"
                    alt="Security Animation"
                    width={400}
                    height={400}
                    className="drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Stats Card 1 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg hover:shadow-orange-600/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center mr-4">
                    <i className="fas fa-bug text-white text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200">Vulnerabilities Found</h3>
                </div>
                <motion.div 
                  className="text-5xl font-bold text-orange-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  248
                </motion.div>
                <div className="mt-2 text-gray-400 text-sm">+12% from last month</div>
              </div>

              {/* Stats Card 2 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg hover:shadow-orange-600/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center mr-4">
                    <i className="fas fa-shield-alt text-white text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200">Security Score</h3>
                </div>
                <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  ></motion.div>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-gray-400">Score</span>
                  <span className="text-orange-500 font-bold">75%</span>
                </div>
              </div>

              {/* Stats Card 3 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg hover:shadow-orange-600/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center mr-4">
                    <i className="fas fa-trophy text-white text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200">Your Rank</h3>
                </div>
                <motion.div 
                  className="flex items-baseline"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <span className="text-5xl font-bold text-orange-500">Top</span>
                  <span className="text-5xl font-bold ml-2 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">10%</span>
                </motion.div>
                <div className="mt-2 text-gray-400 text-sm">Among 350+ security companies</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Helper function to get appropriate icon for each asset type
function getIconForAssetType(type) {
  switch (type) {
    case 'Web App':
      return 'fa-globe';
    case 'Network':
      return 'fa-network-wired';
    case 'API Testing':
      return 'fa-code';
    case 'Android':
      return 'fa-mobile-alt';
    default:
      return 'fa-shield-alt';
  }
}