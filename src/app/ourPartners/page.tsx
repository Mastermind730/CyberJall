"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiSearch, 
  FiChevronDown, 
  FiX, 
  FiMapPin, 
  FiEye,
  FiExternalLink,
  FiFrown,
} from 'react-icons/fi';

interface Partner {
  id: string;
  company_name: string;
  logo?: string | null;
  website: string;
  year_founded: number;
  headquarters_city: string;
  headquarters_country: string;
  industries_served: string[];
  team_size: string;
  services_offered?: any;
  expertise_and_certifications?: any;
}

interface ExperienceOption {
  label: string;
  value: string;
}

interface Filters {
  industry: string;
  service: string;
  certification: string;
  location: string;
  teamSize: string;
  minExperience: string;
}

// Constants defined outside the component
const industryOptions = [
  "Fintech", "Healthcare", "E-commerce", "Government", 
  "Education", "Manufacturing", "Retail", "Telecom"
];

const serviceOptions = [
  "VAPT", "Compliance", "Cloud Security", "Network Security",
  "Application Security", "Incident Response", "Risk Assessment",
  "Security Training", "Penetration Testing", "Threat Intelligence"
];

const certificationOptions = [
  "ISO 27001", "SOC 2", "GDPR", "PCI DSS",
  "HIPAA", "NIST", "CIS", "CREST", "OSCP"
];

const teamSizeOptions = [
  "Solo", "2-10", "11-50", "51-200", "201-500", "500+"
];

const experienceOptions: ExperienceOption[] = [
  { label: "1+ years", value: "1" },
  { label: "3+ years", value: "3" },
  { label: "5+ years", value: "5" },
  { label: "10+ years", value: "10" }
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    industry: "",
    service: "",
    certification: "",
    location: "",
    teamSize: "",
    minExperience: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        
        if (filters.industry) params.append('industry', filters.industry);
        if (filters.service) params.append('service', filters.service);
        if (filters.certification) params.append('certification', filters.certification);
        if (filters.location) params.append('location', filters.location);
        if (filters.teamSize) params.append('teamSize', filters.teamSize);
        if (filters.minExperience) params.append('minExperience', filters.minExperience);
        if (searchQuery) params.append('search', searchQuery);
        
        const response = await fetch(`/api/company?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch partners');
        }
        
        const data = await response.json();
        setPartners(data);
        
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError(err instanceof Error ? err.message : "Failed to load partners");
        setPartners([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPartners();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, searchQuery]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleFilterChange = (filterName: keyof Filters, value: string): void => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value === prev[filterName] ? "" : value
    }));
  };

  const clearFilters = (): void => {
    setFilters({
      industry: "",
      service: "",
      certification: "",
      location: "",
      teamSize: "",
      minExperience: ""
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-red-900/20 to-transparent"></div>
        <div className="absolute left-0 h-full w-1/3 bg-gradient-to-r from-orange-800/10 to-transparent"></div>
        <div className="absolute right-0 h-full w-1/3 bg-gradient-to-l from-red-900/10 to-transparent"></div>
      </div>

      {mounted && (
        <div className="fixed inset-0 z-0 overflow-hidden opacity-40">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 5% 15%, #7f1d1d33 1%, transparent 8%), radial-gradient(circle at 85% 45%, #9a3412aa 0.5%, transparent 5%), radial-gradient(circle at 35% 75%, #7f1d1d33 1%, transparent 8%), radial-gradient(circle at 65% 85%, #9a341222 0.5%, transparent 5%)" }}></div>
          
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute rounded-full bg-gradient-to-br ${
                  i % 2 === 0 ? "from-red-600/30 to-red-800/10" : "from-orange-500/20 to-orange-700/10"
                }`}
                style={{
                  width: `${Math.floor(Math.random() * 10) + 3}px`,
                  height: `${Math.floor(Math.random() * 10) + 3}px`,
                  left: `${Math.floor(Math.random() * 100)}%`,
                  top: `${Math.floor(Math.random() * 100)}%`,
                }}
                animate={{
                  y: [0, Math.random() * 50 - 25],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: Math.floor(Math.random() * 15) + 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
     {/* Header Section */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-center mb-12 mt-20"
>
  <motion.div 
    className="max-w-4xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    {/* Tagline */}
    <motion.p
      className="text-lg font-medium text-red-400 mb-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      Your Cybersecurity Starts with the Right Partner
    </motion.p>
    
    {/* Main Title */}
    <motion.h1 
      className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        Trusted Cybersecurity
      </span> Partners
    </motion.h1>
    
    {/* Description */}
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <p className="text-xl text-gray-300 mb-6 leading-relaxed">
        Discover trusted cybersecurity companies ready to help secure your business. 
        Whether you're a startup or an enterprise, use filters to find providers by 
        service type, experience, certifications, and industry focus—all in one place.
      </p>
      <p className="text-lg text-gray-400 font-medium">
        CyberJall brings you transparency, flexibility, and the power to collaborate 
        with multiple experts in a single solution.
      </p>
    </motion.div>

    {/* Decorative divider */}
    <motion.div 
      className="mt-8 flex justify-center"
      initial={{ width: 0 }}
      animate={{ width: "auto" }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <motion.div 
        className="h-1 w-48 bg-gradient-to-r from-red-700 via-orange-500 to-red-600 rounded-full"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "linear" 
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
    </motion.div>
  </motion.div>
</motion.div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search partners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg text-white shadow-lg transition-all"
            >
              <span>Advanced Filters</span>
              <div className="relative">
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <FiChevronDown className="w-5 h-5 transition-transform" />
              </div>
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Industry Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Industry</h3>
                    <div className="flex flex-wrap gap-2">
                      {industryOptions.map((industry) => (
                        <motion.button
                          key={`industry-${industry}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('industry', industry)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            filters.industry === industry
                              ? 'bg-red-500/20 border-red-500 text-white'
                              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {industry}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Service Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Service</h3>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <motion.button
                          key={`service-${service}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('service', service)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            filters.service === service
                              ? 'bg-orange-500/20 border-orange-500 text-white'
                              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {service}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Certification Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Certification</h3>
                    <div className="flex flex-wrap gap-2">
                      {certificationOptions.map((cert) => (
                        <motion.button
                          key={`cert-${cert}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('certification', cert)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            filters.certification === cert
                              ? 'bg-amber-500/20 border-amber-500 text-white'
                              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {cert}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Location</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="City or Country"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Team Size Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Team Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {teamSizeOptions.map((size) => (
                        <motion.button
                          key={`size-${size}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('teamSize', size)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            filters.teamSize === size
                              ? 'bg-purple-500/20 border-purple-500 text-white'
                              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Min. Experience</h3>
                    <div className="flex flex-wrap gap-2">
                      {experienceOptions.map((exp) => (
                        <motion.button
                          key={`exp-${exp.value}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('minExperience', exp.value)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            filters.minExperience === exp.value
                              ? 'bg-blue-500/20 border-blue-500 text-white'
                              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {exp.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="px-6 pb-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 transition-all"
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters Display */}
        {Object.values(filters).some(v => v !== "") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                
                let displayValue = value;
                if (key === 'minExperience') {
                  displayValue = experienceOptions.find(e => e.value === value)?.label || `${value}+ years`;
                }
                
                return (
                  <motion.div
                    key={`filter-${key}-${value}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700"
                  >
                    <span className="text-xs font-medium text-gray-300 capitalize">{key}:</span>
                    <span className="text-sm font-medium text-white">{displayValue}</span>
                    <button
                      onClick={() => handleFilterChange(key as keyof Filters, '')}
                      className="text-gray-400 hover:text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 text-gray-400"
          >
            Showing {partners.length} {partners.length === 1 ? 'partner' : 'partners'}
          </motion.div>
        )}

        {/* Partners Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-orange-500 border-b-red-700 border-l-orange-600"></div>
              <div className="absolute inset-2 rounded-full border-4 border-t-orange-500 border-r-red-700 border-b-orange-600 border-l-red-600"></div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-red-500 p-8 bg-gradient-to-br from-red-900/30 to-black rounded-xl border border-red-800/50 shadow-lg shadow-red-900/20"
          >
            <p>{error}</p>
          </motion.div>
        ) : partners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12"
          >
            <div className="text-gray-400 mb-4">
              <FiFrown className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No partners found</h3>
            <p className="text-gray-400 max-w-md mx-auto">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearFilters}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg shadow-lg"
              >
                Clear all filters
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onHoverStart={() => setHoveredCard(partner.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Ambient glow effect */}
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-500/60 via-orange-400/60 to-amber-500/60 rounded-2xl opacity-0 group-hover:opacity-80 transition-all duration-500 ease-out"
                  style={{
                    filter: "blur(18px)",
                    transform: "translateZ(0)",
                  }}
                />
                
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800/50 group-hover:border-red-500/70 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/20"
                >
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none" />
                  
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                  
                  {/* Card content container */}
                  <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div>
                      {/* Company logo area */}
                      <div className="flex justify-center mb-6 h-36 items-center relative">
                        {partner.logo && partner.logo !== "" ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                          >
                            <Image
                              width={250}
                              height={250}
                              src={partner.logo}
                              alt={`${partner.company_name} logo`}
                              className="max-h-28 max-w-full object-contain filter drop-shadow-lg"
                            />
                            
                            {/* Enhanced logo glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-amber-500/20 filter blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 -z-10 scale-110" />
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ rotate: [0, -3, 3, -3, 0] }}
                            transition={{ duration: 0.5 }}
                            className="w-28 h-28 rounded-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl relative z-10 border border-red-400/20"
                          >
                            {getInitials(partner.company_name)}
                            
                            {/* Multiple animated rings */}
                            <motion.div
                              className="absolute inset-0 rounded-full border border-red-400/40"
                              animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.7, 0.2, 0.7],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full border border-orange-400/30"
                              animate={{
                                scale: [1, 1.25, 1],
                                opacity: [0.5, 0.1, 0.5],
                              }}
                              transition={{
                                duration: 3,
                                delay: 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Company name */}
                      <motion.h3 className="text-2xl font-bold text-center mt-2 mb-1">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-red-200 group-hover:via-white group-hover:to-amber-100 transition-all duration-500">
                          {partner.company_name}
                        </span>
                        <div className="relative h-0.5 w-16 mx-auto mt-2 overflow-hidden">
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredCard === partner.id ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </motion.h3>

                      {/* Additional Info */}
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {partner.headquarters_city && (
                          <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full flex items-center">
                            <FiMapPin className="w-3 h-3 mr-1" />
                            {partner.headquarters_city}
                          </span>
                        )}
                        {partner.team_size && (
                          <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                            👥 {partner.team_size}
                          </span>
                        )}
                        {partner.year_founded && (
                          <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full">
                            🎂 {new Date().getFullYear() - partner.year_founded} years
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group/btn"
                      >
                        <Link
                          href={`/company/${partner.id}`}
                          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-br from-red-700 to-red-600 rounded-lg transition-all duration-300 shadow-md group-hover/btn:shadow-lg group-hover/btn:shadow-red-500/25 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                          
                          <span className="relative z-20 flex items-center">
                            View Details
                            <FiEye className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Link>
                      </motion.div>
                      
                      {partner.website && partner.website !== '' && (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group/btn"
                        >
                          <Link
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-br from-orange-600 to-red-600 rounded-lg transition-all duration-300 shadow-md group-hover/btn:shadow-lg group-hover/btn:shadow-orange-500/25 relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                            
                            <span className="relative z-20 flex items-center">
                              Visit Website
                              <FiExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      {mounted && (
        <div className="fixed bottom-0 left-0 w-1/3 h-1/3 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <defs>
              <linearGradient id="orangeGradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#orangeGradient)"
              d="M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z"
              animate={{
                d: [
                  "M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z",
                  "M38.5,-65.8C49.8,-59.9,58.5,-48.5,65.4,-35.9C72.3,-23.3,77.5,-9.5,77.2,4.2C76.9,17.9,71.1,31.4,62.7,43.2C54.3,55,43.3,65,30.4,71.1C17.6,77.3,2.8,79.5,-12.3,77.7C-27.5,75.9,-42.9,70.1,-53.9,59.9C-64.8,49.7,-71.2,35.2,-74.5,20C-77.8,4.8,-78,-11,-73.1,-25.1C-68.3,-39.2,-58.4,-51.5,-46,-57.9C-33.6,-64.3,-18.5,-64.8,-3.4,-60.2C11.7,-55.6,27.2,-71.8,38.5,-65.8Z",
                  "M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z"
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 25,
                ease: "easeInOut",
              }}
              className="blur-md"
            />
          </svg>
        </div>
      )}
    </div>
  );
}