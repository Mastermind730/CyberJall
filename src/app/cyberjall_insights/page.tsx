"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Play, 
  ChevronRight,
  Eye,
  Target,
  Zap,
  Lock,
  BookOpen,
  Activity,
  CheckCircle,
  ArrowRight,
  Globe,
  Calendar,
  BarChart3,
  Search,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function CyberJallInsights() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Industry-Wise Case Studies",
      description: "Real-world incidents and success stories from your industry",
      details: ["Real incidents, real results", "Filter by industry, business size, or attack type"],
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Activity,
      title: "Cybersecurity News Feed", 
      description: "Curated, actionable updates on threats and regulations",
      details: ["Threat Detection Alerts", "Regulatory Updates", "Tech Innovation"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Users,
      title: "Expert Webinars",
      description: "Monthly sessions with cybersecurity leaders",
      details: ["Live Q&A sessions", "On-demand access", "Industry veterans"],
      color: "from-red-600 to-orange-400"
    },
    {
      icon: BarChart3,
      title: "AI-Powered Cyber Health Score",
      description: "Real-time security posture assessment",
      details: ["Instant assessment", "Industry-specific analysis", "Track over time"],
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Target,
      title: "Personalized Suggestions",
      description: "Tailored steps to strengthen your defenses",
      details: ["Custom business profile", "Step-by-step improvements", "Regular updates"],
      color: "from-red-500 to-orange-600"
    }
  ];

  const stats = [
    { icon: Shield, value: "10K+", label: "Threats Detected" },
    { icon: Users, value: "500+", label: "Businesses Protected" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime Guaranteed" },
    { icon: Award, value: "24/7", label: "Expert Support" }
  ];

  const faqs = [
    {
      q: "What is CyberJall Insights?",
      a: "A premium knowledge and intelligence platform offered exclusively to CyberJall clients, including case studies, cybersecurity news, webinars, and AI-based assessments."
    },
    {
      q: "Is CyberJall Insights free or paid?",
      a: "Completely free for all CyberJall clients. We believe in empowering your business without hidden costs."
    },
    {
      q: "How often is the News Feed updated?",
      a: "Real-time updates for critical alerts, with daily/weekly curated content on regulatory updates and innovations."
    },
    {
      q: "How does the Cyber Health Score work?",
      a: "Our AI evaluates your cybersecurity posture using service usage, industry risk, and threat vectors to provide actionable insights."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-full border border-red-500/30 backdrop-blur-sm">
              <Brain className="w-6 h-6 text-orange-400 animate-pulse" />
              <span className="text-orange-300 font-semibold">CyberJall Insights</span>
              <Sparkles className="w-5 h-5 text-red-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
              Empowering Businesses
              <br />
              <span className="text-4xl md:text-6xl">with Cyber Intelligence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stay ahead of evolving threats, compliance changes, and innovation with our exclusive business-focused intelligence hub — 
              <span className="text-orange-400 font-semibold"> Free for All CyberJall Clients</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-lg hover:from-red-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-500/25">
                <span className="relative z-10 flex items-center gap-3">
                  <Eye className="w-6 h-6" />
                  Explore Insights Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group flex items-center gap-3 px-6 py-4 border-2 border-red-500/50 rounded-2xl hover:bg-red-500/10 transition-all duration-300">
                <Play className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl backdrop-blur-sm border border-red-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-3 animate-pulse" />
              <div className="text-3xl font-black text-red-400 mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your personalized cybersecurity knowledge companion — a premium intelligence suite built to help your business stay secure, informed, and resilient.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-red-900/40 to-orange-900/40 border-orange-500/60 shadow-2xl shadow-orange-500/20' 
                      : 'bg-gray-900/30 border-red-500/20 hover:border-orange-500/40'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-lg">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-400">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ChevronRight className="w-6 h-6 text-orange-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Visual */}
            <div className="lg:sticky lg:top-20">
              <div className="relative p-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-3xl border border-red-500/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-2xl font-bold text-orange-300">Live Dashboard Preview</h4>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>

                  {/* Mock Dashboard */}
                  <div className="space-y-6">
                    {/* Health Score */}
                    <div className="p-6 bg-black/30 rounded-2xl border border-red-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-300">Cyber Health Score</span>
                        <Activity className="w-5 h-5 text-orange-400" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-black text-green-400">87</div>
                        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-green-500 rounded-full transition-all duration-1000"
                            style={{ width: '87%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Threat Alerts */}
                    <div className="p-6 bg-black/30 rounded-2xl border border-red-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                        <span className="text-gray-300">Recent Alerts</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-gray-300">New phishing campaign detected</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                          <span className="text-sm text-gray-300">GDPR compliance update</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/20 hover:border-orange-500/40 transition-all group">
                        <BookOpen className="w-6 h-6 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-semibold">Case Studies</div>
                      </button>
                      <button className="p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/20 hover:border-red-500/40 transition-all group">
                        <Calendar className="w-6 h-6 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-semibold">Webinars</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Why CyberJall Insights?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Centralized Intelligence",
                description: "Trusted source of business-focused cybersecurity knowledge in one place",
                color: "from-red-500 to-orange-500"
              },
              {
                icon: TrendingUp,
                title: "Risk Reduction",
                description: "Helps you reduce risk, meet compliance, and make informed decisions",
                color: "from-orange-500 to-red-600"
              },
              {
                icon: Zap,
                title: "Zero Additional Cost",
                description: "Built exclusively for businesses using CyberJall — completely free",
                color: "from-red-600 to-orange-400"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-red-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group p-8 bg-gradient-to-r from-red-900/10 to-orange-900/10 rounded-2xl border border-red-500/20 hover:border-orange-500/40 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-orange-300 group-hover:text-orange-200 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-3xl border border-red-500/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5" />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Unlock Your Cyber Advantage
              </h2>
              <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                Cyber threats are growing. So is your intelligence.
                <br />
                <span className="text-orange-400 font-semibold">You&apos;re not just reacting — you&apos;re anticipating, learning, and leading.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href={"/contact_us"} className="group relative px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl font-bold text-xl hover:from-red-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-500/25">
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Get Started Free
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Included FREE with all CyberJall packages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-red-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-orange-400 animate-pulse" />
            <span className="text-2xl font-bold text-white">CyberJall Insights</span>
          </div>
          <p className="text-gray-400">
            Empowering businesses with premium cybersecurity intelligence — Free for all CyberJall clients.
          </p>
        </div>
      </footer>
    </div>
  );
}