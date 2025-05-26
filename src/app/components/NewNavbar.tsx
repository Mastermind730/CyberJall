"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Define types for navigation items
interface NestedItem {
  name: string;
  link: string;
}

interface SubItem {
  name: string;
  link: string;
  type?: "nested";
  items?: NestedItem[];
}

interface NavItem {
  name: string;
  link: string;
  type: "link" | "dropdown";
  items?: SubItem[];
}

const NewNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", link: "/", type: "link" },
    { 
      name: "Company", 
      link: "/company", 
      type: "dropdown", 
      items: [
        { name: "Why Choose CyberJall", link: "/company#why-choose-us" },
        { name: "Our Clients", link: "/company#clients" },
        { name: "Our Service Partners", link: "/ourPartners" },
        { name: "Get Free Consultation", link: "/contact_us" }
      ]
    },
    { 
      name: "Services", 
      link: "/services", 
      type: "dropdown", 
      items: [
        { name: "Web Application Security Testing", link: "/services#consultation" },
        { name: "Network Pen Testing", link: "/services/network" },
        { name: "Cloud Pen Testing", link: "/services/cloud" },
        { name: "Mobile App Pen Testing", link: "/services/mobile_pentesting" },
        {name:"API Testing",link:"/services/api_testing"},
        { 
          name: "VAPT Services", 
          link: "/services/vpe", 
          type: "nested",
          items: [
            { name: "Network Penetration Testing", link: "/services/vpe/network-testing" },
            { name: "API Security Assessment", link: "/services/vpe/api-testing" },
            { name: "Cloud Security Audit", link: "/services/vpe/cloud-security" },
            { name: "Mobile Application Testing", link: "/services/vpe/mobile-testing" },
            { name: "IoT Security Analysis", link: "/services/vpe/iot-security" }
          ]
        }
      ]
    },
    { 
      name: "Products", 
      link: "/products", 
      type: "dropdown", 
      items: [
        { name: "Bug Bounty Platform", link: "/products/bug_bounty" },
      ]
    },
    { name: "CyberJall Insights", link: "/cyberjall_insights", type: "link" },
    { name: "Contact Us", link: "/contact_us", type: "link" },
    { name: "Log in", link: "/login", type: "link" }
  ];

  // Handle mouseenter
  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  // Handle mouseleave
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // For mobile menu
  const handleDropdownToggle = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        staggerChildren: 0.05,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: "easeIn" 
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.05, x: 5 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { 
        duration: 0.3, 
        staggerChildren: 0.1 
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { 
        duration: 0.3, 
        when: "afterChildren" 
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Added for nested dropdowns
  const nestedDropdownVariants = {
    hidden: { opacity: 0, x: -20, height: 0 },
    visible: { 
      opacity: 1, 
      x: 0, 
      height: "auto",
      transition: { 
        duration: 0.3, 
        staggerChildren: 0.05 
      } 
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      height: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 
             bg-gradient-to-r from-red-900/20 via-black/30 to-orange-600/20 
             backdrop-blur-lg border-b border-orange-500/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <motion.div 
            className="h-12 w-12 relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 0 }}
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
              <motion.circle
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.6, 0] 
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="#FF4500"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
          <Link href={"/"}>
          <motion.span 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(255, 69, 0, 0.7)"
            }}
          >
            CyberJall
          </motion.span>
          </Link>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8 items-center"
        >
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => item.type === "dropdown" && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.type === "link" ? (
                <Link
                  href={item.link} 
                  className="text-red-300 hover:text-red-500 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <motion.div
                    className="flex items-center text-red-300 hover:text-red-500 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.name}
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ 
                        rotate: activeDropdown === item.name ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.div>
                  
                  <AnimatePresence>
                    {activeDropdown === item.name && item.items && (
                      <motion.div
                        className="absolute top-full mt-2 py-2 w-72 bg-black bg-opacity-90 border border-red-600 rounded-lg shadow-lg shadow-red-600/30 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {item.items.map((subItem, subIndex) => (
                          <div 
                            key={subIndex} 
                            className="relative group"
                            onMouseEnter={() => subItem.type === "nested" && handleMouseEnter(`${item.name}-${subItem.name}`)}
                            onMouseLeave={() => subItem.type === "nested" && handleMouseLeave()}
                          >
                            {subItem.type === "nested" ? (
                              <div>
                                <motion.div
                                  className="flex items-center justify-between px-4 py-2 text-red-300 hover:text-red-500 hover:bg-red-900/20 cursor-pointer"
                                  whileHover={{ x: 5 }}
                                >
                                  <span>{subItem.name}</span>
                                  <motion.svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-4 w-4" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    animate={{ 
                                      rotate: activeDropdown === `${item.name}-${subItem.name}` ? 90 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </motion.svg>
                                </motion.div>
                                
                                <AnimatePresence>
                                  {activeDropdown === `${item.name}-${subItem.name}` && subItem.items && (
                                    <motion.div
                                      className="pl-4 bg-black bg-opacity-90 border-l-2 border-red-600"
                                      variants={nestedDropdownVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="exit"
                                    >
                                      {subItem.items.map((nestedItem, nestedIndex) => (
                                        <Link
                                          key={nestedIndex}
                                          href={nestedItem.link}
                                          className="block px-4 py-2 text-red-300 hover:text-red-500 hover:bg-red-900/20 text-sm"
                                        >
                                          <motion.div
                                            whileHover={{ x: 5 }}
                                            className="flex items-center"
                                          >
                                            <span className="mr-2">•</span>
                                            {nestedItem.name}
                                          </motion.div>
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              <Link
                                href={subItem.link}
                                className="block px-4 py-2 text-red-300 hover:text-red-500 hover:bg-red-900/20"
                              >
                                <motion.div whileHover={{ x: 5 }}>
                                  {subItem.name}
                                </motion.div>
                              </Link>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2 rounded-full font-semibold shadow-lg shadow-red-600/30 relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="absolute inset-0 -z-10"
              initial={false}
              animate={{
                background: ["radial-gradient(circle at 50% 50%, rgba(255,69,0,0.4) 0%, rgba(0,0,0,0) 70%)", 
                             "radial-gradient(circle at 50% 50%, rgba(255,69,0,0.4) 0%, rgba(0,0,0,0) 70%)"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.button>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen 
                ? "M6 18L18 6M6 6l12 12" 
                : "M4 6h16M4 12h16M4 18h16"
              }
              initial={false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-95 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.type === "link" ? (
                    <motion.a
                      href={item.link}
                      className="block py-2 text-red-300 hover:text-red-500 text-lg"
                      variants={mobileItemVariants}
                      whileTap={{ scale: 0.97 }}
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <div>
                      <motion.button
                        className="flex items-center justify-between w-full py-2 text-red-300 hover:text-red-500 text-lg"
                        onClick={() => handleDropdownToggle(item.name + "-mobile")}
                        variants={mobileItemVariants}
                        whileTap={{ scale: 0.97 }}
                      >
                        {item.name}
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ 
                            rotate: activeDropdown === item.name + "-mobile" ? 180 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name + "-mobile" && item.items && (
                          <motion.div
                            className="pl-4 mt-1 space-y-2 border-l-2 border-red-600"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {item.items.map((subItem, subIndex) => (
                              <div key={subIndex}>
                                {subItem.type === "nested" ? (
                                  <div>
                                    <motion.button
                                      className="flex items-center justify-between w-full py-2 text-red-300 hover:text-red-500"
                                      onClick={() => handleDropdownToggle(`${item.name}-${subItem.name}-mobile`)}
                                      variants={dropdownItemVariants}
                                      whileTap={{ scale: 0.97 }}
                                    >
                                      {subItem.name}
                                      <motion.svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                        animate={{ 
                                          rotate: activeDropdown === `${item.name}-${subItem.name}-mobile` ? 180 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </motion.svg>
                                    </motion.button>
                                    
                                    <AnimatePresence>
                                      {activeDropdown === `${item.name}-${subItem.name}-mobile` && subItem.items && (
                                        <motion.div
                                          className="pl-4 mt-1 space-y-2 border-l-2 border-red-600"
                                          variants={nestedDropdownVariants}
                                          initial="hidden"
                                          animate="visible"
                                          exit="exit"
                                        >
                                          {subItem.items.map((nestedItem, nestedIndex) => (
                                            <motion.a
                                              key={nestedIndex}
                                              href={nestedItem.link}
                                              className="block py-2 text-red-300 hover:text-red-500 text-sm"
                                              variants={dropdownItemVariants}
                                              whileTap={{ scale: 0.97 }}
                                            >
                                              <span className="inline-block mr-2">•</span>
                                              {nestedItem.name}
                                            </motion.a>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ) : (
                                  <motion.a
                                    href={subItem.link}
                                    className="block py-2 text-red-300 hover:text-red-500"
                                    variants={dropdownItemVariants}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    {subItem.name}
                                  </motion.a>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}
              
              <motion.button 
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 rounded-full font-semibold shadow-lg shadow-red-600/30 text-lg"
                variants={mobileItemVariants}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>

              {/* Mobile Menu Additional Element - Pulsing Security Badge */}
              <motion.div
                className="mt-6 flex justify-center"
                variants={mobileItemVariants}
              >
                <div className="bg-black bg-opacity-60 p-4 rounded-lg border border-red-600 flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <div className="text-red-300 text-sm">
                    <p>24/7 Security Monitoring</p>
                    <p className="text-xs opacity-80">Certified Security Professionals</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NewNavbar;