"use client";

import { useUser } from "../../hooks/useUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
// import { Progress } from "@/components/ui/progress"
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
} from "lucide-react";
import { Progress } from "@radix-ui/react-progress";

export default function CustomerDashboard() {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user.name || user.email}
            </h2>
            <p className="text-gray-300">
              {user.company_name || "Customer"} • Role: {user.role}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">85</div>
            <div className="text-sm text-gray-400">Cyber Health Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Packages
            </CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-gray-400">2 ongoing, 1 scheduled</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85/100</div>
            <p className="text-xs text-green-400">+5 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Open Tickets
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-gray-400">1 high priority</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Pending Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$12,500</div>
            <p className="text-xs text-red-400">Due in 5 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Packages */}
        <Card className="bg-black border-gray-800">
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
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Penetration Testing
                  </p>
                  <p className="text-xs text-gray-400">SecureGuard Solutions</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Security Audit
                  </p>
                  <p className="text-xs text-gray-400">CyberShield Inc.</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-500/20 text-blue-400"
              >
                Upcoming
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Vulnerability Assessment
                  </p>
                  <p className="text-xs text-gray-400">DefenseFirst</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-gray-500/20 text-gray-400"
              >
                Completed
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security Insights */}
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
              Security Insights
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your cybersecurity health overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall Security Score</span>
                <span className="text-white">85/100</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-300">
                  Network Security: Strong
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-300">
                  Email Security: Needs Attention
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-300">
                  Access Control: Excellent
                </span>
              </div>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-orange-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">Penetration test completed</p>
                <p className="text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">New message from SecureGuard</p>
                <p className="text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">Invoice #INV-2024-001 generated</p>
                <p className="text-gray-400">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-orange-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">Security Audit Kickoff</p>
                <p className="text-gray-400">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">Cybersecurity Webinar</p>
                <p className="text-gray-400">Jan 15, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white">Quarterly Review Meeting</p>
                <p className="text-gray-400">Jan 20, 3:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
