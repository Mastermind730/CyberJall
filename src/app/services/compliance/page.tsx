/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Check,
  ArrowRight,
  Lock,
  Globe,
  Heart,
  ChevronDown,
  Star,
  Zap,
  Target,
  Eye,
  Award,
  Cpu,
  Database,
  TrendingUp,
  Users,
  Building,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ComplianceService {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  gradient: string;
  color: string;
  features: string[];
}

interface Industry {
  name: string;
  icon: React.ReactNode;
}

interface WhyChooseFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface VisibilityState {
  [key: string]: boolean;
}

interface RiskCard {
  title: string;
  items?: string[];
  desc?: string;
  color: string;
}

const CompliancePage = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeIndustry, setActiveIndustry] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<string>("iso27001");
  
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [isMounted]);

  // Auto-rotate industries
  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMounted]);

  const complianceServices: ComplianceService[] = [
    {
      id: "iso27001",
      title: "ISO 27001 Compliance",
      subtitle: "Secure. Certify. Scale with Confidence.",
      icon: <Shield className="w-10 h-10" />,
      description:
        "The international gold standard for managing information security with globally recognized certification.",
      benefits: [
        "Win enterprise deals faster",
        "Reduce data breach risks",
        "Boost operational efficiency",
        "Strengthen stakeholder trust",
      ],
      gradient: "from-red-600 via-red-500 to-orange-500",
      color: "red",
      features: [
        "Readiness Assessment",
        "ISMS Development",
        "Documentation Support",
        "Certification Support",
      ],
    },
    {
      id: "soc2",
      title: "SOC 2 Compliance",
      subtitle: "Prove You're Secure. Build Customer Trust.",
      icon: <Lock className="w-10 h-10" />,
      description:
        "AICPA framework for technology companies that store or process customer data.",
      benefits: [
        "Win enterprise clients",
        "Showcase operational maturity",
        "Mitigate business risks",
        "Create competitive edge",
      ],
      gradient: "from-orange-600 via-red-500 to-red-600",
      color: "orange",
      features: [
        "Type I & II Audits",
        "Control Framework",
        "Evidence Collection",
        "Auditor Coordination",
      ],
    },
    {
      id: "gdpr",
      title: "GDPR Compliance",
      subtitle: "Protect Privacy. Expand into Global Markets.",
      icon: <Globe className="w-10 h-10" />,
      description:
        "EU's comprehensive privacy law governing data collection and processing worldwide.",
      benefits: [
        "Avoid €20M+ fines",
        "Build user trust globally",
        "Enter EU markets safely",
        "Enhance brand credibility",
      ],
      gradient: "from-red-500 via-orange-500 to-red-600",
      color: "red",
      features: [
        "Data Mapping",
        "Privacy Policies",
        "Consent Management",
        "Breach Response",
      ],
    },
    {
      id: "hipaa",
      title: "HIPAA Compliance",
      subtitle: "Safeguard Health Data. Build Patient Trust.",
      icon: <Heart className="w-10 h-10" />,
      description:
        "U.S. federal law protecting sensitive patient health information in healthcare.",
      benefits: [
        "Avoid $1.5M+ penalties",
        "Earn healthcare trust",
        "Streamline B2B sales",
        "Reduce legal exposure",
      ],
      gradient: "from-orange-600 via-red-600 to-red-700",
      color: "orange",
      features: [
        "PHI Protection",
        "Risk Assessment",
        "Staff Training",
        "Audit Preparation",
      ],
    },
  ];

  const industries: Industry[] = [
    {
      name: "Fintech & Digital Banking",
      icon: <Database className="w-6 h-6" />,
    },
    { name: "E-commerce Platforms", icon: <Cpu className="w-6 h-6" /> },
    { name: "SaaS & Cloud Providers", icon: <Shield className="w-6 h-6" /> },
    { name: "Healthcare & MedTech", icon: <Heart className="w-6 h-6" /> },
    { name: "Insurance & Legal", icon: <Award className="w-6 h-6" /> },
    { name: "Manufacturing & IoT", icon: <Zap className="w-6 h-6" /> },
    { name: "Logistics & Supply Chain", icon: <Target className="w-6 h-6" /> },
    { name: "Government Contractors", icon: <Eye className="w-6 h-6" /> },
  ];

  const whyChooseFeatures: WhyChooseFeature[] = [
    {
      icon: <Check className="w-8 h-8" />,
      title: "Vetted Experts Only",
      desc: "Pre-screened certified professionals",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Customized Packages",
      desc: "Tailored to your specific needs",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Bundled Services",
      desc: "Compliance + Security testing",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Free Insights Access",
      desc: "Industry trends & updates",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Centralized Dashboard",
      desc: "Track everything in one place",
    },
  ];

  const riskCards: RiskCard[] = [
    {
      title: "The Stakes Are High",
      items: [
        "Hefty fines and legal consequences",
        "Damaged reputation and loss of customer trust",
        "Barriers to partnerships, funding, and expansion",
      ],
      color: "red",
    },
    {
      title: "The Opportunity",
      desc: "Achieving compliance demonstrates leadership. It shows you take security seriously, are prepared for audits, and are ready to compete on a global scale.",
      color: "orange",
    },
  ];

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, transparent 70%)",
          transform: `scale(${activeCard ? 2 : 1})`,
          transition: "transform 0.2s ease",
        }}
      />

      {/* Mega Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-orange-950/30"></div>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${
                30 + Math.sin(scrollY * 0.01) * 20
              }% ${
              40 + Math.cos(scrollY * 0.008) * 15
            }%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${
                70 + Math.cos(scrollY * 0.012) * 25
              }% ${
              60 + Math.sin(scrollY * 0.01) * 20
            }%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
              radial-gradient(circle at ${
                50 + Math.sin(scrollY * 0.015) * 30
              }% ${
              30 + Math.cos(scrollY * 0.01) * 25
            }%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background:
                i % 2 === 0
                  ? "rgba(239, 68, 68, 0.6)"
                  : "rgba(251, 146, 60, 0.4)",
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 10}px)`,
            }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        ref={addToRefs}
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h1
              className="text-8xl md:text-9xl font-black mb-8 leading-none"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              COMPLIANCE
            </h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Transform Regulatory Requirements into 
              <span className="text-orange-400 font-bold"> Competitive Advantages</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["ISO 27001", "SOC 2", "GDPR", "HIPAA"].map((cert, index) => (
                <div
                  key={cert}
                  className="px-6 py-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-full backdrop-blur-lg transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* <button
            className="group px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-xl font-bold transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50"
            onMouseEnter={() => setActiveCard("cta")}
            onMouseLeave={() => setActiveCard(null)}
          >
            Start Your Compliance Journey
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button> */}
        </div>
      </section>

      {/* Why Compliance Matters */}
      <section
        id="why-compliance"
        ref={addToRefs}
        className="relative z-10 py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible["why-compliance"]
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2
              className="text-6xl md:text-7xl font-black mb-8"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Compliance Matters
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Compliance is more than a checkbox — it&apos;s the{" "}
              <span className="text-orange-400 font-semibold">
                foundation of trust, resilience, and business growth.
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {riskCards.map((card, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-3xl border backdrop-blur-lg transition-all duration-700 hover:scale-105 ${
                    card.color === "red"
                      ? "bg-gradient-to-br from-red-900/40 to-red-800/30 border-red-500/30 hover:border-red-400/60"
                      : "bg-gradient-to-br from-orange-900/40 to-orange-800/30 border-orange-500/30 hover:border-orange-400/60"
                  } ${
                    isVisible["why-compliance"]
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-20 opacity-0"
                  }`}
                  style={{
                    animationDelay: `${0.2 + index * 0.2}s`,
                    boxShadow:
                      card.color === "red"
                        ? "0 20px 60px rgba(239, 68, 68, 0.1)"
                        : "0 20px 60px rgba(251, 146, 60, 0.1)",
                  }}
                >
                  <h3
                    className={`text-3xl font-bold mb-6 ${
                      card.color === "red" ? "text-red-400" : "text-orange-400"
                    }`}
                  >
                    {card.title}
                  </h3>
                  {card.items ? (
                    <ul className="space-y-4 text-gray-300">
                      {card.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-4 group-hover:translate-x-2 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 0.1}s` }}
                        >
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              card.color === "red"
                                ? "bg-red-500"
                                : "bg-orange-500"
                            } animate-pulse`}
                          ></div>
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {card.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div
              className={`relative transition-all duration-1000 ${
                isVisible["why-compliance"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="relative w-full h-[600px] rounded-3xl bg-gradient-to-br from-red-600/20 via-orange-600/20 to-red-600/20 border border-red-500/40 backdrop-blur-lg overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-32 h-32 text-orange-400 mx-auto mb-8 animate-bounce" />
                  <h3 className="text-4xl font-bold text-white mb-4">Business Growth</h3>
                  <p className="text-xl text-gray-300 max-w-md">
                    Compliance drives revenue, reduces risk, and opens new market opportunities
                  </p>
                </div>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Services Cards */}
      <section
        id="services"
        ref={addToRefs}
        className="relative z-10 py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-6xl md:text-7xl font-black mb-8"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {complianceServices.map((service, index) => (
              <div
                key={service.id}
                className={`group relative p-8 rounded-3xl border backdrop-blur-lg transition-all duration-700 hover:scale-105 cursor-pointer ${
                  selectedService === service.id
                    ? "bg-gradient-to-br from-red-900/60 to-orange-900/60 border-red-400/80 scale-105"
                    : "bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 hover:border-red-400/60"
                } ${
                  isVisible["services"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: selectedService === service.id 
                    ? "0 25px 80px rgba(239, 68, 68, 0.3)"
                    : "0 20px 60px rgba(239, 68, 68, 0.1)",
                }}
                onClick={() => setSelectedService(service.id)}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient}/20`}>
                    {service.icon}
                  </div>
                  {selectedService === service.id && (
                    <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-orange-400 font-medium mb-4">
                  {service.subtitle}
                </p>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div
                      key={benefitIndex}
                      className="flex items-center gap-3 text-sm text-gray-300 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${benefitIndex * 0.1}s` }}
                    >
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-red-600/20 text-red-300 text-xs rounded-full border border-red-500/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section
        id="industries"
        ref={addToRefs}
        className="relative z-10 py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-6xl md:text-7xl font-black mb-8"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Industries We Serve
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Specialized compliance solutions for every sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl border backdrop-blur-lg transition-all duration-500 cursor-pointer ${
                  activeIndustry === index
                    ? "bg-gradient-to-br from-orange-900/60 to-red-900/60 border-orange-400/80 scale-110"
                    : "bg-gradient-to-br from-gray-900/40 to-gray-800/40 border-gray-600/30 hover:border-orange-400/60 hover:scale-105"
                } ${
                  isVisible["industries"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: activeIndustry === index 
                    ? "0 25px 80px rgba(251, 146, 60, 0.3)"
                    : "0 10px 40px rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => setActiveIndustry(index)}
                onMouseEnter={() => setActiveIndustry(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    activeIndustry === index 
                      ? "bg-orange-500/20 text-orange-400" 
                      : "bg-gray-700/50 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-orange-400"
                  } transition-all duration-300`}>
                    {industry.icon}
                  </div>
                  <h3 className={`font-bold ${
                    activeIndustry === index 
                      ? "text-white" 
                      : "text-gray-300 group-hover:text-white"
                  } transition-colors duration-300`}>
                    {industry.name}
                  </h3>
                </div>
                
                {activeIndustry === index && (
                  <div className="mt-4 flex items-center gap-2 text-orange-400">
                    <Building className="w-4 h-4" />
                    <span className="text-sm font-medium">Active Sector</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-choose"
        ref={addToRefs}
        className="relative z-10 py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-6xl md:text-7xl font-black mb-8"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group text-center p-8 rounded-3xl border backdrop-blur-lg transition-all duration-700 hover:scale-110 ${
                  isVisible["why-choose"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                } bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 hover:border-red-400/60 hover:bg-gradient-to-br hover:from-red-900/40 hover:to-orange-900/40`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: "0 20px 60px rgba(239, 68, 68, 0.1)",
                }}
                onMouseEnter={() => setActiveCard(`feature-${index}`)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600/20 to-orange-600/20 group-hover:from-red-600/40 group-hover:to-orange-600/40 transition-all duration-300">
                    <div className="text-red-400 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {feature.desc}
                </p>
                
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-orange-400 animate-bounce" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={addToRefs} className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible["cta"]
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2
              className="text-6xl md:text-7xl font-black mb-8"
              style={{
                background: "linear-gradient(45deg, #ef4444, #f97316, #dc2626)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Transform?
            </h2>
            
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of companies who&apos;ve turned compliance from a burden into a 
              <span className="text-orange-400 font-bold"> business advantage</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
              href={"/contact_us"}
                className="group px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-xl font-bold transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50"
                onMouseEnter={() => setActiveCard("primary-cta")}
                onMouseLeave={() => setActiveCard(null)}
              >
                Get Started Today
                <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
              href={"/contact_us"}
                className="group px-12 py-6 border-2 border-orange-500 text-orange-400 rounded-full text-xl font-bold hover:bg-orange-500 hover:text-black transition-all duration-300"
                onMouseEnter={() => setActiveCard("secondary-cta")}
                onMouseLeave={() => setActiveCard(null)}
              >
                Schedule Consultation
                <Users className="inline-block ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-orange-400 mb-2">500+</div>
                <div className="text-gray-400">Companies Certified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-red-400 mb-2">99.7%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-orange-400 mb-2">24/7</div>
                <div className="text-gray-400">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements around CTA */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {i % 4 === 0 && <Shield className="w-8 h-8 text-red-400/30" />}
              {i % 4 === 1 && <Lock className="w-8 h-8 text-orange-400/30" />}
              {i % 4 === 2 && <Globe className="w-8 h-8 text-red-400/30" />}
              {i % 4 === 3 && <Heart className="w-8 h-8 text-orange-400/30" />}
            </div>
          ))}
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompliancePage;