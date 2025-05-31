/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api-pentesting.js
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Code, Server, Database, AlertTriangle, Key, FileSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ApiPentesting() {
  const [isVisible, setIsVisible] = useState(false);
  const router=useRouter();
     const plans = [
    {
      title: "Basic Security Assessment",
      price: "$1,499",
      duration: "4 Month Plan",
      features: [
        "Short-term, intensive assessment",
        "Fast-track security enhancement",
        "Initial vulnerability scan",
        "Focused reporting with remediation recommendations",
        "Critical vulnerability identification and fixes"
      ],
      includes: [
        "Free Membership of CyberJall Insights",
        "1 Month Add on Service by CyberJall"
      ],
      icon: <Shield className="h-12 w-12" />,
      popular: false
    },
    {
      title: "Advanced Protection",
      price: "$2,999",
      duration: "8 Month Plan",
      features: [
        "Mid-term solution with periodic assessments",
        "Balanced, proactive coverage",
        "Extended security focus",
        "Bi-monthly vulnerability scans",
        "Detailed technical reporting",
        "Remediation follow-up",
        "Regular threat updates"
      ],
      includes: [
        "You will get one Cyber-Security Consultant for particular time",
        "Free Membership of CyberJall Insights"
      ],
      icon: <Lock className="h-12 w-12" />,
      popular: true
    },
    {
      title: "Enterprise Shield",
      price: "$4,999",
      duration: "12 Month Plan",
      features: [
        "Year-round comprehensive security",
        "Continuous improvement system",
        "Monthly in-depth scans",
        "Comprehensive reporting",
        "Continuous monitoring",
        "Priority response support",
        "Complete security management"
      ],
      includes: [
        "You will get one more additional Cyber-Security Partner by CyberJall",
        "Free Membership of CyberJall Insights"
      ],
      icon: <Database className="h-12 w-12" />,
      popular: false
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-red-900 via-gray-800 to-black mt-10 text-white overflow-hidden">
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
              <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-orange-600/30 transform hover:scale-105">
                Get Started Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why You Need Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-radial from-red-900 via-gray-800 to-black">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-radial from-red-900 via-gray-800 to-black">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-radial from-red-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-radial from-red-900 via-gray-800 to-black mx-auto mb-8"></div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                        plan.popular ? 'border-2 border-red-600 relative' : 'border border-gray-800'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-red-500 text-white px-4 py-1 text-sm font-bold">
                            MOST POPULAR
                          </div>
                        </div>
                      )}
                      <div className="p-8">
                        <div className="mb-6 text-center">
                          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                            plan.popular ? 'bg-gradient-to-br from-red-600 to-orange-500' : 'bg-gray-800'
                          }`}>
                            {plan.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                          <p className="text-gray-400 text-sm">{plan.duration}</p>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                          <h4 className="text-orange-400 font-semibold mb-2">Includes:</h4>
                          <ul className="space-y-2">
                            {plan.includes.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-red-700 to-orange-900 text-white' 
                              : 'bg-gray-800 text-white border border-gray-700 hover:border-red-500'
                          }`}
                        >
                          Get Started
                        </motion.button>
                      </div>
                      
                    </motion.div>
                    
                    
                  ))}
                  
                </div>
                <motion.div 
  variants={fadeIn}
  className="mt-16 relative"
>
  {/* Background gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/40 to-orange-900/20 rounded-2xl blur-xl"></div>
  
  {/* Main content container */}
  <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-800/90 rounded-2xl border border-red-500/30 p-12 backdrop-blur-sm">
    {/* Decorative elements */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-20 blur-lg"></div>
    </div>
    
    {/* Content */}
    <div className="text-center relative z-10">
      {/* Enhanced heading */}
      <motion.h3 
        className="text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Ready to Secure Your Business?
      </motion.h3>
      
      {/* Enhanced description */}
      <motion.p 
        className="text-gray-300 mb-10 text-lg leading-relaxed max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Each plan offers <span className="text-orange-400 font-semibold">flexible options</span> tailored to meet the security demands of businesses of all sizes, 
        helping you maintain <span className="text-red-400 font-semibold">robust security</span> throughout the year.
      </motion.p>
      
      {/* Enhanced button with glow effect */}
      <motion.button
        className="group relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-red-500/25"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={()=>router.push("/cyberrequirements")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-3">
          Submit Your Security Requirements
          <motion.span
            className="text-xl"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </span>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.button>
      
      {/* Additional trust indicators */}
      <motion.div 
        className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>24/7 Support</span>
        </div>
        <div className="w-px h-4 bg-gray-600"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span>Free Consultation</span>
        </div>
        <div className="w-px h-4 bg-gray-600"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span>Custom Solutions</span>
        </div>
      </motion.div>
    </div>
    
    {/* Corner accents */}
    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-orange-500/50 rounded-bl-lg"></div>
  </div>
</motion.div>

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
    </div>
  );
}