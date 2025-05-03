"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cloud, Check, Server, Lock, Database, FileSearch, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CloudPentesting() {
  const [isVisible, setIsVisible] = useState(false);
  const router=useRouter();
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  const plans = [
    {
      title: "Prime Security Assessment",
      duration: "4 Month Plan",
      features: [
        "One-time Cloud Security Audit (Infrastructure & Configurations)",
        "IAM & Access Control Review (Permissions & Least Privilege Analysis)",
        "Cloud Storage Security & Data Exposure Testing",
        "Misconfiguration & Compliance Gap Analysis",
        "Security Recommendations Report"
      ],
      icon: <Shield className="h-12 w-12" />,
      popular: false
    },
    {
      title: "Advanced Protection",
      duration: "8 Month Plan",
      features: [
        "Bi-annual Cloud Security Testing (2 rounds)",
        "Identity & Privilege Escalation Testing",
        "Container & Kubernetes Security Assessment (If applicable)",
        "Cloud Network Security Testing (Traffic monitoring & segmentation analysis)",
        "Encryption & Key Management Testing"
      ],
      icon: <Lock className="h-12 w-12" />,
      popular: true
    },
    {
      title: "Enterprise Shield",
      duration: "12 Month Plan",
      features: [
        "Quarterly Cloud Security Testing (4 rounds)",
        "Serverless Security Assessment (If applicable)",
        "Threat Modeling & Attack Simulations",
        "Cloud API Gateway Security Testing",
        "Zero Trust Architecture Review & Implementation Support",
        "Continuous Threat Monitoring & Incident Response Recommendations"
      ],
      icon: <Database className="h-12 w-12" />,
      popular: false
    }
  ];
  
    

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-red-900/70 via-black/80 to-orange-900/70"></div>
          <svg className="absolute left-0 top-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
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
              <Shield className="w-16 h-16 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500 mb-6">
              Cloud Pen Testing
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-gray-300">
              Find the Right Cloud Security Partner on CyberJall
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
              Your cloud infrastructure is the backbone of your business. Ensuring it is secure against cyber threats is critical to preventing data breaches, financial losses, and compliance failures. CyberJall connects you with top-tier cloud security providers who specialize in identifying vulnerabilities and strengthening cloud environments.
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
              Why Your Business Needs Cloud Penetration Testing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <Cloud className="w-10 h-10" />, title: "Identify Misconfigurations" },
              { icon: <Lock className="w-10 h-10" />, title: "Protect Sensitive Data" },
              { icon: <Check className="w-10 h-10" />, title: "Meet Compliance Requirements" },
              { icon: <Server className="w-10 h-10" />, title: "Strengthen API & Application Security" },
              { icon: <Shield className="w-10 h-10" />, title: "Mitigate Cloud-Based Threats" }
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
            <circle cx="400" cy="400" r="200" fill="none" stroke="url(#redOrangeGradient)" strokeWidth="100" />
            <defs>
              <linearGradient id="redOrangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                icon: <Cloud className="w-12 h-12" />, 
                title: "Cloud Infrastructure", 
                description: "Comprehensive assessment of your AWS, Azure, Google Cloud, or multi-cloud environments."
              },
              { 
                icon: <Database className="w-12 h-12" />, 
                title: "Database Security", 
                description: "In-depth evaluation of cloud database configurations, access controls, and encryption."
              },
              { 
                icon: <FileSearch className="w-12 h-12" />, 
                title: "Compliance Assurance", 
                description: "Expert testing to verify your cloud environment meets industry standards and regulations."
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
                    Submit your security requirement
                  </motion.button>
                </motion.div>

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
                title: "Request Security Assessment", 
                description: "Tell us about your cloud environment and security needs through our simple form."
              },
              { 
                title: "Get Matched With Top Providers", 
                description: "CyberJall connects you with verified security experts specializing in cloud penetration testing."
              },
              { 
                title: "Compare & Select Your Partner", 
                description: "Review detailed proposals, expertise, and pricing to find your ideal security partner."
              },
              { 
                title: "Comprehensive Testing & Reporting", 
                description: "Expert penetration testers identify vulnerabilities and provide actionable recommendations."
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

      {/* Why Choose CyberJall Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 800 800">
            <path d="M0,400 C0,200 200,0 400,0 C600,0 800,200 800,400 C800,600 600,800 400,800 C200,800 0,600 0,400 Z" fill="none" stroke="url(#whyChooseGradient)" strokeWidth="8" />
            <defs>
              <linearGradient id="whyChooseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Why Choose CyberJall for Cloud Security?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Verified Cybersecurity Providers", 
                description: "Work with industry-leading penetration testers and consultants."
              },
              { 
                title: "Customizable Service Packages", 
                description: "Choose the security services that match your business needs."
              },
              { 
                title: "Transparent Pricing & Contracts", 
                description: "Compare offerings with clear pricing structures."
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
                <span className="text-orange-500">🔒</span> Protect your cloud infrastructure today! Browse top Cloud Security providers on CyberJall now.
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