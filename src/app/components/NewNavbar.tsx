"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NewNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<null | string>(null);

  const handleDropdownToggle = (menu:string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/", type: "link" },
    { 
      name: "Company", 
      link: "/company", 
      type: "dropdown", 
      items: [
        { name: "Why Choose CyberJall", link: "/company#why-choose-us" },
        { name: "Our Clients", link: "/company#clients" },
        { name: "Our Service Partners", link: "/company#partners" },
        { name: "Get Free Consultation", link: "/services#consultation" }
      ]
    },
    { 
      name: "Services", 
      link: "/services", 
      type: "dropdown", 
      items: [
        { name: "Web Application Security Testing", link: "/services/web-security" }
      ]
    },
    { name: "Contact Us", link: "/contact_us", type: "link" },
    { name: "Log in", link: "/sign-in", type: "link" }
  ];

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-red-600">
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
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8 items-center"
        >
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {item.type === "link" ? (
                <Link
                  href={item.link} 
                  className="text-red-300 hover:text-red-500 transition-colors"
                  // whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <motion.button
                    className="flex items-center text-red-300 hover:text-red-500 transition-colors"
                    onClick={() => handleDropdownToggle(item.name)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full mt-2 py-2 w-64 bg-black bg-opacity-90 border border-red-600 rounded-lg shadow-lg shadow-red-600/30 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {item.items && item?.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            className="block px-4 py-2 text-red-300 hover:text-red-500 hover:bg-red-900/20"
                            // variants={dropdownItemVariants}
                            // whileHover="hover"
                          >
                            {subItem.name}
                          </Link>
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
                        {activeDropdown === item.name + "-mobile" && (
                          <motion.div
                            className="pl-4 mt-1 space-y-2 border-l-2 border-red-600"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {item.items.map((subItem, subIndex) => (
                              <motion.a
                                key={subIndex}
                                href={subItem.link}
                                className="block py-2 text-red-300 hover:text-red-500"
                                variants={dropdownItemVariants}
                                whileTap={{ scale: 0.97 }}
                              >
                                {subItem.name}
                              </motion.a>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NewNavbar;