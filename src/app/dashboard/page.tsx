/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
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
} from "lucide-react";

interface User {
  id: string;
  work_email: string;
  company_name: string;
  contact: string;
  message: string;
  password: string;
  role: "customer" | "provider" | "admin";
  profile?: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    phone?: string;
    avatar?: string;
    lastLogin?: string;
  };
}

interface Company {
  id: string;
  company_name: string;
  logo: string;
  overview: string;
  year_founded: number;
  headquarters_city: string;
  headquarters_country: string;
  industries_served: string[];
  target_business_size: string[];
  geographic_coverage: string[];
  team_size: string;
  services_offered: Record<string, unknown>;
  expertise_and_certifications: Record<string, unknown>;
  case_studies: Record<string, unknown>;
  client_reviews: Record<string, unknown>;
  social_links: Record<string, unknown>;
  website: string;
  products: Record<string, unknown>;
}

interface Package {
  id: number;
  name: string;
  status: "active" | "upcoming" | "completed";
  provider?: {
    company_name: string;
  };
  updatedAt: string;
  createdAt?: string;
}

interface Message {
  id: number;
  package: {
    name: string;
  };
  createdAt: string;
}

interface DashboardStats {
  packages: {
    active: number;
    upcoming: number;
    completed: number;
    total: number;
  };
  invoices: {
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    count: number;
  };
  tickets: {
    open: number;
    resolved: number;
  };
  cyberHealth: {
    score: number;
    status?: string;
    lastScan?: string;
  };
  recentActivity: {
    packages: Package[];
    messages: Message[];
  };
}

// Import the hook from the customer hooks directory
import { useDashboardStats } from "../customer/hooks/useDashboardStats";

export default function Dashboard() {
  const { stats, loading, error, user, company } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen bg-black p-6 md:p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user?.company_name || "Guest"}
            </h2>
            <p className="text-gray-300">
              {user?.work_email || "Login to access your account"} • Last login:
              2 hours ago
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">
              {stats?.cyberHealth.score || 0}
            </div>
            <div className="text-sm text-gray-400">Cyber Health Score</div>
          </div>
        </div>
      </div>

      {/* Company Information Section (Only for providers) */}
      {user?.role === "provider" && company && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center space-x-4">
              {company.logo && (
                <Image
                  src={company.logo}
                  alt="Company Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-lg"
                />
              )}
              <div>
                <CardTitle className="text-xl text-white">
                  {company.company_name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {company.overview}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">
                  Company Details
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-white">Founded: {company.year_founded}</p>
                  <p className="text-white">
                    Location: {company.headquarters_city},{" "}
                    {company.headquarters_country}
                  </p>
                  <p className="text-white">Team Size: {company.team_size}</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">
                  Industries Served
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {company.industries_served.map(
                    (industry: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800 text-white"
                      >
                        {industry}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Coverage</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {company.geographic_coverage.map(
                      (region: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-800 text-white"
                        >
                          {region}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">
                  Target Business Size
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {company.target_business_size.map(
                    (size: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800 text-white"
                      >
                        {size}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Packages
            </CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.packages.active || 0}
            </div>
            <p className="text-xs text-gray-400">
              {stats?.packages.upcoming || 0} upcoming,{" "}
              {stats?.packages.completed || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.cyberHealth.score || 0}%
            </div>
            <p className="text-xs text-green-400">
              {Math.round((stats?.cyberHealth.score || 0) * 0.12)}% increase
            </p>
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
            <div className="text-2xl font-bold text-white">
              {stats?.tickets.open || 0}
            </div>
            <p className="text-xs text-gray-400">
              {stats?.tickets.resolved || 0} resolved this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Unpaid Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats?.invoices.unpaidAmount?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-red-400">
              {stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0
                ? "Payment due"
                : "No outstanding"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Packages */}
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
          <CardContent className="space-y-4">
            {stats?.recentActivity.packages &&
            stats.recentActivity.packages.length > 0 ? (
              stats.recentActivity.packages.map((pkg: Package) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 ${
                        pkg.status === "active"
                          ? "bg-green-500"
                          : pkg.status === "upcoming"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      } rounded-full`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {pkg.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {pkg.provider?.company_name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
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
              <p className="text-gray-400 text-center py-4">
                No recent packages found.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Security Insights */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
              Security Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall Security Score</span>
                <span className="text-white">
                  {stats?.cyberHealth.score || 0}%
                </span>
              </div>
              <Progress value={stats?.cyberHealth.score || 0} className="h-2" />
            </div>

            <div className="space-y-2">
              {stats?.cyberHealth.score && stats.cyberHealth.score >= 80 ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-300">
                    Excellent Security Posture
                  </span>
                </div>
              ) : stats?.cyberHealth.score && stats.cyberHealth.score > 60 ? (
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
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-orange-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.recentActivity.packages &&
            stats.recentActivity.packages.length > 0 ? (
              stats.recentActivity.packages.map((pkg: Package) => (
                <div
                  key={pkg.id}
                  className="flex items-start space-x-3 text-sm"
                >
                  <div
                    className={`w-2 h-2 ${
                      pkg.status === "active"
                        ? "bg-green-500"
                        : pkg.status === "upcoming"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    } rounded-full mt-2`}
                  ></div>
                  <div>
                    <p className="text-white">
                      {pkg.name} {pkg.status}
                    </p>
                    <p className="text-gray-400">
                      {new Date(pkg.updatedAt).toLocaleDateString()} at{" "}
                      {new Date(pkg.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">
                No recent activity.
              </p>
            )}
            {stats?.recentActivity.messages &&
            stats.recentActivity.messages.length > 0
              ? stats.recentActivity.messages.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white">
                        New message from provider for {msg.package.name}
                      </p>
                      <p className="text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString()} at{" "}
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-orange-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-400 text-center py-4">
              No upcoming events for now.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
