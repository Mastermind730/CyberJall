"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiAlertCircle, FiCheckCircle, FiDatabase, FiFileText, FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const DataProtectionPage = () => {
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
        <title>Cloud Data Protection & DLP | CyberJall</title>
        <meta name="description" content="Protect sensitive data across cloud platforms with advanced DLP solutions" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/data-pattern.svg')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-red-900/30 px-4 py-2 rounded-full mb-6 border border-red-800">
              <FiLock className="text-orange-400 mr-2" />
              <span className="text-orange-300 font-medium">Data Security</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cloud Data <span className="text-red-500">Protection</span> & DLP
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Safeguard sensitive data across all cloud platforms with advanced Data Loss Prevention
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
                See Solutions
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
          <FiDatabase className="text-orange-400 text-4xl animate-pulse" />
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <FiDatabase /> },
              { id: 'why-need', label: 'Why You Need DLP', icon: <FiAlertCircle /> },
              { id: 'deliverables', label: 'Key Deliverables', icon: <FiCheckCircle /> },
              { id: 'solutions', label: 'Solutions', icon: <FiShield /> },
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
                <span className="text-red-500">Protect</span> Sensitive Cloud Data
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Our Cloud Data Protection & Data Loss Prevention (DLP) services help organizations discover, classify, monitor, and control sensitive data across cloud storage, SaaS apps, and collaboration tools.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiEye className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Complete Visibility</h4>
                    <p className="text-gray-400">
                      Discover and classify sensitive data like PII, financial records, and IP across all your cloud platforms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiLock className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Proactive Protection</h4>
                    <p className="text-gray-400">
                      Prevent accidental or malicious leaks while maintaining compliance with regulations like GDPR and HIPAA.
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
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-medium text-red-300">Sensitive Data Found</h4>
                    <p className="text-sm text-gray-400">12 credit card numbers in shared Google Drive</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-300">Policy Violation</h4>
                    <p className="text-sm text-gray-400">HIPAA data shared externally via Microsoft Teams</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-medium text-green-300">Remediation Applied</h4>
                    <p className="text-sm text-gray-400">Auto-encrypted 23 sensitive files in AWS S3</p>
                  </div>
                </div>
                <div className="mt-6 bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Data Protection Score</span>
                    <span className="text-orange-400 font-medium">72/100</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Why You Need DLP Section */}
        {activeTab === 'why-need' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why <span className="text-red-500">Cloud DLP</span> Matters
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-orange-300">The Challenge</h3>
                <ul className="space-y-4">
                  {[
                    "Remote teams share more cloud data than ever before",
                    "Misconfigured access leads to accidental exposure",
                    "Insider threats and unauthorized sharing risks",
                    "Regulations mandate strong data protection",
                    "Sensitive data spreads across multiple platforms"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiAlertCircle className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-green-300">Our Solution</h3>
                <ul className="space-y-4">
                  {[
                    "Discover and classify sensitive data automatically",
                    "Monitor data flows in real-time across all clouds",
                    "Enforce encryption and access policies",
                    "Prevent leaks before they happen",
                    "Generate compliance reports automatically"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Supported Platforms</h3>
              <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                We protect data across all major cloud platforms and SaaS applications
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Google Workspace", icon: "/logos/google-workspace.svg" },
                  { name: "Microsoft 365", icon: "/logos/microsoft-365.svg" },
                  { name: "AWS S3", icon: "/logos/aws-s3.svg" },
                  { name: "Dropbox", icon: "/logos/dropbox.svg" },
                  { name: "Slack", icon: "/logos/slack.svg" },
                  { name: "Salesforce", icon: "/logos/salesforce.svg" },
                  { name: "GitHub", icon: "/logos/github.svg" },
                  { name: "Zoom", icon: "/logos/zoom.svg" }
                ].map((platform, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 rounded-lg p-4 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      {/* Platform icon would go here */}
                      <div className="text-2xl">{(platform.name[0] + platform.name[1]).toUpperCase()}</div>
                    </div>
                    <span className="text-gray-300 text-sm text-center">{platform.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Key Deliverables Section */}
        {activeTab === 'deliverables' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12">
              Key <span className="text-orange-400">Deliverables</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Data Discovery & Classification",
                  description: "Automated scanning to identify PII, PCI, PHI, and intellectual property across all cloud platforms",
                  icon: <FiEye className="text-orange-400 text-2xl" />
                },
                {
                  title: "DLP Policy Design",
                  description: "Custom policies tailored to your data types, compliance needs, and risk tolerance",
                  icon: <FiFileText className="text-red-400 text-2xl" />
                },
                {
                  title: "Real-time Monitoring",
                  description: "Continuous surveillance of data movements and sharing activities across all channels",
                  icon: <FiAlertCircle className="text-blue-400 text-2xl" />
                },
                {
                  title: "Encryption Management",
                  description: "Enforcement of encryption standards for data at rest and in transit",
                  icon: <FiLock className="text-purple-400 text-2xl" />
                },
                {
                  title: "Insider Threat Detection",
                  description: "Behavioral analysis to identify risky user activities and potential data exfiltration",
                  icon: <FiUsers className="text-green-400 text-2xl" />
                },
                {
                  title: "Compliance Reporting",
                  description: "Automated reports for GDPR, HIPAA, ISO 27001 and other regulatory frameworks",
                  icon: <FiCheckCircle className="text-yellow-400 text-2xl" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Solutions Section */}
        {activeTab === 'solutions' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Flexible <span className="text-red-500">DLP Solutions</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "One-time DLP Audit",
                  price: "From $5,200",
                  description: "Comprehensive assessment of your current data protection posture",
                  features: [
                    "Full data discovery scan",
                    "Risk assessment report",
                    "Policy gap analysis",
                    "Remediation roadmap",
                    "30-day support"
                  ],
                  bestFor: "Companies needing baseline understanding"
                },
                {
                  title: "Full DLP Deployment",
                  price: "From $8,500",
                  description: "End-to-end implementation of data protection controls",
                  features: [
                    "Custom policy configuration",
                    "System integration",
                    "Team training",
                    "Initial tuning",
                    "60-day support"
                  ],
                  bestFor: "Organizations ready for full protection",
                  popular: true
                },
                {
                  title: "Ongoing Monitoring",
                  price: "From $3,800/mo",
                  description: "Continuous protection with regular policy tuning",
                  features: [
                    "24/7 monitoring",
                    "Monthly reports",
                    "Quarterly policy reviews",
                    "Threat response",
                    "Compliance documentation"
                  ],
                  bestFor: "Businesses needing long-term data security"
                }
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-gray-800 border rounded-xl p-6 ${solution.popular ? 'ring-2 ring-orange-500 border-orange-500' : 'border-gray-700'}`}
                >
                  {solution.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-center">{solution.title}</h3>
                  <p className="text-orange-400 text-xl font-medium mb-4 text-center">{solution.price}</p>
                  <p className="text-gray-400 text-center mb-6">{solution.description}</p>
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6 text-center">
                    <span className="text-sm text-gray-400">Best for:</span>
                    <p className="text-gray-200 font-medium">{solution.bestFor}</p>
                  </div>
                  <motion.button
                  onClick={()=>{router.push("/contact_us")}}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-medium ${solution.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Get Started
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
                  By selecting a DLP provider on CyberJall, your business receives not just a service—but a trusted, guided experience designed for long-term success.
                </p>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-300">How It Works</h3>
                  <ol className="space-y-4">
                    {[
                      "Browse Data Protection & DLP Providers on CyberJall",
                      "Compare Packages, Delivery Timelines, and Reviews",
                      "Submit Your Request — We help you onboard the right service partner"
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
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: <FiShield />, text: "Vetted DLP Specialists with real-world threat experience" },
                    { icon: <FiFileText />, text: "Industry-Aligned Solutions for your specific regulatory needs" },
                    { icon: <FiUsers />, text: "Managed Coordination by CyberJall for successful delivery" },
                    { icon: <FiCheckCircle />, text: "One-Click Subscription Management with transparent pricing" },
                    { icon: <FiDatabase />, text: "AI-Powered Cyber Health Score to visualize your risk posture" },
                    { icon: <FiEye />, text: "Exclusive Insights Access to case studies and threat alerts" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-gray-700 p-2 rounded-lg mr-3 text-orange-400">
                        {benefit.icon}
                      </div>
                      <span className="text-gray-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-orange-300">Ready to Protect Your Cloud Data?</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Whether you need a compliance audit or complete DLP deployment, our verified providers can secure your sensitive data across all platforms.
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
            Start <span className="text-red-500">Protecting</span> Your Sensitive Data
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Don&apos;t wait for a data breach to take action. Secure your cloud environments today.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg shadow-red-900/50"
          >
            Get Started with DLP
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default DataProtectionPage;