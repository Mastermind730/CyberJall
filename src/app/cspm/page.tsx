"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiShield, FiCloud, FiAlertTriangle, FiCheckCircle, FiSettings, FiBarChart2, FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CSPMPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Cloud Security Posture Management (CSPM) | CyberJall</title>
        <meta name="description" content="Continuous cloud security assessment and compliance for AWS, Azure, and GCP" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/cloud-pattern.svg')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-red-900/30 px-4 py-2 rounded-full mb-6 border border-red-800">
              <FiShield className="text-orange-400 mr-2" />
              <span className="text-orange-300 font-medium">Cloud Security</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cloud Security Posture <span className="text-red-500">Management</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Continuous security assessment and compliance for your AWS, Azure, and GCP infrastructure
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg shadow-red-900/50"
              >
                Request Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent hover:bg-gray-800 border border-orange-500 text-orange-300 px-8 py-4 rounded-lg font-medium text-lg"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <FiCloud className="text-orange-400 text-4xl animate-pulse" />
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <FiCloud /> },
              { id: 'features', label: 'Key Features', icon: <FiCheckCircle /> },
              { id: 'deliverables', label: 'Deliverables', icon: <FiSettings /> },
              { id: 'service-models', label: 'Service Models', icon: <FiBarChart2 /> },
              { id: 'cyberjall-advantage', label: 'CyberJall Advantage', icon: <FiUsers /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-red-500">Continuous</span> Cloud Security Assessment
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                CSPM identifies and remediates misconfigurations and compliance risks across your AWS, Azure, and GCP infrastructure. 
                Maintain a secure and compliant cloud environment with automated detection of security gaps and alignment with regulatory standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiAlertTriangle className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Why It Matters</h4>
                    <p className="text-gray-400">
                      Misconfigured cloud resources are one of the top causes of cloud data breaches. 
                      Companies often unknowingly expose storage, databases, or services due to improper settings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiShield className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Our Solution</h4>
                    <p className="text-gray-400">
                      CSPM gives you real-time visibility and actionable insights to prevent security risks before they become breaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-red-900/20 rounded-xl -rotate-3"></div>
              <div className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-300">AWS S3 Bucket Exposure</h4>
                    <p className="text-sm text-gray-400">Public access detected on storage-bucket-123</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-medium text-red-300">IAM Overprivileged User</h4>
                    <p className="text-sm text-gray-400">User: dev-admin has excessive permissions</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-medium text-green-300">Compliance Check</h4>
                    <p className="text-sm text-gray-400">PCI DSS 3.2.1: Requirement 8 met</p>
                  </div>
                </div>
                <div className="mt-6 bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Security Posture</span>
                    <span className="text-orange-400 font-medium">Medium Risk</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Key Features Section */}
        {activeTab === 'features' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key <span className="text-red-500">Security</span> Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Comprehensive Audits",
                  description: "Full assessment of cloud configurations across all your providers",
                  icon: <FiSettings className="text-orange-400 text-3xl" />
                },
                {
                  title: "Misconfiguration Detection",
                  description: "Identify exposed storage, insecure services, and unused permissions",
                  icon: <FiAlertTriangle className="text-red-400 text-3xl" />
                },
                {
                  title: "Continuous Monitoring",
                  description: "24/7 security policy enforcement with real-time alerts",
                  icon: <FiCloud className="text-orange-300 text-3xl" />
                },
                {
                  title: "Automated Remediation",
                  description: "Actionable guidance or rule-based auto-fix for common issues",
                  icon: <FiCheckCircle className="text-green-400 text-3xl" />
                },
                {
                  title: "Compliance Checks",
                  description: "Pre-mapped controls for standards like ISO 27001, SOC 2, PCI DSS",
                  icon: <FiShield className="text-blue-400 text-3xl" />
                },
                {
                  title: "Risk Prioritization",
                  description: "Scored vulnerabilities with actionable insights",
                  icon: <FiBarChart2 className="text-purple-400 text-3xl" />
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-gray-700 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Deliverables Section */}
        {activeTab === 'deliverables' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">
              Key <span className="text-orange-400">Deliverables</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Comprehensive Cloud Audit Report",
                  description: "Detailed assessment of your current cloud configurations with risk scoring",
                  items: ["AWS IAM analysis", "Storage security review", "Network configuration audit"]
                },
                {
                  title: "Continuous Monitoring Dashboard",
                  description: "Real-time visibility into your cloud security posture",
                  items: ["Risk scoring", "Trend analysis", "Alert history"]
                },
                {
                  title: "Remediation Playbooks",
                  description: "Step-by-step guides to fix identified vulnerabilities",
                  items: ["Prioritized fixes", "Automation scripts", "Compliance mapping"]
                },
                {
                  title: "Compliance Evidence Package",
                  description: "Documentation for auditors showing security controls",
                  items: ["SOC 2 readiness", "ISO 27001 alignment", "PCI DSS gap analysis"]
                }
              ].map((deliverable, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-start">
                    <div className="bg-red-900/30 p-3 rounded-lg mr-4">
                      <FiCheckCircle className="text-orange-400 text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-100">{deliverable.title}</h3>
                      <p className="text-gray-400 mb-4">{deliverable.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {deliverable.items.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Service Models Section */}
        {activeTab === 'service-models' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Flexible <span className="text-red-500">Service</span> Models
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "One-Time Audit",
                  price: "From $4,500",
                  description: "Point-in-time assessment with detailed report",
                  features: [
                    "Full cloud configuration review",
                    "Risk assessment report",
                    "Remediation recommendations",
                    "30-day support"
                  ],
                  accent: "border-orange-500"
                },
                {
                  title: "Monthly Monitoring",
                  price: "From $2,800/mo",
                  description: "Ongoing security posture management",
                  features: [
                    "Continuous configuration monitoring",
                    "Real-time alerts",
                    "Monthly reports",
                    "Quarterly review calls",
                    "Priority support"
                  ],
                  accent: "border-red-500",
                  popular: true
                },
                {
                  title: "Compliance Package",
                  price: "From $6,200/mo",
                  description: "Complete compliance readiness",
                  features: [
                    "All monthly monitoring features",
                    "Compliance mapping",
                    "Audit preparation",
                    "Evidence collection",
                    "Dedicated compliance expert"
                  ],
                  accent: "border-purple-500"
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-gray-800 border rounded-xl p-6 ${plan.accent} ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-center">{plan.title}</h3>
                  <p className="text-orange-400 text-xl font-medium mb-4 text-center">{plan.price}</p>
                  <p className="text-gray-400 text-center mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-medium ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Select Plan
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CyberJall Advantage Section */}
        {activeTab === 'cyberjall-advantage' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">
              The <span className="text-orange-400">CyberJall</span> Advantage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <p className="text-gray-300 text-lg mb-8">
                  When you select a CSPM service partner through CyberJall, you get more than just a vendor—you get a verified, collaborative cybersecurity ecosystem.
                </p>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-300">How It Works</h3>
                  <ol className="space-y-4">
                    {[
                      "Browse Verified Providers offering CSPM services",
                      "Compare Packages based on scope, timeline, and compliance support",
                      "Select & Submit your request — CyberJall will facilitate onboarding"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 text-center text-orange-300">CyberJall Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Verified Partners Only",
                    "Transparent Pricing",
                    "Multi-Provider Collaboration",
                    "Managed Engagement",
                    "AI-Powered Cyber Health Score",
                    "Access to CyberJall Insights",
                    "One Invoice, One Subscription"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-orange-300">Ready to Secure Your Cloud?</h3>
              <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
                Whether you need a one-time assessment or ongoing cloud security management, our verified providers can tailor a solution to your needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-medium text-lg"
                >
                  Request Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent hover:bg-gray-800 border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-medium text-lg"
                >
                  Browse Providers
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Strengthen Your Cloud <span className="text-red-500">Security Posture</span> Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Don&apos;t leave your cloud infrastructure vulnerable to misconfigurations and compliance gaps.
          </p>
          <motion.button
          onClick={()=>router.push("/contact_us")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg shadow-red-900/50"
          >
            Get Started with CSPM
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default CSPMPage;