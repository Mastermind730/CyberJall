/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function AttackSurfaceManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Attack Surface Management | CyberJall</title>
        <meta name="description" content="See What Hackers See — Discover, Monitor, and Secure Your Entire Digital Footprint" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/network-pattern.svg')] bg-repeat opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-orange-500">Attack Surface</span> Management
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                See What Hackers See — Discover, Monitor, and Secure Your Entire Digital Footprint
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                  Scan Your Surface
                </button>
                <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-8 py-3 rounded-lg font-medium transition-all">
                  How It Works
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-red-600 rounded-xl blur opacity-20 animate-pulse"></div>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <img 
                    src="/images/asm-dashboard.svg" 
                    alt="Attack Surface Dashboard" 
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
                <h2 className="text-3xl font-bold mb-6">Proactive Digital Footprint Management</h2>
                <p className="text-gray-300 mb-6">
                  As businesses grow, so does their digital exposure — new subdomains, forgotten cloud assets, shadow APIs, and misconfigured servers can easily slip under the radar. Attack Surface Management (ASM) is the proactive process of continuously discovering, classifying, and monitoring all external-facing assets that could be exploited by attackers.
                </p>
                <p className="text-gray-300 mb-8">
                  CyberJall connects your business with ASM experts who help you identify these blind spots, assess vulnerabilities, and reduce exposure — before adversaries can take advantage.
                </p>
                <div className="bg-gray-900 border-l-4 border-orange-500 p-4">
                  <h3 className="text-orange-500 font-medium mb-2">Ideal For</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Startups scaling rapidly with little visibility across teams</li>
                    <li>Enterprises adopting cloud-native or DevOps culture</li>
                    <li>Businesses undergoing mergers, cloud migration, or digital transformation</li>
                    <li>Compliance-driven organizations needing surface exposure audits</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute -inset-4 bg-red-600 rounded-xl blur opacity-20"></div>
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 p-6">
                    <img 
                      src="/images/digital-footprint.svg" 
                      alt="Digital Footprint Visualization" 
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
            <h2 className="text-3xl font-bold mb-12 text-center">Why Attack Surface Management Matters</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
                <h3 className="text-xl font-semibold mb-4 text-red-500">The Harsh Reality</h3>
                <p className="text-gray-300 mb-6">
                  70% of successful breaches start from unknown or unmanaged assets. Attackers don&apos;t wait — they scan and exploit vulnerabilities 24/7.
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                  <p className="text-orange-500 italic">
                    &quot;If you don&apos;t know what your attack surface looks like, someone else does.&quot;
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">Modern Challenges</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Shadow IT and decentralized development lead to blind spots</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Continuous monitoring is essential in agile, cloud-first environments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>New assets are deployed faster than security teams can track</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-6">The Expanding Attack Surface Problem</h3>
                  <p className="text-gray-300 mb-8">
                    As organizations adopt cloud services, microservices architectures, and rapid deployment cycles, 
                    their digital footprint grows exponentially. Traditional asset inventories become outdated within days. 
                    ASM provides the continuous visibility needed to stay ahead of attackers.
                  </p>
                  <div className="inline-flex items-center bg-red-600/20 px-4 py-2 rounded-full text-red-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Visibility is the first step to defence</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Deliverables Section */}
        {activeTab === 'deliverables' && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Deliverables</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ),
                  title: "Asset Discovery & Mapping",
                  items: [
                    "Scan all public-facing assets: domains, subdomains, IPs, cloud services, APIs",
                    "Tag and classify assets by risk, ownership, and exposure level"
                  ]
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  ),
                  title: "Risk Assessment & Prioritization",
                  items: [
                    "Identify misconfigurations, open ports, outdated software, and weak SSL",
                    "Risk scoring based on exploitability and asset criticality"
                  ]
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ),
                  title: "Shadow IT Detection",
                  items: [
                    "Uncover unmanaged assets and rogue services",
                    "Highlight unused services that increase surface area"
                  ]
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                  title: "Continuous Monitoring",
                  items: [
                    "Real-time alerts when new assets appear",
                    "Integration with SIEM and SecOps workflows"
                  ]
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "Executive Reporting",
                  items: [
                    "Visual dashboard with exposure trends",
                    "Actionable remediation plans"
                  ]
                }
              ].map((deliverable, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/10 h-full"
                >
                  <div className="mb-4">
                    {deliverable.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{deliverable.title}</h3>
                  <ul className="space-y-2 text-gray-400">
                    {deliverable.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
                  title: "One-Time Audit",
                  desc: "A comprehensive scan and assessment with executive summary",
                  price: "From $10,000",
                  features: [
                    "Full asset discovery",
                    "Risk assessment report",
                    "Remediation roadmap",
                    "Executive briefing"
                  ],
                  color: "border-orange-500"
                },
                {
                  title: "Continuous Monitoring",
                  desc: "24/7 monitoring with monthly reporting and alerting",
                  price: "From $6,500/month",
                  features: [
                    "Continuous asset discovery",
                    "Monthly risk reports",
                    "Real-time alerts",
                    "Priority support",
                    "Quarterly strategy sessions"
                  ],
                  color: "border-red-600",
                  popular: true
                },
                {
                  title: "ASM + Remediation",
                  desc: "Hands-on remediation and security configuration guidance",
                  price: "Custom Pricing",
                  features: [
                    "Everything in Continuous Monitoring",
                    "Dedicated security engineer",
                    "Remediation support",
                    "Configuration reviews",
                    "Compliance alignment"
                  ],
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
                  <div className="p-6 bg-gray-900 h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-gray-400 mb-4">{option.desc}</p>
                    <p className="text-2xl font-bold mb-6">{option.price}</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-500 mr-2">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-medium ${option.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all mt-auto`}>
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8 text-center">The CyberJall ASM Advantage</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Verified ASM Experts",
                    desc: "Partners use enterprise-grade tools (Shodan, Censys, Security-Trails)"
                  },
                  {
                    title: "Real-Time Discovery",
                    desc: "Continuous asset identification with risk prioritization"
                  },
                  {
                    title: "Stack Integration",
                    desc: "Works with AWS, Azure, Kubernetes, or traditional datacenters"
                  },
                  {
                    title: "Comprehensive Bundles",
                    desc: "Combine ASM with VAPT, Compliance, or XDR services"
                  },
                  {
                    title: "Cyber Health Score",
                    desc: "Track exposure reduction via your CyberJall Health Dashboard"
                  },
                  {
                    title: "Expert Insights",
                    desc: "Quarterly threat briefings and best practices included"
                  }
                ].map((advantage, index) => (
                  <div key={index} className="bg-black/30 p-4 rounded-lg border border-gray-800">
                    <h4 className="text-orange-500 font-medium mb-2">{advantage.title}</h4>
                    <p className="text-gray-300 text-sm">{advantage.desc}</p>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Discover Your True Attack Surface?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Visibility is the first step to defence — let CyberJall help you see what hackers see before they act.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
              Get Started Today
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-8 py-3 rounded-lg font-medium transition-all">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}