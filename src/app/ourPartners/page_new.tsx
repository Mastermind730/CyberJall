/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  FiTrendingUp,
  FiHeart,
  FiTarget,
  FiDollarSign,
  FiMessageCircle,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa6";

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

export default function Partners() {
  const router = useRouter();
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

  // Features data
  const features = [
    {
      id: 1,
      title: "AI-Powered Service Recommendation",
      description:
        "Get personalized cybersecurity recommendations based on your business needs",
      icon: FaBrain,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      hoverBgColor: "hover:bg-blue-900/30",
      action: () => console.log("AI Recommendation clicked"),
    },
    {
      id: 2,
      title: "Cyber Health Score",
      description:
        "Assess your organization's cybersecurity posture with our comprehensive scoring system",
      icon: FiHeart,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      hoverBgColor: "hover:bg-red-900/30",
      action: () => console.log("Cyber Health Score clicked"),
    },
    {
      id: 3,
      title: "Smart Compare",
      description:
        "Compare cybersecurity providers side-by-side to make informed decisions",
      icon: FiTarget,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      hoverBgColor: "hover:bg-green-900/30",
      action: () => setShowComparison(true),
    },
    {
      id: 4,
      title: "CyberBid",
      description:
        "Create competitive bids and get quotes from multiple security providers",
      icon: FiDollarSign,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      hoverBgColor: "hover:bg-orange-900/30",
      action: () => router.push("/bid/create"),
    },
    {
      id: 5,
      title: "Free Consultation",
      description:
        "Connect with cybersecurity experts for personalized advice and guidance",
      icon: FiMessageCircle,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      hoverBgColor: "hover:bg-purple-900/30",
      action: () => router.push("/consultation"),
    },
  ];

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
        <div className="flex items-center text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">Security Partners</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Cybersecurity Service Providers
            </h1>
            <p className="text-gray-400">
              Find and compare the best cybersecurity partners for your business
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedCompanies.length > 0 && (
              <>
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors shadow-lg shadow-blue-600/25"
                >
                  <FiBarChart2 className="mr-2" />
                  Compare ({selectedCompanies.length})
                </button>
                <Link
                  href="/bid/create"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 flex items-center transition-colors shadow-lg shadow-orange-600/25"
                >
                  <FiTrendingUp className="mr-2" />
                  Smart Bid ({selectedCompanies.length})
                </Link>
              </>
            )}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-700 flex items-center transition-colors"
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Features Section - Left Side */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <FiShield className="mr-3 text-blue-400" />
                CyberJall Features
              </h2>
              <div className="space-y-3">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={feature.action}
                      className={`w-full text-left p-4 rounded-lg border border-gray-600/50 ${feature.bgColor} ${feature.hoverBgColor} hover:border-gray-500 transition-all duration-200 group hover:scale-[1.02]`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 p-2 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-200`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${feature.color}`}
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors duration-200">
                            {feature.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Platform Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="text-2xl font-bold text-blue-400">
                      {partners.length}+
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Providers</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <div className="text-2xl font-bold text-green-400">
                      500+
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Active Filters */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="relative flex-1 max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search security providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-600/50 rounded-xl leading-5 bg-gray-700/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400 whitespace-nowrap">Sort by:</span>
                  <select
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-gray-700/50 backdrop-blur-sm text-white transition-colors"
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
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-400">Active filters:</span>
                    {filters.industry.map((industry) => (
                      <span
                        key={`active-industry-${industry}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700/50"
                      >
                        {industry}
                        <button
                          onClick={() => toggleFilter("industry", industry)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-300 hover:bg-blue-800 hover:text-blue-200 transition-colors"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.service.map((service) => (
                      <span
                        key={`active-service-${service}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-900/50 text-green-200 border border-green-700/50"
                      >
                        {service}
                        <button
                          onClick={() => toggleFilter("service", service)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-300 hover:bg-green-800 hover:text-green-200 transition-colors"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.certification.map((cert) => (
                      <span
                        key={`active-cert-${cert}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-700/50"
                      >
                        {cert}
                        <button
                          onClick={() => toggleFilter("certification", cert)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-300 hover:bg-purple-800 hover:text-purple-200 transition-colors"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.teamSize.map((size) => (
                      <span
                        key={`active-size-${size}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-200 border border-yellow-700/50"
                      >
                        {size}
                        <button
                          onClick={() => toggleFilter("teamSize", size)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-yellow-300 hover:bg-yellow-800 hover:text-yellow-200 transition-colors"
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
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-900/50 text-red-200 border border-red-700/50"
                        >
                          {label}
                          <button
                            onClick={() => toggleFilter("minExperience", exp)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-300 hover:bg-red-800 hover:text-red-200 transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors ml-2"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                Available Providers
                <span className="text-gray-400 font-normal ml-2">
                  ({partners.length} {partners.length === 1 ? "company" : "companies"})
                </span>
              </h2>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="bg-gray-800/50 backdrop-blur-sm p-12 rounded-xl border border-gray-700/50 flex justify-center items-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading security partners...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
                <div className="text-red-400 mb-4">
                  <FiFrown className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  Error loading partners
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Try Again
                </button>
              </div>
            ) : partners.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm p-12 rounded-xl border border-gray-700/50 text-center">
                <div className="text-gray-500 mb-6">
                  <FiFrown className="w-20 h-20 mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  No partners found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {partners.map((partner) => {
                  const averageRating = getAverageRating(partner);
                  const reviewCount = partner.client_reviews?.length || 0;

                  return (
                    <div
                      key={`partner-${partner.id}`}
                      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 hover:scale-[1.02] relative group ${
                        selectedCompanies.includes(partner.id)
                          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
                          : ""
                      }`}
                    >
                      {/* Compare checkbox */}
                      <div className="absolute top-4 right-4 z-10">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(partner.id)}
                            onChange={() => toggleCompanySelection(partner.id)}
                            className="h-5 w-5 text-blue-600 rounded border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-700/50 backdrop-blur-sm transition-colors"
                          />
                        </label>
                      </div>

                      {/* Partner logo and basic info */}
                      <div className="p-6 border-b border-gray-700/50">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-gray-700/50 backdrop-blur-sm overflow-hidden border border-gray-600/50 flex items-center justify-center group-hover:border-gray-500 transition-colors">
                            {partner.logo ? (
                              <Image
                                width={64}
                                height={64}
                                src={partner.logo}
                                alt={`${partner.company_name} logo`}
                                className="max-h-full max-w-full object-contain p-1"
                              />
                            ) : (
                              <span className="text-xl font-bold text-gray-400">
                                {getInitials(partner.company_name)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                              {partner.company_name}
                            </h3>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={`star-${partner.id}-${i}`}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(averageRating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-500"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-400 ml-2">
                                {averageRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-400">
                              <FiMapPin className="flex-shrink-0 mr-2 h-4 w-4" />
                              <span className="truncate">
                                {partner.headquarters_city}, {partner.headquarters_country}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Partner details */}
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-sm text-gray-300">
                            <FiUsers className="flex-shrink-0 mr-3 h-4 w-4 text-blue-400" />
                            <span>{partner.team_size} team</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <FiCalendar className="flex-shrink-0 mr-3 h-4 w-4 text-green-400" />
                            <span>Est. {partner.year_founded}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <FiLayers className="flex-shrink-0 mr-3 h-4 w-4 text-purple-400" />
                            <span>{partner.services_offered?.length || 0} services</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-300">
                            <FiAward className="flex-shrink-0 mr-3 h-4 w-4 text-yellow-400" />
                            <span>{partner.expertise_and_certifications?.length || 0} certs</span>
                          </div>
                        </div>

                        {/* Industries served */}
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Industries
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.industries_served
                              ?.slice(0, 3)
                              .map((industry, i) => (
                                <span
                                  key={`industry-${partner.id}-${i}`}
                                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-900/30 text-blue-200 border border-blue-700/30"
                                >
                                  {industry}
                                </span>
                              ))}
                            {partner.industries_served?.length > 3 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/30">
                                +{partner.industries_served.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top services */}
                        <div className="mb-2">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Top Services
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.services_offered
                              ?.slice(0, 3)
                              .map((service, i) => (
                                <span
                                  key={`service-${partner.id}-${i}`}
                                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-900/30 text-green-200 border border-green-700/30"
                                >
                                  {service.name}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="px-6 py-4 bg-gray-700/30 border-t border-gray-700/50 flex justify-between">
                        <Link
                          href={`/company/${partner.id}`}
                          className="inline-flex items-center px-4 py-2 border border-gray-600/50 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          <FiEye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                        {partner.website && (
                          <Link
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                          >
                            <FiExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
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
              <div className="mt-12 flex justify-center">
                <nav
                  className="flex items-center space-x-2"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-600/50 rounded-lg bg-gray-800/50 text-sm font-medium text-gray-400 hover:bg-gray-700/50 transition-colors">
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
                  <button className="z-10 bg-blue-600 border-blue-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg shadow-lg shadow-blue-600/25">
                    1
                  </button>
                  <button className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                    2
                  </button>
                  <button className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-600/50 bg-gray-800/50 text-sm font-medium text-gray-400 rounded-lg">
                    ...
                  </span>
                  <button className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                    8
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-600/50 rounded-lg bg-gray-800/50 text-sm font-medium text-gray-400 hover:bg-gray-700/50 transition-colors">
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
              <div className="fixed inset-0" aria-hidden="true">
                <div
                  className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="inline-block align-bottom bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full border border-gray-700/50"
              >
                <div className="bg-gray-800 px-6 pt-6 pb-4 sm:p-8">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl leading-6 font-bold text-white">
                          Compare Security Providers
                        </h3>
                        <button
                          onClick={() => setShowComparison(false)}
                          className="text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                        >
                          <FiX className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="mt-4">
                        {companiesToCompare.length === 0 ? (
                          <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                              <FiBarChart2 className="w-16 h-16 mx-auto opacity-50" />
                            </div>
                            <p className="text-gray-400 text-lg">
                              Select companies to compare by checking the boxes
                            </p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto rounded-xl border border-gray-700/50">
                            <table className="min-w-full divide-y divide-gray-700/50">
                              <thead className="bg-gray-700/30">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                                  >
                                    Feature
                                  </th>
                                  {companiesToCompare.map((company) => (
                                    <th
                                      key={`compare-header-${company.id}`}
                                      scope="col"
                                      className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                                    >
                                      {company.company_name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-gray-800 divide-y divide-gray-700/50">
                                <tr className="hover:bg-gray-700/30 transition-colors">
                                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Rating
                                  </td>
                                  {companiesToCompare.map((company) => {
                                    const avgRating = getAverageRating(company);
                                    return (
                                      <td
                                        key={`compare-rating-${company.id}`}
                                        className="px-8 py-4 whitespace-nowrap text-sm text-gray-300"
                                      >
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <FiStar
                                              key={`compare-star-${company.id}-${i}`}
                                              className={`h-4 w-4 ${
                                                i < Math.floor(avgRating)
                                                  ? "text-yellow-400 fill-current"
                                                  : "text-gray-500"
                                              }`}
                                            />
                                          ))}
                                          <span className="ml-2 text-xs text-gray-400">
                                            {avgRating.toFixed(1)} ({company.client_reviews?.length || 0})
                                          </span>
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr className="hover:bg-gray-700/30 transition-colors">
                                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Location
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-location-${company.id}`}
                                      className="px-8 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.headquarters_city},{" "}
                                      {company.headquarters_country}
                                    </td>
                                  ))}
                                </tr>
                                <tr className="hover:bg-gray-700/30 transition-colors">
                                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Team Size
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-team-${company.id}`}
                                      className="px-8 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.team_size}
                                    </td>
                                  ))}
                                </tr>
                                <tr className="hover:bg-gray-700/30 transition-colors">
                                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    Founded
                                  </td>
                                  {companiesToCompare.map((company) => (
                                    <td
                                      key={`compare-founded-${company.id}`}
                                      className="px-8 py-4 whitespace-nowrap text-sm text-gray-300"
                                    >
                                      {company.year_founded}
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
                <div className="bg-gray-700/30 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => setShowComparison(false)}
                    className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg px-6 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors sm:ml-4 sm:w-auto sm:text-sm"
                  >
                    Close Comparison
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCompanies([])}
                    className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-600/50 shadow-sm px-6 py-3 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm"
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