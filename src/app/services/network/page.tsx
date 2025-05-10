/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/index.js
"use client";
import { useState, useEffect, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Search, Code, Database, FileText, CheckCircle, ArrowRight, Lock, Zap, Eye, Terminal, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number| null>();


  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const methodologySteps = [
    {
      icon: <Search className="w-12 h-12 text-orange-500" />,
      title: "Reconnaissance & Information Gathering",
      description: "Identifying IP ranges, domains, and network assets. Collecting open-source intelligence. Mapping network structure & external attack surfaces."
    },
    {
      icon: <Eye className="w-12 h-12 text-orange-500" />,
      title: "Scanning & Enumeration",
      description: "Port scanning (Nmap, Nessus). Identifying live hosts and open services. Extracting system information and potential weaknesses."
    },
    {
      icon: <Code className="w-12 h-12 text-orange-500" />,
      title: "Exploitation & Privilege Escalation",
      description: "Attempting to exploit network vulnerabilities. Gaining unauthorized access and escalating privileges. Testing lateral movement techniques."
    },
    {
      icon: <Database className="w-12 h-12 text-orange-500" />,
      title: "Post-Exploitation & Data Exfiltration",
      description: "Assessing how an attacker could move inside the network. Simulating data breaches and unauthorized data extraction."
    },
    {
      icon: <FileText className="w-12 h-12 text-orange-500" />,
      title: "Reporting & Remediation",
      description: "Providing a detailed vulnerability report with risk levels. Offering step-by-step mitigation strategies."
    }
  ];

  const expertise = [
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Certified Professionals",
      description: "Our team holds top industry certifications including OSCP, CEH, and CISSP."
    },
    {
      icon: <Terminal className="w-8 h-8 text-orange-500" />,
      title: "Advanced Techniques",
      description: "We employ the latest penetration testing methodologies and tools."
    },
    {
      icon: <Lock className="w-8 h-8 text-orange-500" />,
      title: "Compliance Expertise",
      description: "Our tests meet requirements for GDPR, ISO 27001, SOC 2, and HIPAA."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Quick Response",
      description: "Rapid assessment and reporting to address vulnerabilities promptly."
    }
  ];

  const packages = [
    {
      title: "Basic Scan",
      price: "$1,999",
      features: [
        "External Network Assessment",
        "Vulnerability Identification",
        "Basic Reporting",
        "30-Day Support"
      ]
    },
    {
      title: "Comprehensive",
      price: "$3,999",
      features: [
        "External & Internal Network Testing",
        "Exploitation Simulation",
        "Detailed Reporting & Remediation",
        "60-Day Support"
      ],
      recommended: true
    },
    {
      title: "Enterprise",
      price: "$7,999",
      features: [
        "Full Network Infrastructure Testing",
        "Advanced Exploitation Techniques",
        "Executive & Technical Reports",
        "90-Day Support & Retest"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is Network Penetration Testing?",
      answer: "Network Penetration Testing (Pentesting) is a simulated cyberattack designed to test your business's internal and external network security. It helps identify vulnerabilities before hackers exploit them."
    },
    {
      question: "How does CyberJall's marketplace work for Network Pentesting?",
      answer: "CyberJall connects businesses with vetted cybersecurity service providers specializing in network security testing. You can browse and compare certified penetration testers, select a provider based on pricing, expertise, and compliance needs, and purchase a one-time test or subscribe to ongoing security testing."
    },
    {
      question: "How do I choose the right penetration testing provider?",
      answer: "CyberJall makes it easy to compare providers based on: Certifications (OSCP, CEH, CISSP, CREST), Experience & industry focus, Compliance expertise (GDPR, ISO 27001, SOC 2, HIPAA, etc.), and Customer reviews & ratings."
    },
    {
      question: "How frequently should I perform Network Pentesting?",
      answer: "It depends on your risk level, but most businesses should conduct network pen tests at least annually. High-risk industries (finance, healthcare, SaaS) – Every 3 to 6 months. Mid-size businesses & enterprises – Every 6 to 12 months. After major infrastructure changes or security incidents – Immediately."
    },
    {
      question: "How do I get started?",
      answer: "Explore CyberJall, browse & compare network pentesting providers, select the best-fit service based on your needs, and request a test & receive a detailed security assessment."
    }
  ];
  const plans = [
    {
      title: "Prime Security Assessment",
      duration: "4 Month Plan",
      features: [
        "One-time External Vulnerability Scanning",
        "Firewall & Perimeter Security Testing",
        "Basic DDoS Resilience Testing",
        "Security Report with Risk Levels & Recommendation",
        "Critical vulnerability identification and fixes",
        "Fast-track security enhancement"
      ],
      icon: <Shield className="h-12 w-12" />,
      popular: false
    },
    {
      title: "Advanced Protection",
      duration: "8 Month Plan",
      features: [
        "Quarterly Network Penetration Testing (2 rounds)",
        "Internal & External Network Security Testing",
        "Network Segmentation & Zero Trust Review",
        "Wi-Fi Security Testing (If applicable)",
        "Secure VPN & Remote Access Audit",
        "Detailed technical reporting",
        "Regular threat updates"
      ],
      icon: <Lock className="h-12 w-12" />,
      popular: true
    },
    {
      title: "Enterprise Shield",
      duration: "12 Month Plan",
      features: [
        "Quarterly Network Security Testing (4 rounds)",
        "Red Team Assessment (Real-world attack simulation)",
        "Zero Trust Security Review & Implementation Support",
        "Threat Intelligence & Continuous Network Monitoring",
        "Continuous monitoring",
        "SOC (Security Operations Center) Integration Recommendations",
      ],
      icon: <Database className="h-12 w-12" />,
      popular: false
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const toggleFaq = (index: number | null) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">


      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="cybersecurity-grid"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          

          <div className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-red-600">Network</span> Penetration Testing
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Identify, Assess & Secure Your Network Against Cyber Threats
              </p>
              <p className="text-lg text-gray-400 mb-8">
                A simulated cyberattack on your organization&apos;s internal and external networks to identify security weaknesses before real hackers do.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 py-3 px-8 rounded-full text-white font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Request a Pentest
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-gray-700 hover:border-gray-500 py-3 px-8 rounded-full text-white font-medium text-lg transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Security Icons */}
        <div className="absolute bottom-0 right-0 w-full h-64 opacity-20 overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "linear" 
            }}
            className="absolute"
            style={{ left: '10%', top: '20%' }}
          >
            <Lock className="w-16 h-16 text-orange-500" />
          </motion.div>
          <motion.div 
            animate={{ 
              x: [0, -70, 0],
              y: [0, 40, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15,
              ease: "linear" 
            }}
            className="absolute"
            style={{ left: '30%', top: '50%' }}
          >
            <Shield className="w-16 h-16 text-red-600" />
          </motion.div>
          <motion.div 
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 18,
              ease: "linear" 
            }}
            className="absolute"
            style={{ left: '70%', top: '30%' }}
          >
            <AlertTriangle className="w-16 h-16 text-orange-500" />
          </motion.div>
        </div>
      </div>

      {/* What is Network Penetration Testing Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is <span className="text-red-600">Network Penetration Testing?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Network penetration testing is a simulated cyberattack on an organization&apos;s internal and external networks to identify security weaknesses. It helps businesses prevent unauthorized access, data breaches, and downtime by strengthening network defenses against cyber threats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Detect Vulnerabilities</h3>
                <p className="text-gray-400">Identify network weaknesses before hackers do</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Prevent Breaches</h3>
                <p className="text-gray-400">Stop unauthorized access and data breaches</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex justify-center mb-4">
                  <Lock className="h-12 w-12 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Strengthen Defenses</h3>
                <p className="text-gray-400">Build robust protection against cyber threats</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#gapirid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-red-600">Methodology</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We follow a comprehensive approach to ensure thorough network security testing
            </p>
          </motion.div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {methodologySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-red-900 transition-all duration-300"
              >
                <div className="flex-shrink-0 bg-black p-4 rounded-lg">
                  {step.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{index + 1}. {step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-red-600">Expertise</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Why choose CyberJall for your network penetration testing needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800 hover:border-orange-900 transition-all duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
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
                              {/* <div className="text-center mb-6">
                                <p className="text-4xl font-bold">{plan.price}</p>
                              </div> */}
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
                                          className="mt-12  text-center"
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

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-red-600">Works</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our streamlined process makes securing your network simple and effective
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Consultation</h3>
              <p className="text-gray-400">We discuss your network infrastructure and security goals to customize our approach.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Testing</h3>
              <p className="text-gray-400">Our experts perform comprehensive network testing using advanced techniques.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Remediation</h3>
              <p className="text-gray-400">We provide detailed reports and actionable steps to address vulnerabilities.</p>
            </motion.div>
          </div>
        </div>
      </section>

   

      {/* Why Choose CyberJall Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M5,0 L10,5 L5,10 L0,5 L5,0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#hexagons)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-red-600">CyberJall</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence in network security testing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="flex items-center text-xl font-semibold mb-3">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Certified Service Providers
              </h3>
              <p className="text-gray-400 ml-8">
                Our network of penetration testers hold top industry certifications including OSCP, CEH, CISSP, and CREST.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="flex items-center text-xl font-semibold mb-3">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Comprehensive Testing
              </h3>
              <p className="text-gray-400 ml-8">
                We leave no stone unturned, thoroughly examining your entire network infrastructure for vulnerabilities.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="flex items-center text-xl font-semibold mb-3">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Actionable Reporting
              </h3>
              <p className="text-gray-400 ml-8">
                Our detailed reports include clear, prioritized recommendations for addressing vulnerabilities.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-800"
            >
<h3 className="flex items-center text-xl font-semibold mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Compliance-Driven Approach
                </h3>
                <p className="text-gray-400 ml-8">
                  We ensure all testing aligns with regulatory requirements including GDPR, ISO 27001, SOC 2, and HIPAA.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                  <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="none" stroke="rgba(255,165,0,0.3)" strokeWidth="1" />
                  <circle cx="10" cy="10" r="3" fill="rgba(255,0,0,0.5)" />
                  <circle cx="90" cy="10" r="3" fill="rgba(255,0,0,0.5)" />
                  <circle cx="90" cy="90" r="3" fill="rgba(255,0,0,0.5)" />
                  <circle cx="10" cy="90" r="3" fill="rgba(255,0,0,0.5)" />
                  <path d="M10 50 L50 50 L50 90" fill="none" stroke="rgba(255,165,0,0.3)" strokeWidth="1" />
                  <path d="M50 10 L50 30 L90 30" fill="none" stroke="rgba(255,165,0,0.3)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Secure Your Business Today!
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Prevent network breaches before they happen. Strengthen security & meet compliance requirements. Gain a strategic cybersecurity advantage.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 hover:bg-gray-100 py-4 px-10 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Request a Network Penetration Test Now!
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-red-600">Questions</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about our network penetration testing services
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-800"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`px-6 transition-all duration-300 overflow-hidden ${activeFaq === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
                  >
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

       

        {/* Global Styles */}
        <style jsx global>{`
          .cybersecurity-grid {
            background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255, 0, 0, 0.1) 50px, rgba(255, 0, 0, 0.1) 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 0, 0, 0.1) 50px, rgba(255, 0, 0, 0.1) 51px);
            background-size: 100% 100%, 100px 100%, 100% 100px;
            width: 100%;
            height: 100%;
            position: absolute;
            animation: gridMove 30s linear infinite;
          }
          
          @keyframes gridMove {
            0% {
              background-position: 0 0, 0 0, 0 0;
            }
            100% {
              background-position: 0 0, 100px 0, 0 100px;
            }
          }
        `}</style>
      </div>
    );
  }