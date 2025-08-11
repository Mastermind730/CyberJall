"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
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
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useDashboardStats } from "./hooks/useDashboardStats"

export default function CustomerDashboard() {
  const { data: session } = useSession()
  const { stats, loading, error } = useDashboardStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-white">
        <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-400">Error: {error}. Please try again later.</div>
    )
  }

  const userName = session?.user?.name || "Customer"
  // const userCompanyName = session?.user?.companyName || "Your Company"

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {userName}</h2>
            {/* <p className="text-gray-300">{userCompanyName} • Last login: Just now</p> */}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">{stats?.cyberHealth.score || 0}</div>
            <div className="text-sm text-gray-400">Cyber Health Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.packages.active || 0}</div>
            <p className="text-xs text-gray-400">
              {stats?.packages.upcoming || 0} upcoming, {stats?.packages.completed || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.cyberHealth.score || 0}/100</div>
            <p className="text-xs text-green-400">
              {stats?.cyberHealth.score && stats.cyberHealth.score > 70 ? "Good posture" : "Needs attention"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.tickets.open || 0}</div>
            <p className="text-xs text-gray-400">
              {stats?.tickets.open && stats.tickets.open > 0 ? "Action required" : "All clear"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Unpaid Invoices</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${stats?.invoices.unpaidAmount.toLocaleString() || 0}</div>
            <p className="text-xs text-red-400">
              {stats?.invoices.unpaidAmount && stats.invoices.unpaidAmount > 0 ? "Payment due" : "No outstanding"}
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
            <CardDescription className="text-gray-400">Your latest security service engagements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats?.recentActivity.packages && stats.recentActivity.packages.length > 0 ? (
              stats.recentActivity.packages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 ${pkg.status === "active" ? "bg-green-500" : pkg.status === "upcoming" ? "bg-blue-500" : "bg-gray-500"} rounded-full`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-white">{pkg.name}</p>
                      <p className="text-xs text-gray-400">{pkg.provider?.company_name || "N/A"}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${pkg.status === "active" ? "bg-green-500/20 text-green-400" : pkg.status === "upcoming" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}
                  >
                    {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No recent packages found.</p>
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
            <CardDescription className="text-gray-400">Your cybersecurity health overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall Security Score</span>
                <span className="text-white">{stats?.cyberHealth.score || 0}/100</span>
              </div>
              <Progress value={stats?.cyberHealth.score || 0} className="h-2" />
            </div>

            <div className="space-y-3">
              {stats?.cyberHealth.score && stats.cyberHealth.score > 80 ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-300">Excellent Security Posture</span>
                </div>
              ) : stats?.cyberHealth.score && stats.cyberHealth.score > 60 ? (
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

            <Button className="w-full bg-orange-500 hover:bg-orange-600">View Detailed Report</Button>
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
            {stats?.recentActivity.packages && stats.recentActivity.packages.length > 0 ? (
              stats.recentActivity.packages.map((pkg) => (
                <div key={pkg.id} className="flex items-start space-x-3 text-sm">
                  <div
                    className={`w-2 h-2 ${pkg.status === "active" ? "bg-green-500" : pkg.status === "upcoming" ? "bg-blue-500" : "bg-gray-500"} rounded-full mt-2`}
                  ></div>
                  <div>
                    <p className="text-white">
                      {pkg.name} {pkg.status}
                    </p>
                    <p className="text-gray-400">
                      {new Date(pkg.updatedAt).toLocaleDateString()} at {new Date(pkg.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No recent activity.</p>
            )}
            {stats?.recentActivity.messages && stats.recentActivity.messages.length > 0
              ? stats.recentActivity.messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white">New message from provider for {msg.package.name}</p>
                      <p className="text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
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
            <p className="text-gray-400 text-center py-4">No upcoming events for now.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
