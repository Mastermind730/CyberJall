"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AIThreatHunting() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState<number|null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>AI Threat Hunting & Intelligence | CyberJall</title>
        <meta name="description" content="Proactive Threat Discovery with Machine Learning and Global Intelligence Feeds" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-repeat opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-orange-500">AI Threat Hunting</span> & Intelligence
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Proactive Threat Discovery with Machine Learning and Global Intelligence Feeds
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                  Get Started
                </button>
                <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-8 py-3 rounded-lg font-medium transition-all">
                  Explore Providers
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-red-600 rounded-xl blur opacity-20 animate-pulse"></div>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <img 
                    src="/images/threat-hunting-dashboard.svg" 
                    alt="AI Threat Hunting Dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-800">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'why-it-matters', 'deliverables', 'engagement'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-400'}`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proactive Threat Discovery</h2>
                <p className="text-gray-300 mb-6">
                  Today&apos;s cyberattacks often bypass traditional security tools. AI Threat Hunting & Intelligence is a proactive service that uses machine learning models, behavioural analytics, and global threat feeds to detect hidden threats, unknown malware, and evolving adversary tactics — before they escalate into breaches.
                </p>
                <p className="text-gray-300 mb-8">
                  CyberJall connects your business with elite providers who specialize in AI-powered security analytics, custom threat hunting, and contextual threat intelligence to help you stay ahead of the curve.
                </p>
                <div className="bg-gray-900 border-l-4 border-orange-500 p-4">
                  <h3 className="text-orange-500 font-medium mb-2">Ideal For</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Fintech, SaaS, and cloud-native businesses facing advanced attacks</li>
                    <li>Enterprises under threat from ransomware, espionage, or insider risks</li>
                    <li>Teams preparing for red team exercises or adversary emulation</li>
                    <li>Organizations looking to shift from reactive to proactive defense</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute -inset-4 bg-red-600 rounded-xl blur opacity-20"></div>
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 p-6">
                    <img 
                      src="/images/ai-threat-detection.svg" 
                      alt="AI Threat Detection" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why It Matters Section */}
        {activeTab === 'why-it-matters' && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Why AI Threat Hunting Matters</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: '🔍',
                  title: 'Beyond Signatures',
                  desc: 'Traditional SIEMs rely on known signatures — modern threats don\'t'
                },
                {
                  icon: '⏳',
                  title: 'APT Dwell Time',
                  desc: 'APTs often live inside systems undetected for months'
                },
                {
                  icon: '🤖',
                  title: 'AI Pattern Recognition',
                  desc: 'AI enables pattern recognition across massive data volumes'
                },
                {
                  icon: '🌐',
                  title: 'Real-time Intel',
                  desc: 'Threat intel helps anticipate attack trends in real time'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-6">The Threat Landscape is Evolving</h3>
                  <p className="text-gray-300 mb-8">
                    Cyber adversaries are increasingly using AI and automation to launch sophisticated attacks. 
                    Legacy security tools can&apos;t keep up with the speed and complexity of modern threats. 
                    AI-powered threat hunting provides the proactive defense needed in today&apos;s environment.
                  </p>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
                    Learn How We Can Help
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Deliverables Section */}
        {activeTab === 'deliverables' && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Deliverables</h2>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  title: "AI-Powered Threat Detection",
                  items: [
                    "Behavioural analytics on endpoints, cloud, network & apps",
                    "ML-based detection of lateral movement, privilege escalation, command/control patterns"
                  ]
                },
                {
                  title: "Threat Intelligence Integration",
                  items: [
                    "Real-time ingestion of global threat feeds (MITRE ATT&CK, VirusTotal, MISP, etc.)",
                    "Custom threat reports based on industry, geography & adversary groups"
                  ]
                },
                {
                  title: "Custom Threat Hunting Missions",
                  items: [
                    "Hypothesis-based threat hunts by certified experts",
                    "Detection of zero-day indicators, backdoors, and unusual traffic",
                    "Use of YARA rules, anomaly scoring, and memory forensics"
                  ]
                },
                {
                  title: "Threat Attribution & Reporting",
                  items: [
                    "Mapping IOCs and TTPs to known threat actors",
                    "Clear reporting with context, priority levels, and response recommendations"
                  ]
                }
              ].map((deliverable, index) => (
                <div 
                  key={index} 
                  className="border border-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                    className="w-full flex justify-between items-center p-6 bg-gray-900 hover:bg-gray-800 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-left">{deliverable.title}</h3>
                    <svg 
                      className={`w-5 h-5 text-orange-500 transition-transform ${expandedFeature === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFeature === index && (
                    <div className="p-6 bg-gray-900/50 border-t border-gray-800">
                      <ul className="space-y-3">
                        {deliverable.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-500 mr-2">✓</span>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engagement Options Section */}
        {activeTab === 'engagement' && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Engagement Options</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "One-Time Threat Hunt",
                  desc: "A focused mission targeting a suspected breach or vulnerability",
                  price: "From $15,000",
                  features: ["Targeted investigation", "Detailed findings report", "Remediation guidance"],
                  color: "border-orange-500"
                },
                {
                  title: "Ongoing Threat Intel",
                  desc: "Real-time updates + custom intel feeds + reports",
                  price: "From $8,000/month",
                  features: ["Continuous monitoring", "Customized threat feeds", "Quarterly strategy reviews"],
                  color: "border-red-600",
                  popular: true
                },
                {
                  title: "Managed Threat Hunting",
                  desc: "Continuous hunting with quarterly reviews & strategy alignment",
                  price: "Custom Pricing",
                  features: ["Dedicated threat hunters", "Full coverage", "Strategic alignment", "Executive reporting"],
                  color: "border-gray-700"
                }
              ].map((option, index) => (
                <div 
                  key={index} 
                  className={`relative border rounded-xl overflow-hidden ${option.color} ${option.popular ? 'ring-2 ring-orange-500' : ''}`}
                >
                  {option.popular && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6 bg-gray-900">
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-gray-400 mb-4">{option.desc}</p>
                    <p className="text-2xl font-bold mb-6">{option.price}</p>
                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-500 mr-2">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={"/contact_us"} className={`w-full py-3 rounded-lg font-medium ${option.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all`}>
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-center">The CyberJall Advantage</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Verified Threat Analysts & Data Scientists",
                  "Tailored Detection for Your Environment",
                  "Integrated Intelligence",
                  "Combine with XDR or Attack Surface Management",
                  "Cyber Health Score Enhancements"
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-red-600/20 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Threat Detection?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Proactive security is no longer optional — let CyberJall help you detect what others miss.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
              Get Started Today
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-8 py-3 rounded-lg font-medium transition-all">
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>

   
    </div>
  );
}