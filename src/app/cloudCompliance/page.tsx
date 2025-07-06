"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle, FiFileText, FiAlertTriangle, FiGrid, FiLayers, FiAward } from 'react-icons/fi';

const ComplianceMappingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('SOC 2');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const frameworks = [
    { name: 'SOC 2', type: 'Security Compliance' },
    { name: 'ISO 27001', type: 'Information Security' },
    { name: 'GDPR', type: 'Data Privacy' },
    { name: 'HIPAA', type: 'Healthcare Data' },
    { name: 'PCI DSS', type: 'Payment Security' },
    { name: 'NIST CSF', type: 'Cybersecurity' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Cloud Compliance Mapping | CyberJall</title>
        <meta name="description" content="Align your cloud infrastructure with global regulatory standards" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/compliance-pattern.svg')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-red-900/30 px-4 py-2 rounded-full mb-6 border border-red-800">
              <FiAward className="text-orange-400 mr-2" />
              <span className="text-orange-300 font-medium">Compliance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cloud <span className="text-red-500">Compliance</span> Mapping
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Align your cloud infrastructure with global regulatory standards and achieve audit readiness
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
                View Frameworks
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
          <FiLayers className="text-orange-400 text-4xl animate-pulse" />
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <FiLayers /> },
              { id: 'frameworks', label: 'Frameworks', icon: <FiGrid /> },
              { id: 'deliverables', label: 'Deliverables', icon: <FiFileText /> },
              { id: 'solutions', label: 'Solutions', icon: <FiCheckCircle /> },
              { id: 'cyberjall-advantage', label: 'CyberJall Advantage', icon: <FiShield /> },
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
                Achieve <span className="text-red-500">Compliance</span> in the Cloud
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Our Cloud Compliance Mapping service helps your business align its AWS, Azure, or GCP environment with leading cybersecurity and data privacy standards through structured assessment and mapping.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiAlertTriangle className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Why It Matters</h4>
                    <p className="text-gray-400">
                      Without proper compliance, businesses risk losing deals, facing penalties, or failing audits. Get clear visibility into your current posture and what needs remediation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-100">Our Approach</h4>
                    <p className="text-gray-400">
                      We identify gaps, recommend control improvements, and guide you toward audit readiness — ensuring your cloud is secure, documented, and compliant.
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
                    <h4 className="font-medium text-orange-300">SOC 2 Compliance</h4>
                    <p className="text-sm text-gray-400">5 critical gaps in security controls</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-medium text-red-300">GDPR Alignment</h4>
                    <p className="text-sm text-gray-400">3 data protection requirements missing</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-medium text-green-300">ISO 27001</h4>
                    <p className="text-sm text-gray-400">78% of controls currently implemented</p>
                  </div>
                </div>
                <div className="mt-6 bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Overall Compliance Score</span>
                    <span className="text-orange-400 font-medium">64/100</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Frameworks Section */}
        {activeTab === 'frameworks' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              Supported <span className="text-red-500">Compliance Frameworks</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedFramework(framework.name)}
                  className={`cursor-pointer ${selectedFramework === framework.name ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500' : 'bg-gray-800/50 border-gray-700'} border rounded-xl p-6 transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-3 ${selectedFramework === framework.name ? 'bg-orange-500' : 'bg-gray-600'}`}></div>
                    <h3 className="text-xl font-semibold text-gray-100">{framework.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{framework.type}</p>
                  <div className={`h-1 w-full ${selectedFramework === framework.name ? 'bg-orange-500' : 'bg-gray-700'} rounded-full mb-4`}></div>
                  <p className="text-gray-300 text-sm">
                    {framework.name === 'SOC 2' && 'Security controls for service organizations'}
                    {framework.name === 'ISO 27001' && 'International information security standard'}
                    {framework.name === 'GDPR' && 'EU data protection and privacy regulation'}
                    {framework.name === 'HIPAA' && 'Protected health information security'}
                    {framework.name === 'PCI DSS' && 'Payment card industry data security'}
                    {framework.name === 'NIST CSF' && 'US government cybersecurity framework'}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">{selectedFramework} Requirements</h3>
                  <ul className="space-y-3">
                    {selectedFramework === 'SOC 2' && (
                      <>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Security policies and procedures documentation</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Access control implementation and monitoring</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Change management processes</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Vendor management program</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Incident response planning</span>
                        </li>
                      </>
                    )}
                    {selectedFramework === 'ISO 27001' && (
                      <>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Information security policy</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Risk assessment methodology</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Asset management controls</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Cryptographic controls implementation</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheckCircle className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">Business continuity planning</span>
                        </li>
                      </>
                    )}
                    {/* Add other frameworks similarly */}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">Our Mapping Process</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                      <div>
                        <h4 className="font-medium text-gray-100">Initial Assessment</h4>
                        <p className="text-gray-400 text-sm">Review current cloud configuration against {selectedFramework} requirements</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                      <div>
                        <h4 className="font-medium text-gray-100">Gap Analysis</h4>
                        <p className="text-gray-400 text-sm">Identify missing controls and compliance deficiencies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                      <div>
                        <h4 className="font-medium text-gray-100">Remediation Plan</h4>
                        <p className="text-gray-400 text-sm">Provide prioritized recommendations to address gaps</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                      <div>
                        <h4 className="font-medium text-gray-100">Documentation</h4>
                        <p className="text-gray-400 text-sm">Prepare compliance evidence and audit materials</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-900/50 text-orange-400 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">5</span>
                      <div>
                        <h4 className="font-medium text-gray-100">Readiness Review</h4>
                        <p className="text-gray-400 text-sm">Validate preparedness for formal audit or assessment</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
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
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Compliance Gap Analysis",
                  description: "Detailed report comparing your current state against selected framework requirements",
                  icon: <FiFileText className="text-orange-400 text-2xl" />,
                  features: ["Control deficiencies", "Risk scoring", "Prioritized remediation"]
                },
                {
                  title: "Cloud Control Mapping",
                  description: "Documentation showing how existing controls map to compliance requirements",
                  icon: <FiGrid className="text-red-400 text-2xl" />,
                  features: ["AWS/Azure/GCP controls", "SaaS application coverage", "Evidence collection"]
                },
                {
                  title: "Remediation Guidance",
                  description: "Actionable recommendations to address compliance gaps",
                  icon: <FiCheckCircle className="text-green-400 text-2xl" />,
                  features: ["Technical configurations", "Policy templates", "Implementation roadmap"]
                },
                {
                  title: "Audit Readiness Package",
                  description: "Materials to support formal compliance audits",
                  icon: <FiAward className="text-blue-400 text-2xl" />,
                  features: ["Checklists", "Sample responses", "Evidence organization"]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
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
              Compliance <span className="text-red-500">Solutions</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "One-time Mapping Report",
                  price: "From $6,500",
                  description: "Comprehensive assessment of your compliance posture",
                  features: [
                    "Single framework assessment",
                    "Gap analysis report",
                    "Remediation roadmap",
                    "30-day support"
                  ],
                  bestFor: "Startups preparing for first audit"
                },
                {
                  title: "Compliance + CSPM Bundle",
                  price: "From $9,800",
                  description: "Combine compliance mapping with continuous security monitoring",
                  features: [
                    "Framework assessment",
                    "Ongoing CSPM monitoring",
                    "Quarterly reviews",
                    "90-day support",
                    "Cyber Health Score"
                  ],
                  bestFor: "Growing companies needing both compliance and security",
                  popular: true
                },
                {
                  title: "Quarterly Readiness Support",
                  price: "From $4,200/mo",
                  description: "Ongoing compliance maintenance and audit support",
                  features: [
                    "Continuous compliance monitoring",
                    "Policy updates",
                    "Audit preparation",
                    "Evidence collection",
                    "Unlimited consultations"
                  ],
                  bestFor: "Enterprise teams with regular audits"
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
                  When you choose Compliance Mapping through CyberJall, you get more than just a service—you get a strategic partner in your compliance journey.
                </p>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-300">How It Works</h3>
                  <ol className="space-y-4">
                    {[
                      "Select your target compliance framework(s)",
                      "Choose a service package that fits your needs",
                      "Our verified experts conduct the assessment",
                      "Receive actionable roadmap to compliance",
                      "Achieve and maintain audit readiness"
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
                <h3 className="text-xl font-semibold mb-6 text-center text-orange-300">Why Choose CyberJall</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: <FiShield />, text: "Verified compliance specialists with industry experience" },
                    { icon: <FiFileText />, text: "Clear scope and milestone-based delivery" },
                    { icon: <FiLayers />, text: "Combine with VAPT in a single package" },
                    { icon: <FiAward />, text: "Cyber Health Score dashboard to track progress" },
                    { icon: <FiCheckCircle />, text: "Free access to audit tools and policy templates" },
                    { icon: <FiGrid />, text: "Flexible subscription options with one-click renewals" }
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
              <h3 className="text-2xl font-bold mb-6 text-orange-300">Ready to Achieve Compliance?</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Whether you&apos;re preparing for your first audit or need ongoing compliance support, our verified providers can help you meet regulatory requirements.
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
            Start Your <span className="text-red-500">Compliance Journey</span> Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Don&apos;t risk penalties or lost business due to non-compliance. Secure your cloud infrastructure now.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg shadow-red-900/50"
          >
            Get Compliance Assessment
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default ComplianceMappingPage;