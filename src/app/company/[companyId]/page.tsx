// pages/company/[id].js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Shield, Award, FileText, Star, ChevronDown, ChevronUp } from 'lucide-react';

// This would typically come from an API or database
// Example data for a single company
const companyData = {
  id: 1,
  name: "CyberShield Security Solutions",
  logo: "/company-logos/cybershield.svg", 
  overview: "CyberShield Security Solutions is a leading cybersecurity firm established in 2010, dedicated to protecting organizations from evolving digital threats. With over 200 security professionals worldwide, we've helped more than 500 enterprises safeguard their critical assets and maintain business continuity in the face of sophisticated cyber attacks.",
  services: [
    {
      title: "Penetration Testing",
      description: "Our team of ethical hackers simulates real-world cyber attacks to identify vulnerabilities in your systems before malicious actors can exploit them."
    },
    {
      title: "Threat Intelligence",
      description: "Stay ahead of emerging threats with our advanced threat intelligence services that provide actionable insights on potential risks to your organization."
    },
    {
      title: "Incident Response",
      description: "When security incidents occur, our rapid response team works 24/7 to contain breaches, minimize damage, and restore normal operations."
    },
    {
      title: "Compliance Consulting",
      description: "Navigate complex regulatory requirements with our dedicated compliance experts specializing in GDPR, HIPAA, PCI DSS, and more."
    },
    {
      title: "Security Architecture",
      description: "Design robust security frameworks tailored to your organization's unique needs, ensuring comprehensive protection across your digital infrastructure."
    }
  ],
  expertise: [
    "ISO 27001 Certified Organization",
    "CISSP, CEH, and CISM Certified Professionals",
    "Microsoft Gold Security Partner",
    "AWS Security Competency Partner",
    "Google Cloud Security Partner",
    "Member of Global Cyber Alliance",
    "Recognized in Gartner Magic Quadrant for Managed Security Services"
  ],
  caseStudies: [
    {
      title: "Financial Services Security Transformation",
      client: "Major European Bank",
      description: "Implemented a comprehensive security overhaul that reduced security incidents by 73% and achieved regulatory compliance across 27 countries."
    },
    {
      title: "Healthcare Data Protection Program",
      client: "Regional Healthcare Network",
      description: "Designed and deployed a multi-layered security framework protecting sensitive patient data for a network serving over 2 million patients annually."
    },
    {
      title: "Retail Breach Response and Recovery",
      client: "International Retail Chain",
      description: "Successfully contained and remediated a sophisticated cyber attack, restoring operations within 24 hours and preventing data exfiltration."
    }
  ],
  testimonials: [
    {
      quote: "CyberShield's expertise transformed our security posture. Their team's dedication and technical knowledge have made them an invaluable partner in our digital transformation journey.",
      author: "Sarah Chen",
      position: "CIO, Global Financial Services Corporation"
    },
    {
      quote: "When we experienced a potentially devastating cyber attack, CyberShield's incident response team was there within hours. Their swift action saved us millions in potential damages and kept our reputation intact.",
      author: "Michael Rodriguez",
      position: "CISO, Healthcare Technologies Inc."
    }
  ],
  website: "https://www.cybershield-security.com"
};

// SVG placeholder for company logo
const LogoPlaceholder = ({ name }) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7b1e1e" />
          <stop offset="100%" stopColor="#3d0e0e" />
        </linearGradient>
        <pattern id="logo-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2" fill="rgba(0,0,0,0.3)" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#logo-gradient)" />
      <rect width="100" height="100" fill="url(#logo-pattern)" />
      <circle cx="50" cy="35" r="15" fill="#333" />
      <rect x="35" y="50" width="30" height="20" fill="#333" />
      <path d="M35,50 L50,35 L65,50 Z" fill="#333" />
      <text x="50" y="42" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">CS</text>
    </svg>
  );
};

// Animated section component for reuse
const AnimatedSection = ({ title, icon, children, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const IconComponent = icon;
  
  return (
    <motion.div
      className="mb-12 bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="bg-red-900 p-2 rounded-lg mr-4">
            <IconComponent className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        </div>
        <button className="text-gray-400 hover:text-white">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function CompanyDetails() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-gray-100">
    
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/ourPartners" className="flex items-center text-red-700 hover:text-red-500 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Companies</span>
          </Link>
          
          <a 
            href={companyData.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-red-900 hover:bg-red-800 px-4 py-2 rounded-full transition-colors"
          >
            <Globe size={18} className="mr-2" />
            <span>Visit Website</span>
          </a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="relative py-24 overflow-hidden">
        {/* Background animated pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(139, 0, 0, 0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Logo */}
            <motion.div 
              className="w-40 h-40 md:w-64 md:h-64 mb-8 md:mb-0 md:mr-10 bg-gradient-to-br from-zinc-800 to-black p-4 rounded-2xl shadow-2xl border border-zinc-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <LogoPlaceholder name={companyData.name} />
            </motion.div>
            
            {/* Company Name and Overview */}
            <div className="md:flex-1">
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold mb-6 text-center md:text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {companyData.name}
              </motion.h1>
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-300 md:max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {companyData.overview}
              </motion.p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Services Section */}
        <AnimatedSection title="Services Offered" icon={Shield} delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {companyData.services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg p-6 border border-zinc-700 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-3 text-red-500">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Expertise Section */}
        <AnimatedSection title="Expertise & Certifications" icon={Award} delay={0.5}>
          <div className="flex flex-wrap gap-4 mt-6">
            {companyData.expertise.map((item, index) => (
              <motion.div
                key={index}
                className="bg-zinc-800 rounded-full px-4 py-2 flex items-center text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                whileHover={{ scale: 1.05, backgroundColor: '#7f1d1d' }}
              >
                <div className="w-2 h-2 rounded-full bg-red-600 mr-2"></div>
                {item}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Case Studies Section */}
        <AnimatedSection title="Case Studies" icon={FileText} delay={0.7}>
          <div className="mt-6 space-y-6">
            {companyData.caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg p-6 border-l-4 border-red-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{study.title}</h3>
                  <span className="text-sm font-medium bg-red-900 bg-opacity-30 text-red-400 px-3 py-1 rounded-full">
                    {study.client}
                  </span>
                </div>
                <p className="text-gray-300">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Testimonials Section */}
        <AnimatedSection title="Testimonials" icon={Star} delay={0.9}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-black bg-opacity-40 rounded-lg p-6 border border-zinc-800 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(139, 0, 0, 0.5)" }}
              >
                {/* Quote marks */}
                <div className="absolute top-4 left-4 text-6xl text-red-900 opacity-20">"</div>
                
                <div className="relative z-10">
                  <p className="italic text-gray-300 mb-6">{testimonial.quote}</p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
                      <span className="font-bold text-white">
                        {testimonial.author.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </main>
      
      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Ready to secure your business?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Contact our team of experts to discuss your cybersecurity needs and how we can help protect your organization.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a 
              href="#contact" 
              className="bg-white text-red-900 hover:bg-gray-200 font-bold px-8 py-4 rounded-full inline-flex items-center shadow-lg transition-colors"
            >
              <Shield size={20} className="mr-2" />
              Get Protected Now
            </a>
          </motion.div>
        </div>
      </section>
      
     
    </div>
  );
}