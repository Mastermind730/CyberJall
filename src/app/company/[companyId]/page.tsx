"use client";
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Shield, Award, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';

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

interface ServiceObject {
  name: string;
  description: string;
  image?: string; 
}

interface ExpertiseObject {
  type: string;
  name: string;
}

interface CaseStudySimple {
  title: string;
  description: string;
  results?: string;
}

interface CaseStudyDetailed {
  title: string;
  client?: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

// Define Company interface with flexible types
interface Company {
  id: string;
  company_name: string;
  overview: string;
  logo?: string;
  website?: string;
  year_founded?: number;
  headquarters_city?: string;
  headquarters_country?: string;
  services_offered: Array<string | ServiceObject>;
  expertise_and_certifications?: Array<string | ExpertiseObject>;
  case_studies?: Array<CaseStudySimple | CaseStudyDetailed>;
  client_reviews?: Array<{
    clientName: string;
    position: string;
    company: string;
    review: string;
    rating: number;
  }>;
  social_links?: Array<{
    platform: string;
    url: string;
  }>;
}

// Helper type for display
interface FormattedService {
  title: string;
  description: string;
  image?: string;
}

interface FormattedExpertise {
  name: string;
}

interface FormattedCaseStudy {
  title: string;
  client?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  description?: string; // For backward compatibility
}

// For Next.js App Router
type Params = { companyId: string }

export default function CompanyDetails(props: { params: Promise<Params> }) {
  const [mounted, setMounted] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  
  const params = use(props.params);
  const companyId = params.companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Company>(`/api/company/${companyId}`);
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
  
  // Process services data to handle both formats
const formattedServices: FormattedService[] = company.services_offered.map(service => {
  if (typeof service === 'string') {
    return {
      title: service,
      description: `Specialized ${service} solutions tailored to meet your business requirements.`,
      image: undefined // No image for string format
    };
  } else {
    return {
      title: service.name,
      description: service.description || `Specialized service tailored to meet your business requirements.`,
      image: service.image // Include the image from the object
    };
  }
});
  
  // Process expertise data to handle both formats
  const formattedExpertise: FormattedExpertise[] = company.expertise_and_certifications?.map(expertise => {
    if (typeof expertise === 'string') {
      return { name: expertise };
    } else {
      return { name: expertise.name };
    }
  }) || [];
  
  // Process case studies to handle both formats
  const formattedCaseStudies: FormattedCaseStudy[] = company.case_studies?.map(study => {
    // Handle both simple and detailed formats
    if ('description' in study) {
      return {
        title: study.title,
        client:  '',
        description: study.description,
        ...(study.results && { result: study.results })
      };
    } else {
      return {
        title: study.title,
        client: study.client || 'Client',
        challenge: study.challenge,
        solution: study.solution,
        result: study.result
      };
    }
  }) || [];
  
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
                <Image width={256} height={256} src={company.logo} alt={company.company_name} className="w-full h-full object-contain" />
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

      <AnimatedSection title="Company Details" icon={MapPin} delay={0.9}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <motion.div
      className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center mb-3">
        <Calendar className="text-red-500 mr-3" size={20} />
        <h3 className="text-lg font-semibold">Year Founded</h3>
      </div>
      <p className="text-gray-300 pl-9">2015</p>
    </motion.div>

    <motion.div
      className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-3">
        <MapPin className="text-red-500 mr-3" size={20} />
        <h3 className="text-lg font-semibold">Headquarters</h3>
      </div>
      <p className="text-gray-300 pl-9">San Francisco, United States</p>
    </motion.div>
  </div>
</AnimatedSection>

{/* Social Links Section */}
<AnimatedSection title="Connect With Us" icon={Users} delay={1.3}>
  <div className="flex flex-wrap gap-4 mt-6">
    {company.social_links?.map((social, index) => (
      <motion.a
        key={index}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-lg transition-colors"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 * index }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-red-900 rounded-full">
          {social.platform === 'linkedin' && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          )}
          {social.platform === 'twitter' && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          )}
          {social.platform === 'facebook' && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          )}
          {social.platform === 'instagram' && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          )}
        </div>
        <span className="capitalize">{social.platform}</span>
      </motion.a>
    ))}
  </div>
</AnimatedSection>




        {/* Services Section */}
{formattedServices.length > 0 && (
  <AnimatedSection title="Services Offered" icon={Shield} delay={0.3}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {formattedServices.map((service, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg p-6 border border-zinc-700 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {/* Service Image */}
          {service.image && (
            <div className="relative h-40 mb-4 rounded-md overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-3 text-red-500">{service.title}</h3>
          <p className="text-gray-300">{service.description}</p>
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
)}
        
        {/* Expertise Section */}
        {formattedExpertise.length > 0 && (
          <AnimatedSection title="Expertise & Certifications" icon={Award} delay={0.5}>
            <div className="flex flex-wrap gap-4 mt-6">
              {formattedExpertise.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-800 rounded-full px-4 py-2 flex items-center text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  whileHover={{ scale: 1.05, backgroundColor: '#7f1d1d' }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 mr-2"></div>
                  {item.name}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
        
       {/* Case Studies Section */}
{formattedCaseStudies.length > 0 && (
  <AnimatedSection title="Case Studies" icon={FileText} delay={0.7}>
    <div className="mt-8 space-y-8">
      {formattedCaseStudies.map((study, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ y: -5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-red-900" />
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIGNsYXNzPSJ0ZXh0LXJlZC-500LzMwIi8+PC9zdmc+')]" />
          
          <div className="relative z-10 p-8">
            {/* Header with client info */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                {study.client && (
                  <p className="text-gray-400 mt-1">{study.client}</p>
                )}
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                <span className="text-white font-bold">
                  {study.client?.split(' ').map(w => w[0]).join('').substring(0, 2) || 'CS'}
                </span>
              </div>
            </div>

            {/* For simple format with description */}
            {study.description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{study.description}</p>
              </div>
            )}

            {/* For detailed format */}
            {!study.description && (
              <div className="space-y-6">
                {study.challenge && (
                  <div className="bg-zinc-800/50 rounded-lg p-5 border-l-4 border-red-600">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      The Challenge
                    </h4>
                    <p className="text-gray-300">{study.challenge}</p>
                  </div>
                )}

                {study.solution && (
                  <div className="bg-zinc-800/50 rounded-lg p-5 border-l-4 border-blue-500">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-400 mb-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Our Solution
                    </h4>
                    <p className="text-gray-300">{study.solution}</p>
                  </div>
                )}

                {(study.result ) && (
                  <div className="bg-zinc-800/50 rounded-lg p-5 border-l-4 border-green-500">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      The Results
                    </h4>
                    <p className="text-gray-300">{study.result }</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">
                        Security Improved
                      </span>
                      <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">
                        Compliance Achieved
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
)}
        {/* Client Reviews Section */}
<AnimatedSection title="Client Testimonials" icon={Users} delay={1.1}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    {company.client_reviews?.map((review, index) => (
      <motion.div
        key={index}
        className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{review.clientName}</h3>
            <p className="text-gray-400 text-sm">{review.position}, {review.company}</p>
          </div>
          <div className="flex items-center bg-red-900 bg-opacity-30 px-2 py-1 rounded">
            <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
            <span>{review.rating}/5</span>
          </div>
        </div>
        <p className="text-gray-300 italic">{review.review}</p>
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