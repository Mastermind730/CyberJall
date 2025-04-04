"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Shield, Award, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { PageProps } from 'next/types';

// SVG placeholder for company logo
const LogoPlaceholder = ({ name }: { name: string }) => {
  // Get initials from company name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2);

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
      <text x="50" y="42" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">{initials}</text>
    </svg>
  );
};

// Type for AnimatedSection props
interface AnimatedSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  children: React.ReactNode;
  delay?: number;
}

// Animated section component for reuse
const AnimatedSection = ({ title, icon, children, delay = 0 }: AnimatedSectionProps) => {
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

// Define Company interface
interface Company {
  company_name: string;
  overview: string;
  logo?: string;
  website?: string;
  services_offered?: string[];
  expertise_and_certifications?: string[];
  case_studies?: {
    title: string;
    description: string;
    results?: string;
  }[];
}

// For Next.js App Router, params should be properly typed
interface CompanyPageParams {
  companyId: string;
}

export default function CompanyDetails({ params }: PageProps<CompanyPageParams>) {
  const [mounted, setMounted] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  
  const companyId = params.companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/company/${companyId}`);
        setCompany(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to load company data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
    setMounted(true);
  }, [companyId]);

  if (!mounted) return null;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading company profile...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-gray-100 flex items-center justify-center">
        <div className="text-center max-w-lg p-6 bg-zinc-800 rounded-lg">
          <p className="text-xl text-red-500 mb-4">Error</p>
          <p>{error}</p>
          <Link href="/ourPartners" className="mt-6 inline-block bg-red-900 hover:bg-red-800 px-4 py-2 rounded-full transition-colors">
            Return to Companies
          </Link>
        </div>
      </div>
    );
  }
  
  if (!company) return null;
  
  // Define Service interface
  interface Service {
    title: string;
    description: string;
  }
  
  // Define CaseStudy interface
  interface CaseStudy {
    title: string;
    client: string;
    description: string;
  }
  
  // Transform services array if needed
  const services: Service[] = Array.isArray(company.services_offered) 
    ? company.services_offered.map(service => ({
        title: service,
        description: `Professional ${service} services tailored to your business needs.`
      }))
    : [];
  
  // Format case studies if needed
  const caseStudies: CaseStudy[] = Array.isArray(company.case_studies) 
    ? company.case_studies.map(study => ({
        title: study.title,
        client: "Client",
        description: study.description + (study.results ? ` Results: ${study.results}` : "")
      }))
    : [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/ourPartners" className="flex items-center text-red-700 hover:text-red-500 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Companies</span>
          </Link>
          
          {company.website && (
            <Link
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center bg-red-900 hover:bg-red-800 px-4 py-2 rounded-full transition-colors"
            >
              <Globe size={18} className="mr-2" />
              <span>Visit Website</span>
            </Link>
          )}
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
              {company.logo ? (
                <img src={company.logo} alt={company.company_name} className="w-full h-full object-contain" />
              ) : (
                <LogoPlaceholder name={company.company_name} />
              )}
            </motion.div>
            
            {/* Company Name and Overview */}
            <div className="md:flex-1">
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold mb-6 text-center md:text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {company.company_name}
              </motion.h1>
              
              <motion.p 
                className="text-lg leading-relaxed text-gray-300 md:max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {company.overview}
              </motion.p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Services Section */}
        {services.length > 0 && (
          <AnimatedSection title="Services Offered" icon={Shield} delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {services.map((service, index) => (
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
        )}
        
        {/* Expertise Section */}
        {company.expertise_and_certifications && company.expertise_and_certifications.length > 0 && (
          <AnimatedSection title="Expertise & Certifications" icon={Award} delay={0.5}>
            <div className="flex flex-wrap gap-4 mt-6">
              {company.expertise_and_certifications.map((item, index) => (
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
        )}
        
        {/* Case Studies Section */}
        {caseStudies.length > 0 && (
          <AnimatedSection title="Case Studies" icon={FileText} delay={0.7}>
            <div className="mt-6 space-y-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg p-6 border-l-4 border-red-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{study.title}</h3>
                    {study.client && (
                      <span className="text-sm font-medium bg-red-900 bg-opacity-30 text-red-400 px-3 py-1 rounded-full">
                        {study.client}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300">{study.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
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
            Ready to work with {company.company_name}?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Contact their team of experts to discuss how they can help transform your business.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href={company.website || "#contact"} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-900 hover:bg-gray-200 font-bold px-8 py-4 rounded-full inline-flex items-center shadow-lg transition-colors"
            >
              <Shield size={20} className="mr-2" />
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}