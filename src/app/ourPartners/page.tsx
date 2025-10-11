/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MarketplaceRegistrationForm from "../components/MarketplaceRegistrationForm";
import {
  FiCpu,
  FiUserCheck,
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
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiZap,
  FiActivity,
  FiDollarSign,
  FiMessageCircle,
} from "react-icons/fi";
import { IconAddressBook } from "@tabler/icons-react";
import InviteModal from "../components/InviteModal";

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
  return typeof item === "string" ? item : item.name;
};

// Constants
const industryOptions = [
  "Finance & Banking",
  "Healthcare & Life Sciences",
  "E-commerce & Retail",
  "Telecommunications",
  "Agriculture & Agritech",
  "Hospitality & Travel",
  "Aerospace & Defense",
  "Government & Public Sector",
  "Education & EdTech",
  "Transportation & Logistics",
  "Real Estate & Construction",
  "Other",
];

const serviceOptions = [
  "VAPT",
  "Compliance",
  "Cloud Security",
  "Network Security",
  "Application Security",
  "Incident Response",
  "Risk Assessment",
  "Security Training",
  "Penetration Testing",
  "Threat Intelligence",
];

const certificationOptions = [
  "ISO 27001",
  "SOC 2",
  "GDPR",
  "PCI DSS",
  "HIPAA",
  "NIST",
  "CIS",
  "CREST",
  "OSCP",
];

const teamSizeOptions = ["Solo", "2-10", "11-50", "51-200", "201-500", "500+"];

const experienceOptions = [
  { label: "1+ years", value: "1" },
  { label: "3+ years", value: "3" },
  { label: "5+ years", value: "5" },
  { label: "10+ years", value: "10" },
];

const ratingOptions = [
  { label: "4+ Stars", value: "4" },
  { label: "3+ Stars", value: "3" },
  { label: "2+ Stars", value: "2" },
];

const pricingModelOptions = [
  "Hourly",
  "Project-based",
  "Retainer",
  "Subscription",
];

// FilterDropdown Component
interface FilterDropdownProps {
  title: string;
  options: (string | { label: string; value: string })[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  placeholder: string;
  renderOption?: (option: string | { label: string; value: string }) => string;
  getValue?: (option: string | { label: string; value: string }) => string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  selectedValues,
  onToggle,
  placeholder,
  renderOption = (option) =>
    typeof option === "string" ? option : option.label,
  getValue = (option) => (typeof option === "string" ? option : option.value),
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const selectedOption = options.find(
        (option) => getValue(option) === selectedValues[0]
      );
      return selectedOption ? renderOption(selectedOption) : selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div className="mb-4 relative">
      <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span
            className={
              selectedValues.length === 0 ? "text-gray-400" : "text-white"
            }
          >
            {getDisplayText()}
          </span>
          <FiChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto"
            >
              {options.map((option) => {
                const value = getValue(option);
                const label = renderOption(option);
                const isSelected = selectedValues.includes(value);

                return (
                  <button
                    key={`${title}-${value}`}
                    onClick={() => {
                      onToggle(value);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-600 flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-900/50 text-blue-200"
                        : "text-gray-300"
                    }`}
                  >
                    <span>{label}</span>
                    {isSelected && (
                      <FiCheck className="w-4 h-4 text-blue-400" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close */}
        {isOpen && (
          <div className="fixed inset-0 z-5" onClick={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  );
};

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
    pricingModel: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // --- Invite Modal State ---
  const [inviteModal, setInviteModal] = useState<{
    open: boolean;
    partner: Partner | null;
  }>({ open: false, partner: null });

  // Invite Modal handlers
  const handleInviteClick = (partner: Partner) => {
    setInviteModal({ open: true, partner });
  };
  const handleInviteSuccess = () => {
    setInviteModal({ open: false, partner: null });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();

        if (searchQuery) params.append("search", searchQuery);
        filters.industry.forEach((i) => params.append("industry", i));
        filters.service.forEach((s) => params.append("service", s));
        filters.certification.forEach((c) => params.append("certification", c));
        filters.location.forEach((l) => params.append("location", l));
        filters.teamSize.forEach((t) => params.append("teamSize", t));
        filters.minExperience.forEach((e) => params.append("minExperience", e));
        filters.minRating.forEach((r) => params.append("minRating", r));
        filters.pricingModel.forEach((p) => params.append("pricingModel", p));

        const response = await fetch(`/api/company?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data = await response.json();
        setPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load partners"
        );
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
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
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
      pricingModel: [],
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).reduce(
    (count, values) => count + values.length,
    0
  );

  const toggleCompanySelection = (id: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((companyId) => companyId !== id)
        : [...prev, id]
    );
  };

  const companiesToCompare = useMemo(() => {
    return partners.filter((partner) => selectedCompanies.includes(partner.id));
  }, [selectedCompanies, partners]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Calculate average rating from client reviews
  const getAverageRating = (partner: Partner) => {
    if (!partner.client_reviews || partner.client_reviews.length === 0) {
      return 0;
    }
    const sum = partner.client_reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return sum / partner.client_reviews.length;
  };

  // Get experience years
  const getExperienceYears = (partner: Partner) => {
    const currentYear = new Date().getFullYear();
    return currentYear - partner.year_founded;
  };

  // Check if partner is verified (has certifications and reviews)
  const isVerified = (partner: Partner) => {
    return (
      partner.expertise_and_certifications &&
      partner.expertise_and_certifications.length > 0 &&
      partner.client_reviews &&
      partner.client_reviews.length > 0
    );
  };

  // Check if partner is premium (highly rated with many reviews)
  const isPremium = (partner: Partner) => {
    const rating = getAverageRating(partner);
    const reviewCount = partner.client_reviews?.length || 0;
    return rating >= 4.5 && reviewCount >= 10;
  };

  // Only render UI after confirming we're on the client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">Security Partners</span>
        </div>

        {/* Marketplace Registration Form Section */}
        <div className="mb-8">
          <MarketplaceRegistrationForm className="max-w-4xl mx-auto" />
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Cybersecurity Service Providers
            <span className="text-gray-400 font-normal ml-2">
              ({partners.length}{" "}
              {partners.length === 1 ? "company" : "companies"})
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            {selectedCompanies.length > 0 && (
              <>
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FiBarChart2 className="mr-2" />
                  Compare ({selectedCompanies.length})
                </button>
                <Link
                  href="/bid/create"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
                >
                  <FiTrendingUp className="mr-2" />
                  Smart Bid ({selectedCompanies.length})
                </Link>
              </>
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
                  <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                    <span>Top Rated</span>
                    <FiStar className="text-yellow-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                    <span>Fast Response</span>
                    <FiShield className="text-green-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                    <span>Enterprise Ready</span>
                    <FiUsers className="text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                  <FiZap className="mr-2 text-green-400" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-cyan-800/50 hover:to-blue-800/50 transition-all duration-200">
                    <span>AI Based Service</span>
                    <FiCpu className="text-cyan-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-indigo-900/50 to-violet-900/50 text-indigo-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-indigo-800/50 hover:to-violet-800/50 transition-all duration-200">
                    <span>AI Based Provider Match</span>
                    <FiUserCheck className="text-indigo-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 text-emerald-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-emerald-800/50 hover:to-green-800/50 transition-all duration-200">
                    <span>Cyber Health Score</span>
                    <FiActivity className="text-emerald-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-purple-900/50 to-violet-900/50 text-purple-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-purple-800/50 hover:to-violet-800/50 transition-all duration-200">
                    <span>Smart Compare</span>
                    <FiBarChart2 className="text-purple-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-orange-900/50 to-amber-900/50 text-orange-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-orange-800/50 hover:to-amber-800/50 transition-all duration-200">
                    <span>CyberBid</span>
                    <FiDollarSign className="text-orange-400" />
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-blue-800/50 hover:to-cyan-800/50 transition-all duration-200">
                    <span>Free Consultation</span>
                    <FiMessageCircle className="text-blue-400" />
                  </button>
                </div>
              </div>

              {/* Industry Filter Dropdown */}
              <FilterDropdown
                title="Industry Focus"
                options={industryOptions}
                selectedValues={filters.industry}
                onToggle={(value) => toggleFilter("industry", value)}
                placeholder="Select industries..."
              />

              {/* Services Filter Dropdown */}
              <FilterDropdown
                title="Services Offered"
                options={serviceOptions}
                selectedValues={filters.service}
                onToggle={(value) => toggleFilter("service", value)}
                placeholder="Select services..."
              />

              {/* Certifications Filter Dropdown */}
              <FilterDropdown
                title="Certifications"
                options={certificationOptions}
                selectedValues={filters.certification}
                onToggle={(value) => toggleFilter("certification", value)}
                placeholder="Select certifications..."
              />

              {/* Team Size Filter Dropdown */}
              <FilterDropdown
                title="Team Size"
                options={teamSizeOptions}
                selectedValues={filters.teamSize}
                onToggle={(value) => toggleFilter("teamSize", value)}
                placeholder="Select team size..."
              />

              {/* Experience Filter Dropdown */}
              <FilterDropdown
                title="Minimum Experience"
                options={experienceOptions.map((exp) => ({
                  label: exp.label,
                  value: exp.value,
                }))}
                selectedValues={filters.minExperience}
                onToggle={(value) => toggleFilter("minExperience", value)}
                placeholder="Select experience..."
                renderOption={(option) =>
                  typeof option === "string" ? option : option.label
                }
                getValue={(option) =>
                  typeof option === "string" ? option : option.value
                }
              />

              {/* Rating Filter Dropdown */}
              <FilterDropdown
                title="Minimum Rating"
                options={ratingOptions.map((rating) => ({
                  label: rating.label,
                  value: rating.value,
                }))}
                selectedValues={filters.minRating}
                onToggle={(value) => toggleFilter("minRating", value)}
                placeholder="Select rating..."
                renderOption={(option) =>
                  typeof option === "string" ? option : option.label
                }
                getValue={(option) =>
                  typeof option === "string" ? option : option.value
                }
              />
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
                    {filters.industry.map((industry) => (
                      <span
                        key={`active-industry-${industry}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200"
                      >
                        {industry}
                        <button
                          onClick={() => toggleFilter("industry", industry)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-300 hover:bg-blue-800 hover:text-blue-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.service.map((service) => (
                      <span
                        key={`active-service-${service}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200"
                      >
                        {service}
                        <button
                          onClick={() => toggleFilter("service", service)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-300 hover:bg-green-800 hover:text-green-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.certification.map((cert) => (
                      <span
                        key={`active-cert-${cert}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200"
                      >
                        {cert}
                        <button
                          onClick={() => toggleFilter("certification", cert)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-300 hover:bg-purple-800 hover:text-purple-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.teamSize.map((size) => (
                      <span
                        key={`active-size-${size}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200"
                      >
                        {size}
                        <button
                          onClick={() => toggleFilter("teamSize", size)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-yellow-300 hover:bg-yellow-800 hover:text-yellow-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.minExperience.map((exp) => {
                      const label =
                        experienceOptions.find((e) => e.value === exp)?.label ||
                        `${exp}+ years`;
                      return (
                        <span
                          key={`active-exp-${exp}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200"
                        >
                          {label}
                          <button
                            onClick={() => toggleFilter("minExperience", exp)}
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
                <h3 className="text-lg font-medium text-white mb-2">
                  Error loading partners
                </h3>
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
                <h3 className="text-lg font-medium text-white mb-2">
                  No partners found
                </h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search query to find what
                  you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {partners.map((partner) => {
                  const averageRating = getAverageRating(partner);
                  const reviewCount = partner.client_reviews?.length || 0;
                  const experienceYears = getExperienceYears(partner);
                  const verified = isVerified(partner);
                  const premium = isPremium(partner);

                  return (
                    <motion.div
                      key={`partner-${partner.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl border overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full ${
                        selectedCompanies.includes(partner.id)
                          ? "ring-2 ring-blue-500 border-blue-500/50"
                          : premium
                          ? "border-gradient-to-r from-yellow-400/50 to-orange-500/50 border-yellow-500/30"
                          : "border-gray-700/50 hover:border-blue-500/30"
                      }`}
                    >
                      {/* Premium Badge */}
                      {premium && (
                        <div className="absolute top-3 left-3 z-20">
                          <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            <FiZap className="w-3 h-3 mr-1" />
                            PREMIUM
                          </div>
                        </div>
                      )}

                      {/* Verified Badge */}
                      {verified && !premium && (
                        <div className="absolute top-3 left-3 z-20">
                          <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <FiCheckCircle className="w-3 h-3 mr-1" />
                            VERIFIED
                          </div>
                        </div>
                      )}

                      {/* Compare checkbox */}
                      <div className="absolute top-3 right-3 z-20">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(partner.id)}
                            onChange={() => toggleCompanySelection(partner.id)}
                            className="h-5 w-5 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-700/80 backdrop-blur-sm"
                          />
                        </label>
                      </div>

                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full translate-y-12 -translate-x-12"></div>
                      </div>

                      {/* Header Section */}
                      <div className="relative p-6 border-b border-gray-700/50">
                        <div className="flex items-start space-x-4">
                          <div className="relative flex-shrink-0">
                            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden border-2 border-gray-600/50 flex items-center justify-center shadow-lg">
                              {partner.logo ? (
                                <Image
                                  width={80}
                                  height={80}
                                  src={partner.logo}
                                  alt={`${partner.company_name} logo`}
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <span className="text-2xl font-bold text-gray-300">
                                  {getInitials(partner.company_name)}
                                </span>
                              )}
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                              {partner.company_name}
                            </h3>

                            {/* Rating and Reviews */}
                            <div className="flex items-center mb-2">
                              <div className="flex items-center mr-3">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={`star-${partner.id}-${i}`}
                                    className={`h-4 w-4 ${
                                      i < averageRating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-600"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm font-semibold text-yellow-400 ml-2">
                                  {averageRating.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">
                                ({reviewCount} reviews)
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-sm text-gray-400">
                              <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              <span>
                                {partner.headquarters_city},{" "}
                                {partner.headquarters_country}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">
                                  Team Size
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {partner.team_size}
                                </div>
                              </div>
                              <FiUsers className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">
                                  Experience
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {experienceYears}+ years
                                </div>
                              </div>
                              <FiClock className="h-5 w-5 text-green-400" />
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">
                                  Services
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {partner.services_offered?.length || 0}
                                </div>
                              </div>
                              <FiLayers className="h-5 w-5 text-purple-400" />
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">
                                  Certs
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {partner.expertise_and_certifications
                                    ?.length || 0}
                                </div>
                              </div>
                              <FiAward className="h-5 w-5 text-orange-400" />
                            </div>
                          </div>
                        </div>

                        {/* Industries Section */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">
                            Industries
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.industries_served
                              ?.slice(0, 3)
                              .map((industry, i) => (
                                <span
                                  key={`industry-${partner.id}-${i}`}
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-700/30"
                                >
                                  {industry}
                                </span>
                              ))}
                            {(partner.services_offered?.length ?? 0) > 3 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/30">
                                +{(partner.services_offered?.length ?? 0) - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Services Section */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">
                            Key Services
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.services_offered
                              ?.slice(0, 3)
                              .map((service, i) => (
                                <span
                                  key={`service-${partner.id}-${i}`}
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/30"
                                >
                                  {service.name}
                                </span>
                              ))}
                            {(partner.services_offered?.length ?? 0) > 3 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/30">
                                +{(partner.services_offered?.length ?? 0) - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="px-4 py-3 bg-gray-800/30 border-t border-gray-700/50 backdrop-blur-sm mt-auto">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/company/${partner.id}`}
                            className="flex-1 inline-flex items-center justify-center px-2 py-2 border border-gray-600 text-xs font-medium rounded-md text-white bg-gray-800/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
                          >
                            <FiEye className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline ml-1">View</span>
                          </Link>

                          <button
                            // onClick={()=>handleInviteClick()}
                            className="flex-1 inline-flex items-center justify-center px-2 py-2 border border-gray-600 text-xs font-medium rounded-md text-white bg-gray-800/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
                          >
                            <IconAddressBook className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline ml-1">
                              Invite
                            </span>
                          </button>

                          {partner.website && (
                            <Link
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center px-2 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            >
                              <FiExternalLink className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline ml-1">
                                Site
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-purple-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {partners.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="z-10 bg-blue-900 border-blue-500 text-blue-100 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400">
                    ...
                  </span>
                  <button className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    8
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={inviteModal.open}
        onClose={() => setInviteModal({ open: false, partner: null })}
        partner={inviteModal.partner}
        onSuccess={handleInviteSuccess}
      />

      {/* Mobile Filters */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-screen">
              <div
                className="fixed inset-0 bg-black-opacity-75 transition-opacity"
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
                    {/* Smart Filters */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                        <FiTrendingUp className="mr-2 text-blue-400" />
                        Smart Filters
                      </h3>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                          <span>Top Rated</span>
                          <FiStar className="text-yellow-400" />
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                          <span>Fast Response</span>
                          <FiShield className="text-green-400" />
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-blue-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:bg-blue-800/50">
                          <span>Enterprise Ready</span>
                          <FiUsers className="text-purple-400" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                        <FiZap className="mr-2 text-green-400" />
                        Quick Actions
                      </h3>
                      <div className="space-y-2">
                        <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 text-emerald-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-emerald-800/50 hover:to-green-800/50 transition-all duration-200">
                          <span>Cyber Health Score</span>
                          <FiActivity className="text-emerald-400" />
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-purple-900/50 to-violet-900/50 text-purple-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-purple-800/50 hover:to-violet-800/50 transition-all duration-200">
                          <span>Smart Compare</span>
                          <FiBarChart2 className="text-purple-400" />
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-orange-900/50 to-amber-900/50 text-orange-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-orange-800/50 hover:to-amber-800/50 transition-all duration-200">
                          <span>CyberBid</span>
                          <FiDollarSign className="text-orange-400" />
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-blue-200 rounded-md text-sm font-medium flex items-center justify-between hover:from-blue-800/50 hover:to-cyan-800/50 transition-all duration-200">
                          <span>Free Consultation</span>
                          <FiMessageCircle className="text-blue-400" />
                        </button>
                      </div>
                    </div>
                    {/* Industry Filter Dropdown */}
                    <FilterDropdown
                      title="Industry Focus"
                      options={industryOptions}
                      selectedValues={filters.industry}
                      onToggle={(value) => toggleFilter("industry", value)}
                      placeholder="Select industries..."
                    />

                    {/* Services Filter Dropdown */}
                    <FilterDropdown
                      title="Services Offered"
                      options={serviceOptions}
                      selectedValues={filters.service}
                      onToggle={(value) => toggleFilter("service", value)}
                      placeholder="Select services..."
                    />

                    {/* Certifications Filter Dropdown */}
                    <FilterDropdown
                      title="Certifications"
                      options={certificationOptions}
                      selectedValues={filters.certification}
                      onToggle={(value) => toggleFilter("certification", value)}
                      placeholder="Select certifications..."
                    />

                    {/* Team Size Filter Dropdown */}
                    <FilterDropdown
                      title="Team Size"
                      options={teamSizeOptions}
                      selectedValues={filters.teamSize}
                      onToggle={(value) => toggleFilter("teamSize", value)}
                      placeholder="Select team size..."
                    />

                    {/* Experience Filter Dropdown */}
                    <FilterDropdown
                      title="Minimum Experience"
                      options={experienceOptions.map((exp) => ({
                        label: exp.label,
                        value: exp.value,
                      }))}
                      selectedValues={filters.minExperience}
                      onToggle={(value) => toggleFilter("minExperience", value)}
                      placeholder="Select experience..."
                      renderOption={(option) =>
                        typeof option === "string" ? option : option.label
                      }
                      getValue={(option) =>
                        typeof option === "string" ? option : option.value
                      }
                    />

                    {/* Rating Filter Dropdown */}
                    <FilterDropdown
                      title="Minimum Rating"
                      options={ratingOptions.map((rating) => ({
                        label: rating.label,
                        value: rating.value,
                      }))}
                      selectedValues={filters.minRating}
                      onToggle={(value) => toggleFilter("minRating", value)}
                      placeholder="Select rating..."
                      renderOption={(option) =>
                        typeof option === "string" ? option : option.label
                      }
                      getValue={(option) =>
                        typeof option === "string" ? option : option.value
                      }
                    />
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
                <div
                  className="absolute inset-0 bg-blackacity-75"
                  onClick={() => setShowComparison(false)}
                ></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

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
                            <p className="text-gray-400">
                              Select companies to compare by checking the boxes
                            </p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                              <thead className="bg-gray-700">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                  >
                                    Feature
                                  </th>
                                  {companiesToCompare.map((company) => (
                                    <th
                                      key={`compare-header-${company.id}`}
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                    >
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
                                  {companiesToCompare.map((company) => {
                                    const avgRating = getAverageRating(company);
                                    return (
                                      <td
                                        key={`compare-rating-${company.id}`}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                      >
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <FiStar
                                              key={`compare-star-${company.id}-${i}`}
                                              className={`h-4 w-4 ${
                                                i < avgRating
                                                  ? "text-yellow-400 fill-current"
                                                  : "text-gray-500"
                                              }`}
                                            />
                                          ))}
                                          <span className="ml-1 text-xs text-gray-400">
                                            (
                                            {company.client_reviews?.length ||
                                              0}
                                            )
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
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-location-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.headquarters_city},{" "}
                                      {company.headquarters_country}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Team Size
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-team-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.team_size}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Founded
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-founded-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.year_founded}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Industries
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-industries-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      <div className="flex flex-wrap gap-1">
                                        {company.industries_served
                                          ?.slice(0, 3)
                                          .map((industry, i) => (
                                            <span
                                              key={`compare-industry-${company.id}-${i}`}
                                              className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200"
                                            >
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
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-services-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      <div className="flex flex-wrap gap-1">
                                        {company.services_offered
                                          ?.slice(0, 3)
                                          .map((service, i) => (
                                            <span
                                              key={`compare-service-${company.id}-${i}`}
                                              className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-200"
                                            >
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
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-certs-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      <div className="flex flex-wrap gap-1">
                                        {company.expertise_and_certifications
                                          ?.slice(0, 3)
                                          .map((cert, i) => (
                                            <span
                                              key={`compare-cert-${company.id}-${i}`}
                                              className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-purple-900/50 text-purple-200"
                                            >
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
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-actions-${company.id}`}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
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
