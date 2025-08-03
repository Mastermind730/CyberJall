/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useMemo } from "react";
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
  FiFilter,
  FiStar,
  FiCheck,
  FiShield,
  FiUsers,
  FiCalendar,
  FiLayers,
  FiAward,
  FiBarChart2,
  FiTrendingUp
} from 'react-icons/fi';

interface Partner {
  id: string;
  company_name: string;
  logo: string;
  overview?: string;
  year_founded: number;
  headquarters_city: string;
  headquarters_country: string;
  industries_served: string[];
  target_business_size?: string[];
  geographic_coverage?: string[];
  team_size: string;
  services_offered?: {
    name: string;
    description?: string;
  }[];
  expertise_and_certifications?: {
    name: string;
    description?: string;
  }[];
  case_studies?: {
    title: string;
    description: string;
  }[];
  client_reviews?: {
    rating: number;
    comment: string;
  }[];
  social_links?: {
    platform: string;
    url: string;
  }[];
  website: string;
  products?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

interface Filters {
  industry: string[];
  service: string[];
  certification: string[];
  location: string[];
  teamSize: string[];
  minExperience: string[];
  minRating: string[];
  pricingModel: string[];
}

// Helper function to safely get display name
const getDisplayName = (item: string | { name: string }): string => {
  return typeof item === 'string' ? item : item.name;
};

// Constants
const industryOptions = [
  
  'Finance & Banking', 
        'Healthcare & Life Sciences',
        'E-commerce & Retail',
        'Telecommunications',
        'Agriculture & Agritech',
        'Hospitality & Travel',
        'Aerospace & Defense',
        'Government & Public Sector',
        'Education & EdTech',
        'Transportation & Logistics',
        'Real Estate & Construction',
        'Other'
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

const experienceOptions = [
  { label: "1+ years", value: "1" },
  { label: "3+ years", value: "3" },
  { label: "5+ years", value: "5" },
  { label: "10+ years", value: "10" }
];

const ratingOptions = [
  { label: "4+ Stars", value: "4" },
  { label: "3+ Stars", value: "3" },
  { label: "2+ Stars", value: "2" }
];

const pricingModelOptions = [
  "Hourly", "Project-based", "Retainer", "Subscription"
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    industry: [],
    service: [],
    certification: [],
    location: [],
    teamSize: [],
    minExperience: [],
    minRating: [],
    pricingModel: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        
        if (searchQuery) params.append('search', searchQuery);
        filters.industry.forEach(i => params.append('industry', i));
        filters.service.forEach(s => params.append('service', s));
        filters.certification.forEach(c => params.append('certification', c));
        filters.location.forEach(l => params.append('location', l));
        filters.teamSize.forEach(t => params.append('teamSize', t));
        filters.minExperience.forEach(e => params.append('minExperience', e));
        filters.minRating.forEach(r => params.append('minRating', r));
        filters.pricingModel.forEach(p => params.append('pricingModel', p));
        
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

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: [],
      service: [],
      certification: [],
      location: [],
      teamSize: [],
      minExperience: [],
      minRating: [],
      pricingModel: []
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).reduce(
    (count, values) => count + values.length, 0
  );

  const toggleCompanySelection = (id: string) => {
    setSelectedCompanies(prev => 
      prev.includes(id) 
        ? prev.filter(companyId => companyId !== id)
        : [...prev, id]
    );
  };

  const companiesToCompare = useMemo(() => {
    return partners.filter(partner => selectedCompanies.includes(partner.id));
  }, [selectedCompanies, partners]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Calculate average rating from client reviews
  const getAverageRating = (partner: Partner) => {
    if (!partner.client_reviews || partner.client_reviews.length === 0) {
      return 0;
    }
    const sum = partner.client_reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / partner.client_reviews.length;
  };

  // Only render UI after confirming we're on the client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">Security Partners</span>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Cybersecurity Service Providers
            <span className="text-gray-400 font-normal ml-2">
              ({partners.length} {partners.length === 1 ? 'company' : 'companies'})
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            {selectedCompanies.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FiBarChart2 className="mr-2" />
                Compare ({selectedCompanies.length})
              </button>
            )}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 flex items-center"
            >
              <FiFilter className="mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Smart Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                  <FiTrendingUp className="mr-2 text-blue-400" />
                  Smart Filters
                </h3>
                <div className="space-y-2">
                  <button 
                    className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50"
                  >
                    <span>Top Rated</span>
                    <FiStar className="text-yellow-400" />
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50"
                  >
                    <span>Fast Response</span>
                    <FiShield className="text-green-400" />
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50"
                  >
                    <span>Enterprise Ready</span>
                    <FiUsers className="text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Industry Focus</h3>
                <div className="space-y-2">
                  {industryOptions.map(industry => (
                    <div key={`industry-option-${industry}`} className="flex items-center">
                      <input
                        id={`industry-${industry}`}
                        type="checkbox"
                        checked={filters.industry.includes(industry)}
                        onChange={() => toggleFilter('industry', industry)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`industry-${industry}`} className="ml-2 text-sm text-gray-300">
                        {industry}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Services Offered</h3>
                <div className="space-y-2">
                  {serviceOptions.map(service => (
                    <div key={`service-option-${service}`} className="flex items-center">
                      <input
                        id={`service-${service}`}
                        type="checkbox"
                        checked={filters.service.includes(service)}
                        onChange={() => toggleFilter('service', service)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-300">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Certifications</h3>
                <div className="space-y-2">
                  {certificationOptions.map(cert => (
                    <div key={`cert-option-${cert}`} className="flex items-center">
                      <input
                        id={`cert-${cert}`}
                        type="checkbox"
                        checked={filters.certification.includes(cert)}
                        onChange={() => toggleFilter('certification', cert)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`cert-${cert}`} className="ml-2 text-sm text-gray-300">
                        {cert}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Size Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Team Size</h3>
                <div className="space-y-2">
                  {teamSizeOptions.map(size => (
                    <div key={`size-option-${size}`} className="flex items-center">
                      <input
                        id={`size-${size}`}
                        type="checkbox"
                        checked={filters.teamSize.includes(size)}
                        onChange={() => toggleFilter('teamSize', size)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`size-${size}`} className="ml-2 text-sm text-gray-300">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Minimum Experience</h3>
                <div className="space-y-2">
                  {experienceOptions.map(exp => (
                    <div key={`exp-option-${exp.value}`} className="flex items-center">
                      <input
                        id={`exp-${exp.value}`}
                        type="checkbox"
                        checked={filters.minExperience.includes(exp.value)}
                        onChange={() => toggleFilter('minExperience', exp.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`exp-${exp.value}`} className="ml-2 text-sm text-gray-300">
                        {exp.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2">Minimum Rating</h3>
                <div className="space-y-2">
                  {ratingOptions.map(rating => (
                    <div key={`rating-option-${rating.value}`} className="flex items-center">
                      <input
                        id={`rating-${rating.value}`}
                        type="checkbox"
                        checked={filters.minRating.includes(rating.value)}
                        onChange={() => toggleFilter('minRating', rating.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`rating-${rating.value}`} className="ml-2 text-sm text-gray-300">
                        {rating.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Active Filters */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search security providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                    defaultValue="Featured"
                  >
                    <option value="Featured">Featured</option>
                    <option value="Highest Rated">Highest Rated</option>
                    <option value="Most Experienced">Most Experienced</option>
                    <option value="Newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {filters.industry.map(industry => (
                      <span 
                        key={`active-industry-${industry}`} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200"
                      >
                        {industry}
                        <button
                          onClick={() => toggleFilter('industry', industry)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-300 hover:bg-blue-800 hover:text-blue-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.service.map(service => (
                      <span 
                        key={`active-service-${service}`} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200"
                      >
                        {service}
                        <button
                          onClick={() => toggleFilter('service', service)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-300 hover:bg-green-800 hover:text-green-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.certification.map(cert => (
                      <span 
                        key={`active-cert-${cert}`} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200"
                      >
                        {cert}
                        <button
                          onClick={() => toggleFilter('certification', cert)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-300 hover:bg-purple-800 hover:text-purple-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.teamSize.map(size => (
                      <span 
                        key={`active-size-${size}`} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200"
                      >
                        {size}
                        <button
                          onClick={() => toggleFilter('teamSize', size)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-yellow-300 hover:bg-yellow-800 hover:text-yellow-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.minExperience.map(exp => {
                      const label = experienceOptions.find(e => e.value === exp)?.label || `${exp}+ years`;
                      return (
                        <span 
                          key={`active-exp-${exp}`} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200"
                        >
                          {label}
                          <button
                            onClick={() => toggleFilter('minExperience', exp)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-300 hover:bg-red-800 hover:text-red-200"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-700 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-700 text-center">
                <div className="text-red-400 mb-4">
                  <FiFrown className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Error loading partners</h3>
                <p className="text-gray-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : partners.length === 0 ? (
              <div className="bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-700 text-center">
                <div className="text-gray-500 mb-4">
                  <FiFrown className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No partners found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(partner => {
                  const averageRating = getAverageRating(partner);
                  const reviewCount = partner.client_reviews?.length || 0;
                  
                  return (
                    <div 
                      key={`partner-${partner.id}`}
                      className={`bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-blue-500/50 relative ${selectedCompanies.includes(partner.id) ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {/* Compare checkbox */}
                      <div className="absolute top-2 right-2 z-10">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(partner.id)}
                            onChange={() => toggleCompanySelection(partner.id)}
                            className="h-5 w-5 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-700"
                          />
                        </label>
                      </div>

                      {/* Partner logo and basic info */}
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-16 w-16 rounded-md bg-gray-700 overflow-hidden border border-gray-600 flex items-center justify-center">
                            {partner.logo ? (
                              <Image
                                width={64}
                                height={64}
                                src={partner.logo}
                                alt={`${partner.company_name} logo`}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="text-xl font-bold text-gray-400">
                                {getInitials(partner.company_name)}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-white line-clamp-1">
                              {partner.company_name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={`star-${partner.id}-${i}`}
                                    className={`h-4 w-4 ${i < averageRating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400 ml-1">
                                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-400">
                              <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              <span>
                                {partner.headquarters_city}, {partner.headquarters_country}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Partner details */}
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center">
                            <FiUsers className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {partner.team_size} team
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              Est. {partner.year_founded}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FiLayers className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {partner.services_offered?.length || 0} services
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FiAward className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {partner.expertise_and_certifications?.length || 0} certs
                            </span>
                          </div>
                        </div>

                        {/* Industries served */}
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Industries
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {partner.industries_served?.slice(0, 3).map((industry, i) => (
                              <span 
                                key={`industry-${partner.id}-${i}`} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200"
                              >
                                {industry}
                              </span>
                            ))}
                            {partner.industries_served?.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-400">
                                +{partner.industries_served.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top services */}
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Top Services
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {partner.services_offered?.slice(0, 3).map((service, i) => (
                              <span 
                                key={`service-${partner.id}-${i}`}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200"
                              >
                                {service.name}
                              </span>
                            ))}
                            {/* {partner.services_offered?.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-400">
                                +{partner.services_offered.length - 3} more
                              </span>
                            )} */}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="px-4 py-3 bg-gray-700/50 flex justify-between">
                        <Link
                          href={`/company/${partner.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FiEye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                        {partner.website && (
                          <Link
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FiExternalLink className="mr-2 h-4 w-4" />
                            Website
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {partners.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    className="z-10 bg-blue-900 border-blue-500 text-blue-100 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </button>
                  <button
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </button>
                  <button
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400">
                    ...
                  </span>
                  <button
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    8
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-screen">
              <div 
                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
                onClick={() => setShowMobileFilters(false)}
              ></div>
              
              <div className="ml-auto relative w-full max-w-xs bg-gray-800 shadow-xl border-l border-gray-700">
                <div className="h-full flex flex-col py-4 pb-6">
                  <div className="px-4 flex items-center justify-between border-b border-gray-700 pb-4">
                    <h2 className="text-lg font-medium text-white">Filters</h2>
                    <button
                      type="button"
                      onClick={() => setShowMobileFilters(false)}
                      className="-mr-2 w-10 h-10 bg-gray-700 p-2 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-300"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Mobile Filters Content */}
                  <div className="mt-4 px-4 flex-1 overflow-y-auto">
                    {/* Industry Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2">Industry Focus</h3>
                      <div className="space-y-2">
                        {industryOptions.map(industry => (
                          <div key={`mobile-industry-${industry}`} className="flex items-center">
                            <input
                              id={`mobile-industry-${industry}`}
                              type="checkbox"
                              checked={filters.industry.includes(industry)}
                              onChange={() => toggleFilter('industry', industry)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor={`mobile-industry-${industry}`} className="ml-2 text-sm text-gray-300">
                              {industry}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2">Services Offered</h3>
                      <div className="space-y-2">
                        {serviceOptions.map(service => (
                          <div key={`mobile-service-${service}`} className="flex items-center">
                            <input
                              id={`mobile-service-${service}`}
                              type="checkbox"
                              checked={filters.service.includes(service)}
                              onChange={() => toggleFilter('service', service)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor={`mobile-service-${service}`} className="ml-2 text-sm text-gray-300">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2">Certifications</h3>
                      <div className="space-y-2">
                        {certificationOptions.map(cert => (
                          <div key={`mobile-cert-${cert}`} className="flex items-center">
                            <input
                              id={`mobile-cert-${cert}`}
                              type="checkbox"
                              checked={filters.certification.includes(cert)}
                              onChange={() => toggleFilter('certification', cert)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor={`mobile-cert-${cert}`} className="ml-2 text-sm text-gray-300">
                              {cert}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Size Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2">Team Size</h3>
                      <div className="space-y-2">
                        {teamSizeOptions.map(size => (
                          <div key={`mobile-size-${size}`} className="flex items-center">
                            <input
                              id={`mobile-size-${size}`}
                              type="checkbox"
                              checked={filters.teamSize.includes(size)}
                              onChange={() => toggleFilter('teamSize', size)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor={`mobile-size-${size}`} className="ml-2 text-sm text-gray-300">
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-4 border-t border-gray-700">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="flex-1 bg-gray-700 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Clear all
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMobileFilters(false)}
                        className="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 " aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={() => setShowComparison(false)}></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full border border-gray-700"
              >
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-white">
                          Compare Security Providers
                        </h3>
                        <button
                          onClick={() => setShowComparison(false)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <FiX className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="mt-4">
                        {companiesToCompare.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-400">Select companies to compare by checking the boxes</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                              <thead className="bg-gray-700">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Feature
                                  </th>
                                  {companiesToCompare.map(company => (
                                    <th key={`compare-header-${company.id}`} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                      {company.company_name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-gray-800 divide-y divide-gray-700">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Rating
                                  </td>
                                  {companiesToCompare.map(company => {
                                    const avgRating = getAverageRating(company);
                                    return (
                                      <td key={`compare-rating-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <FiStar
                                              key={`compare-star-${company.id}-${i}`}
                                              className={`h-4 w-4 ${i < avgRating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                                            />
                                          ))}
                                          <span className="ml-1 text-xs text-gray-400">
                                            ({company.client_reviews?.length || 0})
                                          </span>
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Location
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-location-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      {company.headquarters_city}, {company.headquarters_country}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Team Size
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-team-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      {company.team_size}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Founded
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-founded-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      {company.year_founded}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Industries
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-industries-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      <div className="flex flex-wrap gap-1">
                                        {company.industries_served?.slice(0, 3).map((industry, i) => (
                                          <span key={`compare-industry-${company.id}-${i}`} className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200">
                                            {industry}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Services
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-services-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      <div className="flex flex-wrap gap-1">
                                        {company.services_offered?.slice(0, 3).map((service, i) => (
                                          <span key={`compare-service-${company.id}-${i}`} className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200">
                                            {service.name}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Certifications
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-certs-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      <div className="flex flex-wrap gap-1">
                                        {company.expertise_and_certifications?.slice(0, 3).map((cert, i) => (
                                          <span key={`compare-cert-${company.id}-${i}`} className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-purple-900/50 text-purple-200">
                                            {cert.name}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Actions
                                  </td>
                                  {companiesToCompare.map(company => (
                                    <td key={`compare-actions-${company.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      <div className="flex space-x-2">
                                        <Link
                                          href={`/company/${company.id}`}
                                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-600 shadow-sm text-xs font-medium rounded text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                          View
                                        </Link>
                                        {company.website && (
                                          <Link
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          >
                                            Website
                                          </Link>
                                        )}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setShowComparison(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCompanies([])}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Clear Selection
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}