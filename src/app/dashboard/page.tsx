"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import {
  Package,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  Calendar,
  Loader2,
  DollarSign,
  Briefcase,
  Eye,
  Send,
  Building,
  Users,
  MapPin,
  Zap,
  ExternalLink,
  PlayCircle,
  CheckCircle2,
  PauseCircle,
  Plus,
} from "lucide-react";
import { useDashboardStats } from "../customer/hooks/useDashboardStats";
import { Message } from "@/lib/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BusinessBid {
  id: string;
  companyName: string;
  industry: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  serviceTypes: string[];
  description: string;
  infrastructureSize: string;
  urgency: "standard" | "urgent" | "critical";
  complianceGoals: string[];
  budget?: string;
  additionalNotes?: string;
  documents: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
  status: "approved" | "pending_review" | "closed";
  createdAt: string;
  updatedAt: string;
  responses?: {
    id: string;
    providerId: string;
    providerName: string;
    proposal: string;
    estimatedCost: string;
    timeline: string;
    createdAt: string;
  }[];
}

interface ProviderPackage {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "cancelled";
  startDate?: string;
  endDate?: string;
  userId: string;
  providerId?: string;
  services: string[];
  totalAmount: number;
  projectCategory?: string;
  clientCompany?: string;
  summary?: string;
  reports: unknown;
  createdAt: string;
  updatedAt: string;
}

interface ProviderPackagesData {
  packages: ProviderPackage[];
}

interface PackageType {
  id: string;
  name: string;
  status: "active" | "upcoming" | "completed";
  provider?: {
    company_name: string;
  };
  updatedAt: string;
}

interface User {
  role: string;
  company_name?: string;
  work_email: string;
  profile?: {
    firstName?: string;
    lastLogin?: string;
  };
}

interface Company {
  logo?: string;
  company_name: string;
  overview?: string;
  year_founded?: string;
  headquarters_city?: string;
  headquarters_country?: string;
  team_size?: string;
  website?: string;
  industries_served?: string[];
  geographic_coverage?: string[];
  target_business_size?: string[];
}

interface Stats {
  cyberHealth: {
    score: number;
  };
  packages: {
    active: number;
    upcoming: number;
    completed: number;
  };
  tickets: {
    open: number;
    resolved: number;
  };
  invoices: {
    unpaidAmount: number;
  };
  recentActivity: {
    packages: PackageType[];
    messages: Message[];
  };
}

interface DashboardStats {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  user: User | null;
  company: Company | null;
}

export default function Dashboard() {
  const { stats, loading, error, user, company } =
    useDashboardStats() as DashboardStats;
  const [businessBids, setBusinessBids] = useState<BusinessBid[]>([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [providerPackages, setProviderPackages] =
    useState<ProviderPackagesData>({
      packages: [],
    });
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const router = useRouter();

  // Redirect users to their role-specific dashboards
  useEffect(() => {
    if (user?.role === "provider") {
      router.replace("/provider");
      return;
    } else if (user?.role === "customer") {
      router.replace("/customer");
      return;
    }
  }, [user, router]);

  // If user is being redirected, show loading
  if (user?.role === "provider" || user?.role === "customer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // Check if provider has a company
  useEffect(() => {
    if (user?.role === "provider") {
      checkCompanyExists();
    }
  }, [user]);

  // Handle hash navigation (e.g., /dashboard#bids)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#bids") {
        setTimeout(() => {
          const element = document.getElementById("bids");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 500); // Wait for component to render
      }
    }
  }, [hasCompany]);

  // Fetch business bids and provider packages for providers
  useEffect(() => {
    if (user?.role === "provider" && hasCompany) {
      fetchBusinessBids();
      fetchProviderPackages();
    }
  }, [user, hasCompany]);

  const checkCompanyExists = async () => {
    try {
      const response = await fetch("/api/getCompany");
      if (response.ok) {
        const data = await response.json();
        setHasCompany(!!data.company);
      }
    } catch (error) {
      console.error("Error checking company:", error);
      setHasCompany(false);
    }
  };

  const fetchBusinessBids = async () => {
    setBidsLoading(true);
    try {
      const response = await fetch("/api/getAllBids");
      if (response.ok) {
        const data = await response.json();
        console.log(data.bids);
        setBusinessBids(data.bids || []);
      }
    } catch (error) {
      console.error("Error fetching business bids:", error);
    } finally {
      setBidsLoading(false);
    }
  };

  const fetchProviderPackages = async () => {
    setPackagesLoading(true);
    try {
      const response = await fetch(`/api/provider/packages`);
      if (response.ok) {
        const data = await response.json();
        setProviderPackages(data);
      } else {
        console.error("Failed to fetch provider packages");
      }
    } catch (error) {
      console.error("Error fetching provider packages:", error);
    } finally {
      setPackagesLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg mb-4">
            Please log in to access the dashboard
          </p>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user.profile?.firstName}
            </h2>
            <p className="text-gray-300">
              {user.work_email} • Last login:{" "}
              {user.profile?.lastLogin
                ? new Date(user.profile.lastLogin).toLocaleDateString()
                : "Recently"}
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-3xl font-bold text-orange-500">
              {stats?.cyberHealth.score || 85}%
            </div>
            <div className="text-sm text-gray-400">Cyber Health Score</div>
          </div>
        </div>
      </div>

      {/* Provider Company Setup Section */}
      {user.role === "provider" && !hasCompany && (
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building className="h-6 w-6 text-blue-400 mr-3" />
                <div>
                  <CardTitle className="text-xl text-white">
                    Complete Your Company Profile
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Set up your company profile to start receiving business bids
                    and showcase your cybersecurity expertise
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={() => router.push("/createCompany")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Company Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <Briefcase className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Receive Bids</h3>
                <p className="text-gray-400 text-sm">
                  Get business opportunities from clients
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Showcase Expertise</h3>
                <p className="text-gray-400 text-sm">
                  Display your certifications and case studies
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Grow Business</h3>
                <p className="text-gray-400 text-sm">
                  Connect with potential clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Company Information Section (Only for providers with company) */}
      {user.role === "provider" && company && hasCompany && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {company.logo && (
                <Image
                  src={company.logo}
                  alt="Company Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-lg"
                />
              )}
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl text-white">
                  {company.company_name}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {company.overview}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Company Details
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-white">Founded: {company.year_founded}</p>
                  <p className="text-white">
                    Location: {company.headquarters_city},{" "}
                    {company.headquarters_country}
                  </p>
                  <p className="text-white">Team Size: {company.team_size}</p>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-400 text-sm"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
              {company.industries_served &&
                company.industries_served.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Industries Served
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {company.industries_served
                        .slice(0, 4)
                        .map((industry, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-800 text-white text-xs"
                          >
                            {industry}
                          </Badge>
                        ))}
                      {company.industries_served.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-800 text-white text-xs"
                        >
                          +{company.industries_served.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
            </div>
            <div className="space-y-4">
              {company.geographic_coverage &&
                company.geographic_coverage.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Coverage
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {company.geographic_coverage
                        .slice(0, 3)
                        .map((region, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-800 text-white text-xs"
                          >
                            {region}
                          </Badge>
                        ))}
                      {company.geographic_coverage.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-800 text-white text-xs"
                        >
                          +{company.geographic_coverage.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              {company.target_business_size &&
                company.target_business_size.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Target Business Size
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {company.target_business_size.map((size, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-800 text-white text-xs"
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Packages"
          value={stats?.packages.active || 3}
          icon={<Package className="h-4 w-4 text-orange-500" />}
          subtitle={`${stats?.packages.upcoming || 2} upcoming, ${
            stats?.packages.completed || 5
          } completed`}
        />

        <StatCard
          title="Security Score"
          value={`${stats?.cyberHealth.score || 85}%`}
          icon={<Shield className="h-4 w-4 text-green-500" />}
          subtitle={`+5% from last month`}
          trend="positive"
        />

        <StatCard
          title="Open Tickets"
          value={stats?.tickets.open || 2}
          icon={<MessageSquare className="h-4 w-4 text-yellow-500" />}
          subtitle={`${stats?.tickets.resolved || 12} resolved this month`}
        />

        <StatCard
          title={user.role === "provider" ? "Open Bids" : "Pending Invoices"}
          value={
            user.role === "provider"
              ? businessBids.filter((bid) => bid.status === "approved")
                  .length || 4
              : `$${(stats?.invoices.unpaidAmount || 12500).toLocaleString()}`
          }
          icon={
            user.role === "provider" ? (
              <Briefcase className="h-4 w-4 text-blue-500" />
            ) : (
              <FileText className="h-4 w-4 text-red-500" />
            )
          }
          subtitle={
            user.role === "provider" ? "New opportunities" : "Due in 5 days"
          }
          trend={user.role === "provider" ? "neutral" : "negative"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {user.role === "provider" && hasCompany ? (
          <>
            <ProviderPackagesCard
              packagesData={providerPackages}
              loading={packagesLoading}
              onRefresh={fetchProviderPackages}
            />
            <BusinessBidsCard
              bids={businessBids}
              loading={bidsLoading}
              onRefresh={fetchBusinessBids}
            />
          </>
        ) : (
          <>
            <RecentPackagesCard packages={stats?.recentActivity.packages} />
            <SecurityInsightsCard score={stats?.cyberHealth.score || 85} />
          </>
        )}
      </div>

      {/* Bottom Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard
          packages={stats?.recentActivity.packages}
          messages={stats?.recentActivity.messages}
        />
        <UpcomingEventsCard />
      </div>
    </div>
  );
}

// Component for stat cards
function StatCard({
  title,
  value,
  icon,
  subtitle,
  trend = "neutral",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  trend?: "positive" | "negative" | "neutral";
}) {
  const trendColor =
    trend === "positive"
      ? "text-green-400"
      : trend === "negative"
      ? "text-red-400"
      : "text-gray-400";

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className={`text-xs ${trendColor} mt-1`}>{subtitle}</p>
      </CardContent>
    </Card>
  );
}

// Component for provider packages
function ProviderPackagesCard({
  packagesData,
  loading,
  onRefresh,
}: {
  packagesData: ProviderPackagesData;
  loading: boolean;
  onRefresh: () => void;
}) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case "completed":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case "upcoming":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case "cancelled":
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "completed":
        return "bg-blue-500/20 text-blue-400";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Package className="mr-2 h-5 w-5 text-orange-500" />
          My Packages
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your active client engagements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
          </div>
        ) : packagesData.packages.length > 0 ? (
          packagesData.packages.slice(0, 5).map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(pkg.status)}
                <div>
                  <p className="text-sm font-medium text-white">{pkg.name}</p>
                  <p className="text-xs text-gray-400">
                    {pkg.clientCompany || "No client specified"}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className={getStatusColor(pkg.status)}>
                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No packages found</p>
        )}
      </CardContent>
    </Card>
  );
}

// Component for business bids (providers only)
function BusinessBidsCard({
  bids,
  loading,
  onRefresh,
}: {
  bids: BusinessBid[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [selectedBid, setSelectedBid] = useState<BusinessBid | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const router = useRouter();

  const openBids = bids.filter((bid) => bid.status === "approved");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500/20 text-red-400";
      case "urgent":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const handleViewBid = (bid: BusinessBid) => {
    setSelectedBid(bid);
    setShowResponseModal(true);
  };

  const handleCreateBid = () => {
    router.push("/bid/create");
  };

  return (
    <>
      <Card id="bids" className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                Business Opportunities
              </CardTitle>
              <CardDescription className="text-gray-400">
                New client requests for your services
              </CardDescription>
            </div>
            <Button
              onClick={handleCreateBid}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post Opportunity
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
          ) : openBids.length > 0 ? (
            openBids.slice(0, 3).map((bid) => (
              <div
                key={bid.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {bid.companyName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bid.serviceTypes.slice(0, 2).join(", ")}
                      {bid.serviceTypes.length > 2 &&
                        ` +${bid.serviceTypes.length - 2} more`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(bid.urgency)}>
                    {bid.urgency}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleViewBid(bid)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No open bids available
            </p>
          )}

          {openBids.length > 3 && (
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              View All Opportunities
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Simple Bid Detail Modal */}
      {showResponseModal && selectedBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {selectedBid.companyName} - Business Opportunity
                </h2>
                <Button
                  onClick={() => setShowResponseModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Project Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">Industry:</span>{" "}
                      <span className="text-white">{selectedBid.industry}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">Services:</span>{" "}
                      <span className="text-white">
                        {selectedBid.serviceTypes.join(", ")}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Urgency:</span>{" "}
                      <Badge className={getUrgencyColor(selectedBid.urgency)}>
                        {selectedBid.urgency}
                      </Badge>
                    </p>
                    {selectedBid.budget && (
                      <p>
                        <span className="text-gray-400">Budget:</span>{" "}
                        <span className="text-green-400">
                          ${selectedBid.budget}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedBid.description}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowResponseModal(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Close
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                    Submit Proposal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Create Bid Modal Component
function CreateBidModal({
  onClose,
  onSubmit,
  loading,
}: {
  onClose: () => void;
  onSubmit: (formData: any) => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    serviceTypes: [] as string[],
    description: "",
    infrastructureSize: "small",
    urgency: "standard",
    complianceGoals: [] as string[],
    budget: "",
    additionalNotes: "",
    documents: [] as any[],
  });

  const serviceOptions = [
    "Web Application Testing",
    "Network Penetration Testing",
    "Cloud Security Assessment",
    "API Security Testing",
    "Mobile App Testing",
    "Infrastructure Assessment",
    "Compliance Assessment",
    "Social Engineering",
    "Physical Security",
    "DevSecOps",
  ];

  const complianceOptions = [
    "ISO 27001",
    "SOC 2",
    "HIPAA",
    "GDPR",
    "PCI DSS",
    "FedRAMP",
    "NIST",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Post New Business Opportunity
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Healthcare, Finance, Technology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Primary contact person"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://company.com"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Project Details
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Required Services *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2 text-sm text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={formData.serviceTypes.includes(service)}
                        onChange={(e) =>
                          handleArrayChange(
                            "serviceTypes",
                            service,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Describe the security assessment requirements, scope, and any specific concerns..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Infrastructure Size
                  </label>
                  <select
                    value={formData.infrastructureSize}
                    onChange={(e) =>
                      handleInputChange("infrastructureSize", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="small">Small (1-50 assets)</option>
                    <option value="medium">Medium (51-200 assets)</option>
                    <option value="large">Large (201-500 assets)</option>
                    <option value="enterprise">Enterprise (500+ assets)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) =>
                      handleInputChange("urgency", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="standard">Standard (4-6 weeks)</option>
                    <option value="urgent">Urgent (2-3 weeks)</option>
                    <option value="critical">Critical (1 week)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., $10,000 - $25,000"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Requirements */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Compliance Requirements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {complianceOptions.map((compliance) => (
                  <label
                    key={compliance}
                    className="flex items-center space-x-2 text-sm text-gray-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.complianceGoals.includes(compliance)}
                      onChange={(e) =>
                        handleArrayChange(
                          "complianceGoals",
                          compliance,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span>{compliance}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Additional Information
              </h3>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Any additional requirements, constraints, or special considerations..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loading || formData.serviceTypes.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Post Opportunity"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Component for recent packages
function RecentPackagesCard({ packages }: { packages?: PackageType[] }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Package className="mr-2 h-5 w-5 text-orange-500" />
          Recent Packages
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your latest security service engagements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {packages && packages.length > 0 ? (
          packages.slice(0, 5).map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div
                  className={`w-2 h-2 flex-shrink-0 ${
                    pkg.status === "active"
                      ? "bg-green-500"
                      : pkg.status === "upcoming"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } rounded-full`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {pkg.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {pkg.provider?.company_name || "No provider"}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`flex-shrink-0 ${
                  pkg.status === "active"
                    ? "bg-green-500/20 text-green-400"
                    : pkg.status === "upcoming"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">
            No recent packages found
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Component for security insights
function SecurityInsightsCard({ score = 0 }: { score?: number }) {
  const status = score >= 80 ? "excellent" : score > 60 ? "good" : "poor";

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Overall Security Score</span>
            <span className="text-white">{score}%</span>
          </div>
          <Progress value={score} className="h-2 bg-gray-700" />
        </div>

        <div className="space-y-2">
          {status === "excellent" ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-300">
                Excellent Security Posture
              </span>
            </div>
          ) : status === "good" ? (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-300">
                Good Security Posture, some areas to improve
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-300">
                Needs Immediate Attention
              </span>
            </div>
          )}
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
}

// Component for recent activity
function RecentActivityCard({
  packages,
  messages,
}: {
  packages?: PackageType[];
  messages?: Message[];
}) {
  const allActivities = [
    ...(packages?.map((pkg) => ({
      type: "package" as const,
      id: pkg.id,
      title: `${pkg.name} ${pkg.status}`,
      timestamp: pkg.updatedAt,
      status: pkg.status,
    })) || []),
    ...(messages?.map((msg) => ({
      type: "message" as const,
      id: msg.id,
      title: `New message for ${msg.packageId}`,
      timestamp: msg.createdAt,
      status: "message" as const,
    })) || []),
  ]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Clock className="mr-2 h-5 w-5 text-orange-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {allActivities.length > 0 ? (
          allActivities.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="flex items-start space-x-3 text-sm"
            >
              <div
                className={`w-2 h-2 mt-2 flex-shrink-0 rounded-full ${
                  activity.status === "active"
                    ? "bg-green-500"
                    : activity.status === "upcoming"
                    ? "bg-blue-500"
                    : activity.status === "completed"
                    ? "bg-gray-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-white truncate">{activity.title}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No recent activity</p>
        )}
      </CardContent>
    </Card>
  );
}

// Component for upcoming events
function UpcomingEventsCard() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-orange-500" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-center py-8">
          No upcoming events for now.
        </p>
      </CardContent>
    </Card>
  );
}
