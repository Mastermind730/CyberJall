"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Package,
  Shield,
  MessageSquare,
  Briefcase,
  Loader2,
  AlertTriangle,
  Building,
  Plus,
  TrendingUp,
  Users,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

// Types
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

interface BusinessBid {
  id: string;
  companyName: string;
  industry: string;
  serviceTypes: string[];
  description: string;
  urgency: "standard" | "urgent" | "critical";
  status: "approved" | "pending_review" | "closed";
  createdAt: string;
}

interface ProviderPackage {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "cancelled";
  totalAmount: number;
  clientCompany?: string;
  createdAt: string;
}

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [hasCompany, setHasCompany] = useState(false);
  const [businessBids, setBusinessBids] = useState<BusinessBid[]>([]);
  const [packages, setPackages] = useState<ProviderPackage[]>([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user?.role === "provider") {
      checkCompanyExists();
    }
  }, [user]);

  useEffect(() => {
    if (hasCompany) {
      fetchBusinessBids();
      fetchProviderPackages();
    }
  }, [hasCompany]);

  const loadUserData = async () => {
    try {
      // Simulate loading user data - replace with actual API call
      const userData = {
        role: "provider",
        work_email: "provider@example.com",
        profile: {
          firstName: "Provider",
          lastLogin: new Date().toISOString(),
        },
      };
      setUser(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkCompanyExists = async () => {
    try {
      const response = await fetch("/api/getCompany");
      if (response.ok) {
        const data = await response.json();
        setHasCompany(!!data.company);
        setCompany(data.company);
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
      const response = await fetch("/api/provider/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg mb-4">
            Please log in to access the dashboard
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const activePackages = packages.filter(
    (pkg) => pkg.status === "active"
  ).length;
  const completedPackages = packages.filter(
    (pkg) => pkg.status === "completed"
  ).length;
  const approvedBids = businessBids.filter(
    (bid) => bid.status === "approved"
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user.profile?.firstName || "Provider"}
            </h2>
            <p className="text-gray-300">
              {user.work_email} • Last login:{" "}
              {user.profile?.lastLogin
                ? new Date(user.profile.lastLogin).toLocaleDateString()
                : "Recently"}
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-3xl font-bold text-orange-500">85%</div>
            <div className="text-sm text-gray-400">Business Health Score</div>
          </div>
        </div>
      </div>

      {/* Provider Company Setup Section */}
      {!hasCompany && (
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

      {/* Company Information Section */}
      {company && hasCompany && (
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
                      className="text-orange-500 hover:text-orange-400 text-sm flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
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
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Projects
            </CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activePackages}
            </div>
            <p className="text-xs text-gray-400">
              {completedPackages} completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Business Score
            </CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85%</div>
            <p className="text-xs text-green-400">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Open Tickets
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-gray-400">12 resolved this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Open Bids
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{approvedBids}</div>
            <p className="text-xs text-gray-400">New opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Provider Packages and Business Bids */}
      {hasCompany && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Provider Packages */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Package className="mr-2 h-5 w-5 text-orange-500" />
                  My Projects
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchProviderPackages}
                  disabled={packagesLoading}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {packagesLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {packagesLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500 mx-auto" />
                </div>
              ) : packages.length > 0 ? (
                packages.slice(0, 3).map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {pkg.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {pkg.clientCompany || "Client"} • $
                        {pkg.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        pkg.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : pkg.status === "completed"
                          ? "bg-gray-500/20 text-gray-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {pkg.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No projects found.
                </p>
              )}
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => router.push("/provider/packages")}
              >
                View All Projects
              </Button>
            </CardContent>
          </Card>

          {/* Business Bids */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-orange-500" />
                  Business Opportunities
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchBusinessBids}
                    disabled={bidsLoading}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    {bidsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Refresh"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => router.push("/bid/create")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Post
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {bidsLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500 mx-auto" />
                </div>
              ) : businessBids.length > 0 ? (
                businessBids.slice(0, 3).map((bid) => (
                  <div
                    key={bid.id}
                    className="p-3 bg-gray-800 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">
                        {bid.companyName}
                      </h4>
                      <Badge
                        variant="secondary"
                        className={`${
                          bid.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : bid.status === "pending_review"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {bid.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {bid.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {bid.industry}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          bid.urgency === "critical"
                            ? "bg-red-500/20 text-red-400"
                            : bid.urgency === "urgent"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {bid.urgency}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No business bids available.
                </p>
              )}
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => router.push("/provider/bids")}
              >
                View All Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
