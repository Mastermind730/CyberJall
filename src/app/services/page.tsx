"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, CheckCircle, AlertTriangle, Database, Lock } from 'lucide-react';
import CyberJallFAQ from '../components/FAQ';
import { useRouter } from 'next/navigation';

export default function Services() {
  const [isClient, setIsClient] = useState(false);
  const router=useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const plans = [
    {
      title: "Basic Security Assessment",
      price: "$1,499",
      duration: "3 Month Plan",
      features: [
        "Short-term, intensive assessment",
        "Fast-track security enhancement",
        "Initial vulnerability scan",
        "Focused reporting with remediation recommendations",
        "Critical vulnerability identification and fixes"
      ],
      icon: <Shield className="h-12 w-12" />,
      popular: false
    },
    {
      title: "Advanced Protection",
      price: "$2,999",
      duration: "6 Month Plan",
      features: [
        "Mid-term solution with periodic assessments",
        "Balanced, proactive coverage",
        "Extended security focus",
        "Bi-monthly vulnerability scans",
        "Detailed technical reporting",
        "Remediation follow-up",
        "Regular threat updates"
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
      icon: <Database className="h-12 w-12" />,
      popular: false
    }
  ];
  const howItWorks = [
    {
      title: "Learn About the Service",
      description: "Understand how Web Application Security Testing helps protect your business from cyber threats.",
      icon: <Activity className="h-8 w-8" />
    },
    {
      title: "Explore Security Providers",
      description: "Browse expert cybersecurity professionals and firms offering specialized testing services.",
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: "Select Your Service Partners",
      description: "Compare providers based on expertise, pricing, and plans—choose the best fit for your security needs.",
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      title: "Submit a Service Request",
      description: "Once you've selected your service providers, submit your request through CyberJall, and we'll facilitate the process.",
      icon: <AlertTriangle className="h-8 w-8" />
    }
  ];

  return (
    <div id="consultation" className="min-h-screen bg-black text-white">
      

      {isClient && (
        <>
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-orange-900 opacity-90"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-red-500 opacity-20"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 300}px`,
                      height: `${Math.random() * 300}px`,
                    }}
                    animate={{
                      x: [0, Math.random() * 50 - 25],
                      y: [0, Math.random() * 50 - 25],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 10 + Math.random() * 20,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Web Application Security Testing
                </motion.h1>
                <motion.p className="text-xl md:text-2xl mb-8 text-gray-300">
                  Protect your digital assets from cyber threats with expert security testing
                </motion.p>
                <motion.button
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-red-500/30 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Free Consultation
                </motion.button>
              </motion.div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-6 py-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="max-w-4xl mx-auto mb-16 text-center"
              >
                <p className="text-red-500 text-lg font-semibold mb-3">CYBERJALL SERVICES</p>
                <h2 className="text-4xl font-bold mb-6">Securing Your Business in the Digital Age</h2>
                <p className="text-gray-400 text-lg">
                  Modern businesses rely on web applications for operations, customer engagement, and data management. 
                  However, these applications are a prime target for cyber threats, including data breaches, 
                  injection attacks, and unauthorized access.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
                className="mb-24"
              >
                <div className="text-center mb-12">
                  <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">Our Expertise</motion.h2>
                  <motion.div variants={fadeIn} className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto"></motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Vulnerability Identification",
                      description: "We identify vulnerabilities before attackers can exploit them, protecting your sensitive data and systems.",
                      icon: <AlertTriangle className="h-12 w-12 text-red-500" />
                    },
                    {
                      title: "Compliance Assurance",
                      description: "Our testing helps ensure your applications meet industry security standards and regulatory requirements.",
                      icon: <CheckCircle className="h-12 w-12 text-orange-500" />
                    },
                    {
                      title: "Expert Defense Strategies",
                      description: "We connect you with top-tier cybersecurity experts who strengthen your application defenses against evolving threats.",
                      icon: <Shield className="h-12 w-12 text-red-500" />
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
                    >
                      <div className="mb-6">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
                className="mb-24"
              >
                <div className="text-center mb-12">
                  <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">How It Works</motion.h2>
                  <motion.div variants={fadeIn} className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto"></motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {howItWorks.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="flex gap-6 items-start"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center">
                          {step.icon}
                        </div>
                        {index < howItWorks.length - 1 && (
                          <div className="absolute top-16 left-1/2 w-0.5 h-16 bg-gradient-to-b from-orange-500 to-transparent -translate-x-1/2 md:hidden"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                          <span className="text-orange-500 mr-2">{index + 1})</span>
                          {step.title}
                        </h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
              >
                <div className="text-center mb-12">
                  <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">Flexible Testing Packages</motion.h2>
                  <motion.p variants={fadeIn} className="text-gray-400 text-lg max-w-3xl mx-auto">
                    We offer adaptable testing plans to fit your business needs, allowing you to choose the service 
                    duration that aligns best with your security goals and budget.
                  </motion.p>
                  <motion.div variants={fadeIn} className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6"></motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                        plan.popular ? 'border-2 border-red-500 relative' : 'border border-gray-800'
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
                        <div className="text-center mb-6">
                          <p className="text-4xl font-bold">{plan.price}</p>
                        </div>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' 
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
                  className="mt-12 text-center"
                >
                  <p className="text-gray-400 mb-8">
                    Each plan offers flexible options tailored to meet the security demands of businesses of all sizes, 
                    helping you maintain robust security throughout the year.
                  </p>
                  <motion.button
                    className="bg-transparent border-2 border-red-500 text-red-500 font-bold py-3 px-8 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>router.push("/cyberrequirements")}
                  >
                    Book your Package 
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="bg-black relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(255, 69, 0, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.15) 0%, rgba(0, 0, 0, 0) 50%)'
                  ] 
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <CyberJallFAQ/>

            <div className="container mx-auto px-6 py-16 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your web applications?</h2>
                <p className="text-xl text-gray-400 mb-8">
                  Get started with our expert security testing services and protect your business from cyber threats.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-4 px-10 rounded-full hover:shadow-lg hover:shadow-red-500/30 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us Today
                </motion.button>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}