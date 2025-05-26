"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Target, Users, Zap, ChevronRight, Globe, Lock, TrendingUp, Award, CheckCircle, ArrowRight, Bug, Search, Eye } from 'lucide-react';
import Link from 'next/link';

interface FloatingOrbProps{
  size:string;
  color:string;
  top:string;
  left:string;
  delay:string;
}

interface Industry {
  icon: string;
  name: string;
}

const CyberJallBugBounty = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number|null>(null);

  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const industries: Industry[] = [
    { icon: "🏦", name: "Fintech & Banking" },
    { icon: "🛒", name: "E-commerce" },
    { icon: "☁️", name: "SaaS Companies" },
    { icon: "📱", name: "Mobile Apps" },
    { icon: "🏢", name: "Enterprise" },
    { icon: "🏥", name: "Healthcare" },
    { icon: "🎓", name: "EdTech" },
    { icon: "🚚", name: "Logistics" },
    { icon: "🏛️", name: "Government" },
    { icon: "🎬", name: "Media" },
    { icon: "✈️", name: "Travel" },
    { icon: "🔗", name: "Web3" }
  ];

  const benefits = [
    { icon: <Zap className="w-6 h-6" />, text: 'Real-time vulnerability discovery' },
    { icon: <Users className="w-6 h-6" />, text: 'Diverse hacker perspectives (beyond automated tools)' },
    { icon: <Award className="w-6 h-6" />, text: 'Performance-based payouts — pay only for valid findings' },
    { icon: <Shield className="w-6 h-6" />, text: 'Continuous coverage vs one-time testing' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Builds public trust & supports compliance' }
  ];

  const steps = [
    { icon: <Search className="w-8 h-8" />, title: 'Browse', desc: 'Browse trusted bug bounty vendors in our marketplace' },
    { icon: <Target className="w-8 h-8" />, title: 'Compare', desc: 'Compare features, pricing, and support options' },
    { icon: <Users className="w-8 h-8" />, title: 'Connect', desc: 'Get introduced to the vendor that fits your needs' },
    { icon: <Zap className="w-8 h-8" />, title: 'Launch', desc: 'Launch your program and start receiving bug submissions' },
    { icon: <Eye className="w-8 h-8" />, title: 'Track', desc: 'Track vulnerabilities and pay rewards securely' }
  ];

  const FloatingOrb:React.FC<FloatingOrbProps> = ({ size, color, top, left, delay }) => (
    <div 
      className={`absolute rounded-full blur-xl opacity-20 animate-pulse`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top: top,
        left: left,
        animationDelay: delay,
        animationDuration: '3s'
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <FloatingOrb size="300px" color="#dc2626" top="10%" left="80%" delay="0s" />
        <FloatingOrb size="400px" color="#ea580c" top="60%" left="10%" delay="1s" />
        <FloatingOrb size="250px" color="#991b1b" top="30%" left="60%" delay="2s" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 opacity-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, #dc2626 0%, #ea580c 100%)'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
       

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-full px-6 py-2 mb-8 border border-red-500/30">
              <Bug className="w-5 h-5 text-red-400" />
              <span className="text-red-300">Bug Bounty Programs</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-red-200 to-orange-300 bg-clip-text text-transparent">
                Crowdsource Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Cybersecurity
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover leading bug bounty platforms that help your business detect vulnerabilities before attackers do. 
              CyberJall brings together top vendors so you can compare, evaluate, and choose the right fit for your security goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 flex items-center space-x-2 text-lg font-semibold">
                <span>Explore Programs</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link href={"/contact_us"} className="px-8 py-4 border border-red-500/50 rounded-full hover:bg-red-500/10 transition-all duration-300 transform hover:scale-105 text-lg font-semibold">
                Talk to Expert
              </Link>
            </div>
          </div>
        </section>

        {/* Why Bug Bounty Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Why Bug Bounty?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern businesses are under constant threat. Traditional pentesting has limits — but bug bounty programs 
              give you continuous, real-world testing by a global community of vetted ethical hackers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit.text}
                  </p>
                </div>
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Who Should Use Bug Bounty?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bug bounty programs are ideal for any business that handles sensitive data, runs public-facing digital platforms, 
              or prioritizes continuous security.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="group p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-2xl text-red-400 group-hover:text-red-300 transition-colors duration-300" >{industry.icon}</div>
                  <span className="text-2xl text-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                    {industry.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                How It Works via CyberJall
              </span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Connection Lines */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 opacity-30" />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative group text-center">
                    <div className="relative z-10 mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                        {step.icon}
                      </div>
                      <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-red-300">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 right-0 transform translate-x-1/2">
                        <ChevronRight className="w-6 h-6 text-red-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Add-Ons Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                CyberJall Exclusive Add-Ons
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              When you choose a bug bounty vendor through CyberJall, you don&apos;t just launch a program — you unlock a powerful security advantage.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CyberJall Insights Card */}
            <div className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-red-500/30 hover:border-red-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Free Access to CyberJall Insights</h3>
                    <p className="text-red-300">Stay informed. Stay proactive.</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  All bug bounty clients get complimentary access to our premium CyberJall Insights community:
                </p>
                
                <div className="space-y-3 mb-6">
                  {[
                    'Industry-specific case studies',
                    'Cybersecurity news feed (threat alerts, tech updates, regulatory shifts)',
                    'Webinars with experts',
                    'AI-powered cyber health score',
                    'Personalized security improvement plans'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <blockquote className="italic text-orange-300 border-l-4 border-orange-500 pl-4">
                  Insights that empower you to evolve beyond just finding bugs — to building stronger security
                </blockquote>
              </div>
            </div>

            {/* Penetration Testing Card */}
            <div className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl border border-red-500/30 hover:border-red-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Free 2-Month Penetration Testing</h3>
                    <p className="text-red-300">From bugs to deep analysis.</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Every bug bounty program booked via CyberJall includes a free 2-month manual penetration testing service 
                  delivered by trusted CyberJall partners.
                </p>
                
                <div className="space-y-3 mb-6">
                  {[
                    'Covers one digital asset (Web, API, Mobile, or Cloud)',
                    'Includes a detailed report + remediation guidance',
                    'Scheduled after 60 days of bounty activity to validate findings'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <blockquote className="italic text-orange-300 border-l-4 border-orange-500 pl-4">
                  We combine the power of crowdsourced security with professional expert-led testing — for complete coverage
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Why It Matters
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-red-500/20">
                <CheckCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-gray-300">Real-time bug discovery (bug bounty)</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-red-500/20">
                <CheckCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-gray-300">Structured security evaluation (manual pentest)</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-red-500/20">
                <CheckCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-gray-300">Strategic awareness (CyberJall Insights)</p>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-orange-300 mb-8">
              An end-to-end cybersecurity stack for growing businesses.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Need Guidance?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Not sure how bug bounty differs from pentesting? Want help setting a reward policy or defining scope? 
              Our team can assist you at every step.
            </p>
            
            <button className="px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 text-xl font-bold flex items-center space-x-3 mx-auto">
              <span>Talk to a CyberJall Expert</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default CyberJallBugBounty;