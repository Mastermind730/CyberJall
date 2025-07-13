"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function XDRServicePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Head>
        <title>XDR Services | CyberJall Cybersecurity Marketplace</title>
        <meta name="description" content="Extended Detection & Response solutions tailored to your environment" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                CyberJall
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition">Services</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Solutions</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Partners</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Resources</a>
            </nav>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition transform hover:scale-105">
              Contact Experts
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                XDR Services
              </span>
              <br />
              <span>Unify Detection, Streamline Response</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              See & stop threats across all layers with Extended Detection and Response solutions tailored to your environment
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-medium text-lg transition transform hover:scale-105 shadow-lg shadow-red-900/30">
                Get Started
              </button>
              <button className="border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-md font-medium text-lg transition transform hover:scale-105">
                Speak to Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Threat Visualization */}
      <div className="relative z-0 h-48 overflow-hidden">
        <ThreatVisualization />
      </div>

      {/* Content Tabs */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-800">
            {['overview', 'why-it-matters', 'deliverables', 'engagement'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-lg transition ${activeTab === tab ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'}`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          <div className={`max-w-5xl mx-auto transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'why-it-matters' && <WhyItMattersTab />}
            {activeTab === 'deliverables' && <DeliverablesTab />}
            {activeTab === 'engagement' && <EngagementTab />}
          </div>
        </div>
      </section>

      {/* CyberJall Advantage */}
      <section className="relative z-10 py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                CyberJall Advantage
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              More than a tool — a collaborative, intelligence-driven defense layer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/30 transition hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-6">
                  <advantage.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{advantage.title}</h3>
                <p className="text-gray-400">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gray-900/50 border border-gray-800 rounded-2xl p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Threat Detection?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Connect with our verified XDR specialists today and get a tailored solution for your environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium text-lg transition transform hover:scale-105 shadow-lg shadow-orange-900/30">
                Browse XDR Partners
              </button>
              <button className="border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-md font-medium text-lg transition transform hover:scale-105">
                Request Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                  CyberJall
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                The cybersecurity marketplace connecting businesses with elite security providers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">XDR</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Threat Intelligence</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Cloud Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Webinars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Threat Reports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">API Docs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 CyberJall. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                <GitHubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tab Components
function OverviewTab() {
  return (
    <div>
      <p className="text-xl text-gray-300 mb-8">
        As cyberattacks grow in complexity, businesses can no longer rely on isolated security tools. Extended Detection and Response (XDR) brings together data from endpoints, servers, cloud, emails, and networks into a single intelligent system — enabling real-time detection, faster investigation, and automated response to threats.
      </p>
      <p className="text-xl text-gray-300 mb-8">
        With CyberJall, you can connect with XDR experts who help integrate, configure, and manage the right solution tailored to your environment — boosting visibility while reducing your time to respond.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-white">Ideal For</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">SaaS companies scaling beyond endpoint security</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Enterprises needing unified visibility across hybrid or multi-cloud environments</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Regulated businesses (finance, health, legal) requiring fast incident response</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-white">Supported Platforms</h3>
          <div className="flex flex-wrap gap-4">
            {['Microsoft Defender XDR', 'SentinelOne', 'Palo Alto Cortex XDR', 'CrowdStrike', 'Trend Micro'].map((platform) => (
              <span key={platform} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md text-sm">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyItMattersTab() {
  return (
    <div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white">The Challenge with Traditional EDR</h3>
        <p className="text-xl text-gray-300 mb-8">
          Traditional EDR tools focus only on endpoint data, missing multi-vector attacks that span across your cloud, network, and email systems.
        </p>
        <div className="bg-gray-900/50 border border-red-900/50 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangleIcon className="w-6 h-6 text-red-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-white mb-2">The Visibility Gap</h4>
              <p className="text-gray-300">
                Over 60% of modern attacks involve multiple attack vectors, yet most security teams are forced to pivot between 5+ consoles to investigate.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-white">How XDR Transforms Security</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Cross-Layer Detection",
              desc: "Identifies sophisticated attacks that span endpoints, cloud, network, and email systems",
              icon: LayersIcon
            },
            {
              title: "Reduced Alert Fatigue",
              desc: "Intelligent correlation reduces noise by up to 90% compared to traditional SIEM",
              icon: BellOffIcon
            },
            {
              title: "Faster Response",
              desc: "Automated playbooks reduce mean time to respond from hours to minutes",
              icon: ZapIcon
            },
            {
              title: "SOC Integration",
              desc: "Seamlessly works with your existing security operations center workflows",
              icon: UsersIcon
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-500/30 transition">
              <div className="flex items-start">
                <item.icon className="w-6 h-6 text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliverablesTab() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Unified Threat Detection</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Combine data from endpoints, cloud, network, email, and applications</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Correlate alerts to identify advanced attack patterns</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">AI-powered anomaly detection across all telemetry</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Automated Incident Response</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Pre-built playbooks for phishing, ransomware, insider threats</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Auto-containment (e.g., isolate endpoint, revoke user tokens)</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Customizable workflows for your specific environment</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">XDR Platform Setup</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Deployment of leading XDR platforms</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Integration with existing SIEM, SOAR, or EDR tools</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Custom policy configuration for your risk profile</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">24/7 Threat Monitoring</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Continuous monitoring and response via managed XDR services</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Alert triage, escalation, and response support</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-300">Monthly threat reports and improvement recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function EngagementTab() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "XDR Assessment",
            desc: "Evaluate readiness for XDR implementation",
            features: [
              "Current security posture analysis",
              "XDR suitability assessment",
              "Integration requirements",
              "ROI projection"
            ],
            price: "From $5,000"
          },
          {
            title: "XDR Deployment",
            desc: "Full integration and policy configuration",
            features: [
              "Platform selection guidance",
              "Custom deployment",
              "Integration with existing tools",
              "Team training",
              "30-day support"
            ],
            price: "From $25,000",
            popular: true
          },
          {
            title: "Managed XDR",
            desc: "24/7 threat monitoring and incident handling",
            features: [
              "Full platform management",
              "Dedicated security analysts",
              "Incident response",
              "Monthly reporting",
              "Continuous optimization"
            ],
            price: "From $15,000/mo"
          }
        ].map((pkg, index) => (
          <div 
            key={index} 
            className={`relative border rounded-xl p-8 ${pkg.popular ? 'border-orange-500 bg-gray-900' : 'border-gray-800 bg-gray-900/50'}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2 text-white">{pkg.title}</h3>
            <p className="text-gray-400 mb-6">{pkg.desc}</p>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-orange-400 text-xl font-bold mb-4">{pkg.price}</div>
            <button className={`w-full py-3 rounded-md font-medium transition ${pkg.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated Threat Visualization Component
function ThreatVisualization() {
  const [activeThreat, setActiveThreat] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThreat((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const threats = [
    { name: "Endpoint", color: "red" },
    { name: "Cloud", color: "orange" },
    { name: "Network", color: "purple" },
    { name: "Email", color: "blue" },
    { name: "Application", color: "green" }
  ];

  return (
    <div className="relative w-full h-full">
      {/* Central Shield */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-900 border-2 border-red-500 rounded-full flex items-center justify-center animate-pulse">
            <ShieldIcon className="w-12 h-12 text-red-500" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-0 animate-ping-slow"></div>
        </div>
      </div>

      {/* Threat Nodes */}
      {threats.map((threat, index) => {
        const angle = (index * 72) * (Math.PI / 180);
        const distance = 120;
        const x = 50 + distance * Math.cos(angle);
        const y = 50 + distance * Math.sin(angle);
        
        return (
          <div 
            key={index}
            className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-1000 ${activeThreat === index ? 'opacity-100 scale-110' : 'opacity-60 scale-90'}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              backgroundColor: `var(--${threat.color}-900)`,
              border: `2px solid var(--${threat.color}-500)`,
              transform: `translate(-50%, -50%) ${activeThreat === index ? 'scale(1.1)' : 'scale(0.9)'}`
            }}
          >
            <span className="text-xs font-bold text-white">{threat.name}</span>
            {/* Animated attack line */}
            {activeThreat === index && (
              <div className="absolute w-full h-px bg-red-500 origin-left animate-attack-line" style={{
                transform: `rotate(${angle}rad)`,
                width: `${distance}px`,
                left: '50%',
                top: '50%'
              }}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  className?: string;  // Made optional since it might not always be provided
}
// Icons (Replace with actual icon components from your library)
function ShieldIcon(props:Props) {
  return (
    <svg {...props}  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckCircleIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertTriangleIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function LayersIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function BellOffIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
      <path d="M18 8a6 6 0 0 0-9.33-5" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function ZapIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function UsersIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CheckIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TwitterIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function LinkedInIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon(props:Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// Advantage data
const advantages = [
  {
    title: "Verified XDR Specialists",
    description: "Work with vetted professionals experienced in implementing industry-leading XDR platforms.",
    icon: ShieldIcon
  },
  {
    title: "Tool-Agnostic Solutions",
    description: "Get solutions tailored to your existing SIEM, EDR, and SOC infrastructure.",
    icon: LayersIcon
  },
  {
    title: "End-to-End Support",
    description: "From assessment to deployment and 24/7 monitoring, we coordinate your entire journey.",
    icon: CheckCircleIcon
  },
  {
    title: "Bundled Security Services",
    description: "Combine XDR with AI Threat Hunting, ASM, or Cloud Compliance under one subscription.",
    icon: ZapIcon
  },
  {
    title: "Cyber Health Scoring",
    description: "Track your detection maturity and response efficiency through our AI-powered dashboard.",
    icon: AlertTriangleIcon
  },
  {
    title: "Exclusive Community Access",
    description: "Get threat feeds, expert webinars, detection playbooks, and landscape reports.",
    icon: UsersIcon
  }
];