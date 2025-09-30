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
} from "lucide-react";
import { useDashboardStats } from "../customer/hooks/useDashboardStats";
import { Message } from "@/lib/types";
export default function Dashboard() {
  const { stats, loading, error, user, company } = useDashboardStats();

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
          <p className="text-gray-300 text-lg mb-4">Please log in to access the dashboard</p>
          <Button 
            onClick={() => window.location.href = '/login'}
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
              Welcome back, {user?.company_name || user.profile?.firstName || "Guest"}
            </h2>
            <p className="text-gray-300">
              {user.work_email} • Last login: {user.profile?.lastLogin ? new Date(user.profile.lastLogin).toLocaleDateString() : "Recently"}
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
                    Location: {company.headquarters_city}, {company.headquarters_country}
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
              {company.industries_served?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Industries Served
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {company.industries_served.slice(0, 4).map((industry, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800 text-white text-xs"
                      >
                        {industry}
                      </Badge>
                    ))}
                    {company.industries_served.length > 4 && (
                      <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                        +{company.industries_served.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {company.geographic_coverage?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Coverage
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {company.geographic_coverage.slice(0, 3).map((region, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-800 text-white text-xs"
                      >
                        {region}
                      </Badge>
                    ))}
                    {company.geographic_coverage.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                        +{company.geographic_coverage.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              {company.target_business_size?.length > 0 && (
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
          subtitle={`${stats?.packages.upcoming || 0} upcoming, ${stats?.packages.completed || 0} completed`}
        />
        
        <StatCard
          title="Security Score"
          value={`${stats?.cyberHealth.score || 0}%`}
          icon={<Shield className="h-4 w-4 text-green-500" />}
          subtitle={`${Math.round((stats?.cyberHealth.score || 0) * 0.12)}% increase`}
          trend="positive"
        />
        
        <StatCard
          title="Open Tickets"
          value={stats?.tickets.open || 0}
          icon={<MessageSquare className="h-4 w-4 text-yellow-500" />}
          subtitle={`${stats?.tickets.resolved || 0} resolved this month`}
        />
        
        <StatCard
          title="Unpaid Invoices"
          value={`$${(stats?.invoices.unpaidAmount || 0).toLocaleString()}`}
          icon={<FileText className="h-4 w-4 text-red-500" />}
          subtitle={stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0 ? "Payment due" : "No outstanding"}
          trend={stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0 ? "negative" : "neutral"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPackagesCard packages={stats?.recentActivity.packages} />
        <SecurityInsightsCard score={stats?.cyberHealth.score} />
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
function StatCard({ title, value, icon, subtitle, trend = "neutral" }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  trend?: "positive" | "negative" | "neutral";
}) {
  const trendColor = trend === "positive" ? "text-green-400" : trend === "negative" ? "text-red-400" : "text-gray-400";
  
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {value}
        </div>
        <p className={`text-xs ${trendColor} mt-1`}>
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
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

// Component for recent packages
function RecentPackagesCard({ packages }: { packages?:  PackageType[] }) {
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
              <span className="text-sm text-gray-300">Excellent Security Posture</span>
            </div>
          ) : status === "good" ? (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-300">Good Security Posture, some areas to improve</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-300">Needs Immediate Attention</span>
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
function RecentActivityCard({ packages, messages }: { packages?: PackageType[]; messages?: Message[] }) {
  const allActivities = [
    ...(packages?.map(pkg => ({
      type: 'package' as const,
      id: pkg.id,
      title: `${pkg.name} ${pkg.status}`,
      timestamp: pkg.updatedAt,
      status: pkg.status
    })) || []),
    ...(messages?.map(msg => ({
      type: 'message' as const,
      id: msg.id,
      title: `New message for ${msg.package.name}`,
      timestamp: msg.createdAt,
      status: 'message' as const
    })) || [])
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
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
            <div key={`${activity.type}-${activity.id}`} className="flex items-start space-x-3 text-sm">
              <div
                className={`w-2 h-2 mt-2 flex-shrink-0 rounded-full ${
                  activity.status === 'active' ? 'bg-green-500' :
                  activity.status === 'upcoming' ? 'bg-blue-500' :
                  activity.status === 'completed' ? 'bg-gray-500' :
                  'bg-blue-500'
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-white truncate">{activity.title}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(activity.timestamp).toLocaleDateString()} at{' '}
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