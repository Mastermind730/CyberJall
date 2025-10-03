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
  PauseCircle
} from "lucide-react";
import { useDashboardStats } from "../customer/hooks/useDashboardStats";
import { Message } from "@/lib/types";
import { useState, useEffect } from "react";

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
  status: 'active' | 'in_progress' | 'completed' | 'upcoming' | 'pending';
  customer: {
    id: string;
    company_name: string;
    work_email: string;
  };
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  packageValue?: number;
  description?: string;
}

interface ProviderPackagesData {
  packages: ProviderPackage[];
  stats: {
    all: number;
    ongoing: number;
    completed: number;
    upcoming: number;
  };
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
  const { stats, loading, error, user, company } = useDashboardStats() as DashboardStats;
  const [businessBids, setBusinessBids] = useState<BusinessBid[]>([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [providerPackages, setProviderPackages] = useState<ProviderPackagesData>({
    packages: [],
    stats: { all: 0, ongoing: 0, completed: 0, upcoming: 0 }
  });
  const [packagesLoading, setPackagesLoading] = useState(false);

  // Fetch business bids and provider packages for providers
  useEffect(() => {
    if (user?.role === "provider") {
      fetchBusinessBids();
      fetchProviderPackages();
    }
  }, [user]);

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
        console.error('Failed to fetch provider packages');
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
              Welcome back,{" "}
              {user?.company_name || user.profile?.firstName || "Guest"}
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
              {stats?.cyberHealth.score || 0}%
            </div>
            <div className="text-sm text-gray-400">Cyber Health Score</div>
          </div>
        </div>
      </div>

      {/* Company Information Section (Only for providers) */}
      {user.role === "provider" && company && (
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
              {company.industries_served && company.industries_served.length > 0 && (
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
              {company.geographic_coverage && company.geographic_coverage.length > 0 && (
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
              {company.target_business_size && company.target_business_size.length > 0 && (
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
          value={stats?.packages.active || 0}
          icon={<Package className="h-4 w-4 text-orange-500" />}
          subtitle={`${stats?.packages.upcoming || 0} upcoming, ${
            stats?.packages.completed || 0
          } completed`}
        />

        <StatCard
          title="Security Score"
          value={`${stats?.cyberHealth.score || 0}%`}
          icon={<Shield className="h-4 w-4 text-green-500" />}
          subtitle={`${Math.round(
            (stats?.cyberHealth.score || 0) * 0.12
          )}% increase`}
          trend="positive"
        />

        <StatCard
          title="Open Tickets"
          value={stats?.tickets.open || 0}
          icon={<MessageSquare className="h-4 w-4 text-yellow-500" />}
          subtitle={`${stats?.tickets.resolved || 0} resolved this month`}
        />

        <StatCard
          title={user.role === "provider" ? "Open Bids" : "Unpaid Invoices"}
          value={
            user.role === "provider"
              ? businessBids.filter((bid) => bid.status === "approved").length
              : `$${(stats?.invoices.unpaidAmount || 0).toLocaleString()}`
          }
          icon={
            user.role === "provider" ? (
              <Briefcase className="h-4 w-4 text-blue-500" />
            ) : (
              <FileText className="h-4 w-4 text-red-500" />
            )
          }
          subtitle={
            user.role === "provider"
              ? "New opportunities"
              : stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0
              ? "Payment due"
              : "No outstanding"
          }
          trend={
            user.role === "provider"
              ? "neutral"
              : stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0
              ? "negative"
              : "neutral"
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {user.role === "provider" ? (
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
            <SecurityInsightsCard score={stats?.cyberHealth.score} />
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
  onRefresh 
}: { 
  packagesData: ProviderPackagesData; 
  loading: boolean; 
  onRefresh: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'upcoming':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <PauseCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'in_progress':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'upcoming':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredPackages = packagesData.packages.filter(pkg => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'ongoing') return pkg.status === 'active' || pkg.status === 'in_progress';
    if (selectedTab === 'completed') return pkg.status === 'completed';
    if (selectedTab === 'upcoming') return pkg.status === 'upcoming' || pkg.status === 'pending';
    return true;
  });

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Package className="mr-2 h-5 w-5 text-orange-500" />
              My Packages
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your active client engagements
            </CardDescription>
          </div>
          <Button
            onClick={onRefresh}
            size="sm"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      {/* Package Stats */}
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedTab === 'all' 
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="text-lg font-bold">{packagesData.stats.all}</div>
            <div className="text-xs">All</div>
          </button>
          <button
            onClick={() => setSelectedTab('ongoing')}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedTab === 'ongoing' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="text-lg font-bold">{packagesData.stats.ongoing}</div>
            <div className="text-xs">Ongoing</div>
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedTab === 'completed' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="text-lg font-bold">{packagesData.stats.completed}</div>
            <div className="text-xs">Completed</div>
          </button>
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedTab === 'upcoming' 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="text-lg font-bold">{packagesData.stats.upcoming}</div>
            <div className="text-xs">Upcoming</div>
          </button>
        </div>

        {/* Packages List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
          ) : filteredPackages.length > 0 ? (
            filteredPackages.slice(0, 6).map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    {getStatusIcon(pkg.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {pkg.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {pkg.customer.company_name}
                    </p>
                    {pkg.packageValue && (
                      <p className="text-xs text-green-400">
                        ${pkg.packageValue.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getStatusColor(pkg.status)}`}>
                    {pkg.status.replace('_', ' ')}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No packages found for &quot;{selectedTab}&quot;
            </p>
          )}
        </div>

        {filteredPackages.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              View All Packages
            </Button>
          </div>
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
  const [responseForm, setResponseForm] = useState({
    proposal: "",
    estimatedCost: "",
    timeline: "",
    additionalNotes: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmitResponse = async () => {
    if (
      !selectedBid ||
      !responseForm.proposal ||
      !responseForm.estimatedCost ||
      !responseForm.timeline
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/bids/${selectedBid.id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseForm),
      });

      if (response.ok) {
        setShowResponseModal(false);
        setSelectedBid(null);
        setResponseForm({
          proposal: "",
          estimatedCost: "",
          timeline: "",
          additionalNotes: "",
        });
        onRefresh();
        alert("Response submitted successfully!");
      } else {
        throw new Error("Failed to submit response");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Failed to submit response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-orange-500" />
                Business Bids
              </CardTitle>
              <CardDescription className="text-gray-400">
                New opportunities waiting for your response
              </CardDescription>
            </div>
            <Button
              onClick={onRefresh}
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
          ) : openBids.length > 0 ? (
            openBids.slice(0, 5).map((bid) => (
              <div
                key={bid.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    <Building className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {bid.companyName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {bid.serviceTypes.slice(0, 2).join(", ")}
                      {bid.serviceTypes.length > 2 &&
                        ` +${bid.serviceTypes.length - 2} more`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`text-xs ${getUrgencyColor(bid.urgency)}`}
                      >
                        {bid.urgency}
                      </Badge>
                      {bid.budget && (
                        <span className="text-xs text-green-400">
                          ${bid.budget}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleViewBid(bid)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No open bids available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Bid Detail Modal */}
      {showResponseModal && selectedBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Bid Request - {selectedBid.companyName}
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bid Details */}
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">
                      Company Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-400">Company:</span>
                        <span className="text-white ml-2">
                          {selectedBid.companyName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-400">Industry:</span>
                        <span className="text-white ml-2">
                          {selectedBid.industry}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white ml-2">
                          {selectedBid.infrastructureSize}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-400">Urgency:</span>
                        <Badge
                          className={`ml-2 ${getUrgencyColor(
                            selectedBid.urgency
                          )}`}
                        >
                          {selectedBid.urgency}
                        </Badge>
                      </div>
                      {selectedBid.budget && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-400">Budget:</span>
                          <span className="text-green-400 ml-2">
                            ${selectedBid.budget}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">
                      Required Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBid.serviceTypes.map((service, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-700 text-white"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedBid.complianceGoals.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-3">
                        Compliance Requirements
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBid.complianceGoals.map((goal, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-700 text-white"
                          >
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">
                      Project Description
                    </h3>
                    <p className="text-gray-300 text-sm whitespace-pre-line">
                      {selectedBid.description}
                    </p>
                    {selectedBid.additionalNotes && (
                      <>
                        <h4 className="text-white font-medium mt-4 mb-2">
                          Additional Notes
                        </h4>
                        <p className="text-gray-300 text-sm whitespace-pre-line">
                          {selectedBid.additionalNotes}
                        </p>
                      </>
                    )}
                  </div>

                  {selectedBid.documents.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-3">
                        Documents
                      </h3>
                      <div className="space-y-2">
                        {selectedBid.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-700 p-2 rounded"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm text-white">{doc.name}</p>
                                <p className="text-xs text-gray-400">
                                  {formatFileSize(doc.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(doc.url, "_blank")}
                              className="text-orange-400 hover:text-orange-300"
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Form */}
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Submit Your Response
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Proposal Description *
                        </label>
                        <textarea
                          value={responseForm.proposal}
                          onChange={(e) =>
                            setResponseForm({
                              ...responseForm,
                              proposal: e.target.value,
                            })
                          }
                          placeholder="Describe your approach, methodology, and what makes your solution unique..."
                          className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Estimated Cost (USD) *
                          </label>
                          <input
                            type="number"
                            value={responseForm.estimatedCost}
                            onChange={(e) =>
                              setResponseForm({
                                ...responseForm,
                                estimatedCost: e.target.value,
                              })
                            }
                            placeholder="50000"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Timeline *
                          </label>
                          <input
                            type="text"
                            value={responseForm.timeline}
                            onChange={(e) =>
                              setResponseForm({
                                ...responseForm,
                                timeline: e.target.value,
                              })
                            }
                            placeholder="4-6 weeks"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          value={responseForm.additionalNotes}
                          onChange={(e) =>
                            setResponseForm({
                              ...responseForm,
                              additionalNotes: e.target.value,
                            })
                          }
                          placeholder="Any additional information, terms, or conditions..."
                          className="w-full h-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => setShowResponseModal(false)}
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSubmitResponse}
                          disabled={submitting}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Submit Response
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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