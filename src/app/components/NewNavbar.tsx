"use client";
import React from 'react'
import { motion } from 'framer-motion'

const NewNavbar = () => {
    
  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-red-600">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="h-12 w-12 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z"
                  stroke="#FF4500"
                  strokeWidth="4"
                  fill="none"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  d="M50,20 L80,35 L80,65 L50,80 L20,65 L20,35 Z"
                  stroke="#FF4500"
                  strokeWidth="2"
                  fill="black"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  cx="50"
                  cy="50"
                  r="15"
                  fill="#FF4500"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">CyberJall</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8 items-center"
          >
            <a href="/about" className={` text-red-300 hover:text-red-500 transition-colors `}>About</a>
            <a href="/services" className={`text-red-300 hover:text-red-500 transition-colors `}>Services</a>
            <a href="/contact_us" className={`text-red-300 hover:text-red-500 transition-colors `}>Contact Us</a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2 rounded-full font-semibold shadow-lg shadow-red-600/30"
            >
              Get Started
            </motion.button>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </nav>  )
}

export default NewNavbar