/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api-pentesting.js
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle, Code, Server, Database, AlertTriangle, Key, FileSearch, X } from 'lucide-react';

export default function ApiPentesting() {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Form dialog component
  const FormDialog = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={() => setShowForm(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>

        {/* Form Header */}
        <div className="relative p-8 bg-gradient-to-r from-red-600 to-red-700 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/20 rounded-full"
                  style={{
                    width: Math.random() * 100 + 50 + 'px',
                    height: Math.random() * 100 + 50 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animation: `float ${Math.random() * 10 + 10}s infinite linear`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <motion.button 
            onClick={() => setShowForm(false)}
            className="absolute right-6 top-6 text-white/80 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white">Book a Free Consultation</h2>
            <p className="text-center mt-3 text-lg text-red-100">with our Cyber Security Specialist</p>
          </motion.div>
        </div>

        {/* Form Content */}
        <div className="p-8 relative">
          <form className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 group-hover:border-red-300"
                  placeholder="Your name"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </motion.div>

            {/* Work Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 group-hover:border-red-300"
                  placeholder="you@company.com"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </motion.div>

            {/* Phone Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gradient-to-r from-red-50 to-orange-50 text-gray-500 sm:text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-r-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 group-hover:border-red-300"
                  placeholder="Your phone number"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </motion.div>

            {/* Company Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 group-hover:border-red-300"
                  placeholder="Your company name"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </motion.div>

            {/* Newsletter Subscription - Full Width */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="col-span-2 flex items-center space-x-3"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="subscribe"
                  defaultChecked
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 transition-colors"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 transform scale-75 opacity-0 blur-sm peer-checked:opacity-100 transition-all duration-300"></div>
              </div>
              <label htmlFor="subscribe" className="text-sm text-gray-600">
                Subscribe to our weekly newsletter to stay updated with our latest security insights and updates!
              </label>
            </motion.div>

            {/* Submit Button - Full Width */}
            <motion.button
              type="submit"
              className="col-span-2 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative block py-4 px-6 text-white font-semibold rounded-md shadow-lg text-lg">
                SUBMIT
              </span>
              <div className="absolute inset-0 rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="col-span-2 text-sm text-center text-gray-500 mt-4"
            >
              By clicking submit, you agree to our{' '}
              <a href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                privacy policy
              </a>
            </motion.p>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center space-x-4 max-w-3xl mx-auto"
          >
            <div className="flex-shrink-0">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Shield className="h-6 w-6 text-red-600" />
              </motion.div>
            </div>
            <p className="text-sm text-gray-600">
              Your information is secure and encrypted, we&apos;ll never share your details with third parties.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 mt-10 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-red-900/70 via-black/80 to-orange-900/70"></div>
          <svg className="absolute left-0 top-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <Code className="w-16 h-16 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500 mb-6">
              API Pen Testing
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-gray-300">
              Find the Right API Security Partner on CyberJall
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
            className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-red-500/10"
          >
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 text-gray-200"
            >
              APIs are the backbone of modern applications, enabling seamless communication between services, platforms, and users. However, misconfigured or vulnerable APIs can expose your business to data breaches, unauthorized access, and compliance risks. CyberJall connects you with top API security experts to help secure your APIs against cyber threats.
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="flex justify-center"
            >
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-600/30 transform hover:scale-105"
              >
                Get Started Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why You Need Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
              Why Your Business Needs API Security Testing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                icon: <Key className="w-10 h-10" />, 
                title: "Prevent Unauthorized Access", 
                description: "Identify and fix authentication & authorization flaws."
              },
              { 
                icon: <Lock className="w-10 h-10" />, 
                title: "Secure Sensitive Data", 
                description: "Protect APIs from data leaks, injection attacks, and exposure of critical business information."
              },
              { 
                icon: <CheckCircle className="w-10 h-10" />, 
                title: "Ensure Compliance", 
                description: "Meet security requirements for GDPR, PCI-DSS, HIPAA, ISO 27001, and SOC 2."
              },
              { 
                icon: <AlertTriangle className="w-10 h-10" />, 
                title: "Defend Against OWASP API Top 10 Threats", 
                description: "Protect your APIs from the latest attack techniques."
              },
              { 
                icon: <Server className="w-10 h-10" />, 
                title: "Enhance API Performance & Stability", 
                description: "Reduce security risks that could impact API uptime and reliability."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-500/10 hover:border-orange-500/30 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg mb-4 text-orange-500 group-hover:text-orange-400 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <svg className="absolute w-full h-full opacity-5" viewBox="0 0 800 800">
            <path d="M0,100 L800,100 M0,200 L800,200 M0,300 L800,300 M0,400 L800,400 M0,500 L800,500 M0,600 L800,600 M0,700 L800,700" stroke="url(#apiGradient)" strokeWidth="2" />
            <path d="M100,0 L100,800 M200,0 L200,800 M300,0 L300,800 M400,0 L400,800 M500,0 L500,800 M600,0 L600,800 M700,0 L700,800" stroke="url(#apiGradient)" strokeWidth="2" />
            <defs>
              <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Code className="w-12 h-12" />, 
                title: "API Security Assessment", 
                description: "Comprehensive evaluation of REST, GraphQL, SOAP, and microservices APIs for security vulnerabilities."
              },
              { 
                icon: <AlertTriangle className="w-12 h-12" />, 
                title: "OWASP API Top 10 Testing", 
                description: "In-depth testing against the OWASP API Security Top 10 to identify critical vulnerabilities."
              },
              { 
                icon: <FileSearch className="w-12 h-12" />, 
                title: "API Documentation Review", 
                description: "Expert analysis of API specifications to identify security gaps and design flaws before implementation."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 rounded-xl overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 p-4 rounded-lg w-20 h-20 flex items-center justify-center mb-6 text-orange-500 group-hover:text-orange-400 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 to-orange-500 hidden md:block"></div>
            
            {[
              { 
                title: "Describe Your API Security Needs", 
                description: "Share details about your APIs, technology stack, and security requirements."
              },
              { 
                title: "Get Matched With Security Experts", 
                description: "CyberJall connects you with verified API security specialists."
              },
              { 
                title: "Compare & Select Your Partner", 
                description: "Review proposals, methodologies, and pricing to find your ideal security partner."
              },
              { 
                title: "Expert Testing & Remediation Guidance", 
                description: "Receive comprehensive vulnerability assessment and actionable security recommendations."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-12 md:mb-24"
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-red-500/20 hover:border-orange-500/30 shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-red-600 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold ml-4 text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare & Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            <path d="M0,50 Q25,25 50,50 Q75,75 100,50" stroke="url(#compareGradient)" strokeWidth="1" fill="none" />
            <path d="M0,30 Q25,55 50,30 Q75,5 100,30" stroke="url(#compareGradient)" strokeWidth="1" fill="none" />
            <path d="M0,70 Q25,95 50,70 Q75,45 100,70" stroke="url(#compareGradient)" strokeWidth="1" fill="none" />
            <defs>
              <linearGradient id="compareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Compare & Choose API Security Providers</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              On CyberJall, you can explore and compare API security experts based on:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Testing Approach" },
              { title: "Industry Expertise" },
              { title: "Security Standards & Certifications" },
              { title: "Pricing & Packages" },
              { title: "Client Reviews & Ratings" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-red-500/20 hover:border-orange-500/30 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 text-center group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors duration-300">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CyberJall Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Why Choose CyberJall for API Security?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Verified API Security Experts", 
                description: "Work with certified cybersecurity professionals."
              },
              { 
                title: "Customizable Testing Packages", 
                description: "Choose API security services based on your business needs."
              },
              { 
                title: "Transparent Pricing & Reporting", 
                description: "Clear insights into vulnerabilities and remediation steps."
              },
              { 
                title: "One Platform for All Cybersecurity Needs", 
                description: "Simplify vendor selection and security management."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-red-500/20 hover:border-orange-500/30 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 inline-block">
              <p className="text-lg md:text-xl font-medium text-white mb-6">
                <span className="text-orange-500">🔒</span> Secure your APIs today! Browse top API Security Testing providers on CyberJall now.
              </p>
              <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-600/30 transform hover:scale-105">
                Browse Providers
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Dialog */}
      <AnimatePresence>
        {showForm && <FormDialog />}
      </AnimatePresence>
    </div>
  );
}