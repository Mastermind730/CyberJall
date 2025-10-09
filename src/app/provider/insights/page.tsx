"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
} from "lucide-react";

export default function ProviderInsights() {
  const [timeRange, setTimeRange] = useState("last30days");

  // Mock data - replace with actual API calls
  const businessMetrics = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6,
    },
    projects: {
      active: 8,
      completed: 15,
      pending: 3,
    },
    clients: {
      total: 24,
      new: 5,
      retention: 92.3,
    },
    performance: {
      responseRate: 94.2,
      completionRate: 98.5,
      satisfaction: 4.8,
    },
  };

  const recentProjects = [
    {
      id: 1,
      name: "Security Assessment for TechCorp",
      client: "TechCorp Inc.",
      value: 25000,
      status: "completed",
      completion: 100,
      rating: 5,
    },
    {
      id: 2,
      name: "Penetration Testing for StartupX",
      client: "StartupX Ltd.",
      value: 15000,
      status: "active",
      completion: 75,
      rating: null,
    },
    {
      id: 3,
      name: "Compliance Audit for FinanceGo",
      client: "FinanceGo",
      value: 35000,
      status: "active",
      completion: 60,
      rating: null,
    },
  ];

  const industryDistribution = [
    { name: "Financial Services", percentage: 35, count: 8 },
    { name: "Healthcare", percentage: 25, count: 6 },
    { name: "Technology", percentage: 20, count: 5 },
    { name: "Retail", percentage: 12, count: 3 },
    { name: "Manufacturing", percentage: 8, count: 2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "active":
        return "bg-blue-500/20 text-blue-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">CyberJall Insights</h1>
          <p className="text-gray-400">
            Track your business performance and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(businessMetrics.revenue.current)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 text-xs">
                    +{businessMetrics.revenue.growth}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">
                  {businessMetrics.projects.active}
                </p>
                <p className="text-gray-400 text-xs">
                  {businessMetrics.projects.completed} completed
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Clients</p>
                <p className="text-2xl font-bold text-white">
                  {businessMetrics.clients.total}
                </p>
                <p className="text-green-400 text-xs">
                  {businessMetrics.clients.retention}% retention
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Satisfaction</p>
                <p className="text-2xl font-bold text-white">
                  {businessMetrics.performance.satisfaction}/5.0
                </p>
                <p className="text-yellow-400 text-xs">
                  {businessMetrics.performance.completionRate}% completion
                </p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Recent Projects
            </CardTitle>
            <CardDescription className="text-gray-400">
              Performance overview of your latest projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-gray-800/50 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium text-sm">
                    {project.name}
                  </h4>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(project.status)}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{project.client}</span>
                  <span className="text-white font-medium">
                    {formatCurrency(project.value)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{project.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
                {project.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < project.rating!
                            ? "text-yellow-500"
                            : "text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-gray-400 text-xs ml-1">
                      {project.rating}/5
                    </span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Industry Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Client Industries
            </CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of your clients by industry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {industryDistribution.map((industry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{industry.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">
                      {industry.count} clients
                    </span>
                    <span className="text-white font-medium">
                      {industry.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${industry.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {businessMetrics.performance.responseRate}%
              </div>
              <p className="text-gray-400 text-sm">
                How quickly you respond to new opportunities
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${businessMetrics.performance.responseRate}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <LineChart className="mr-2 h-5 w-5" />
              Project Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {businessMetrics.performance.completionRate}%
              </div>
              <p className="text-gray-400 text-sm">
                Projects completed on time and within scope
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${businessMetrics.performance.completionRate}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Client Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {businessMetrics.performance.satisfaction}/5.0
              </div>
              <p className="text-gray-400 text-sm">
                Average rating from completed projects
              </p>
              <div className="mt-4 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(businessMetrics.performance.satisfaction)
                        ? "text-yellow-500"
                        : "text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trends */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Growth Trends
          </CardTitle>
          <CardDescription className="text-gray-400">
            Key performance indicators over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                +{businessMetrics.revenue.growth}%
              </div>
              <p className="text-gray-400 text-sm">Revenue Growth</p>
              <p className="text-xs text-gray-500 mt-1">vs previous period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                +{businessMetrics.clients.new}
              </div>
              <p className="text-gray-400 text-sm">New Clients</p>
              <p className="text-xs text-gray-500 mt-1">this period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {businessMetrics.projects.active}
              </div>
              <p className="text-gray-400 text-sm">Active Projects</p>
              <p className="text-xs text-gray-500 mt-1">currently running</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {businessMetrics.clients.retention}%
              </div>
              <p className="text-gray-400 text-sm">Client Retention</p>
              <p className="text-xs text-gray-500 mt-1">repeat customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
