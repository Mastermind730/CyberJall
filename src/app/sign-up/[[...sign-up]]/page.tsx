"use client";
import { SignIn, SignUp } from '@clerk/nextjs';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';




const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.header 
        className="relative z-10 pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            animate={{ 
              textShadow: ["0 0 5px rgba(255,255,255,0.3)", "0 0 15px rgba(255,255,255,0.5)", "0 0 5px rgba(255,255,255,0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Get started with Bug Bounty Platform
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We would be delighted to discuss the details of our bug bounty platform and how it can benefit your organization.
            Please let us know if you have any questions or would like to schedule a call to explore the possibilities further.
          </motion.p>
        </div>
      </motion.header>

      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-white"
                    whileHover={{ scale: 1.02 }}
                  >
                    For companies who want to run their bug bounty program
                  </motion.h2>
                  <motion.p 
                    className="text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Secure your applications with our comprehensive platform designed for companies of all sizes. 
                    Our expert team provides continuous security monitoring and vulnerability assessment.
                  </motion.p>
                </div>

                <motion.ul 
                  className="space-y-3"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    "Access to verified security researchers",
                    "Detailed vulnerability reports",
                    "Seamless integration with your workflow"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <motion.div 
                        className="text-blue-300 mr-2 rounded-full bg-blue-500/20 p-1"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <span className="text-white/90">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold inline-flex items-center space-x-2 hover:shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Learn More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 bg-blue-400 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="p-8 flex justify-center items-center">
                {/* <div className="relative h-12 mb-6">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md"
                    animate={{ 
                      background: [
                        "linear-gradient(to right, rgb(59, 130, 246), rgb(29, 78, 216))",
                        "linear-gradient(to right, rgb(37, 99, 235), rgb(30, 64, 175))",
                        "linear-gradient(to right, rgb(59, 130, 246), rgb(29, 78, 216))"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  
                </div> */}
                <SignUp  />
              </div>
              <motion.div 
                className="h-32 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  <motion.div 
                    className="w-full h-full"
                    animate={{ 
                      backgroundPosition: ["0% 0%", "100% 100%"] 
                    }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                      background: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: "🔒", delay: 0 },
          { icon: "🛡️", delay: 2 },
          { icon: "⚔️", delay: 4 },
          { icon: "🔍", delay: 1 },
          { icon: "🔐", delay: 3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [50, 0, -50, -100],
            }}
            transition={{
              duration: 10,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;