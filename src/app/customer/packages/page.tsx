"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Progress } from "@/app/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Calendar, CheckCircle, MessageSquare, Download, Plus, Shield } from "lucide-react"

const packages = {
  active: [
    {
      id: 1,
      name: "Penetration Testing",
      provider: "SecureGuard Solutions",
      status: "active",
      progress: 75,
      startDate: "2024-01-01",
      endDate: "2024-02-15",
      services: ["Network Testing", "Web App Testing", "Social Engineering"],
      totalAmount: 15000,
      unreadMessages: 3,
    },
    {
      id: 2,
      name: "Compliance Audit",
      provider: "CyberShield Inc.",
      status: "active",
      progress: 45,
      startDate: "2024-01-10",
      endDate: "2024-03-10",
      services: ["SOC 2 Audit", "GDPR Compliance", "Risk Assessment"],
      totalAmount: 25000,
      unreadMessages: 1,
    },
  ],
  upcoming: [
    {
      id: 3,
      name: "Security Awareness Training",
      provider: "DefenseFirst",
      status: "upcoming",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      services: ["Employee Training", "Phishing Simulation", "Security Policies"],
      totalAmount: 8000,
      unreadMessages: 0,
    },
  ],
  completed: [
    {
      id: 4,
      name: "Vulnerability Assessment",
      provider: "SecureGuard Solutions",
      status: "completed",
      completedDate: "2023-12-15",
      services: ["Network Scan", "Web App Scan", "Infrastructure Review"],
      totalAmount: 12000,
      summary: "Identified 15 vulnerabilities, 12 resolved, 3 low-priority remaining",
      reportUrl: "/reports/vuln-assessment-2023.pdf",
    },
  ],
}

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "upcoming":
        return "bg-blue-500/20 text-blue-400"
      case "completed":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const PackageCard = ({ pkg, showProgress = false }: { pkg: any; showProgress?: boolean }) => (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white flex items-center">
              <Shield className="mr-2 h-5 w-5 text-orange-500" />
              {pkg.name}
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">{pkg.provider}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getStatusColor(pkg.status)}>
              {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
            </Badge>
            {pkg.unreadMessages > 0 && (
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                {pkg.unreadMessages} new
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {pkg.services.map((service: string, index: number) => (
            <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
              {service}
            </Badge>
          ))}
        </div>

        {showProgress && pkg.progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Progress</span>
              <span className="text-white">{pkg.progress}%</span>
            </div>
            <Progress value={pkg.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {pkg.startDate} - {pkg.endDate || pkg.completedDate}
              </span>
            </div>
          </div>
          <div className="text-white font-semibold">${pkg.totalAmount.toLocaleString()}</div>
        </div>

        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:text-white bg-transparent"
                onClick={() => setSelectedPackage(pkg)}
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">{pkg.name}</DialogTitle>
                <DialogDescription className="text-gray-400">{pkg.provider}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Services Included</h4>
                    <div className="space-y-1">
                      {pkg.services.map((service: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Package Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge variant="secondary" className={getStatusColor(pkg.status)}>
                          {pkg.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Amount:</span>
                        <span className="text-white">${pkg.totalAmount.toLocaleString()}</span>
                      </div>
                      {pkg.progress && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Progress:</span>
                          <span className="text-white">{pkg.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {pkg.summary && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Summary</h4>
                    <p className="text-sm text-gray-400">{pkg.summary}</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Provider
                  </Button>
                  {pkg.reportUrl && (
                    <Button variant="outline" className="border-gray-700 bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Packages</h1>
          <p className="text-gray-400">Manage your security service engagements</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" />
          Request New Package
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-white">{packages.active.length}</p>
                <p className="text-xs text-gray-400">Active Packages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-white">{packages.upcoming.length}</p>
                <p className="text-xs text-gray-400">Upcoming Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-white">{packages.completed.length}</p>
                <p className="text-xs text-gray-400">Completed Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-xs text-gray-400">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="active" className="data-[state=active]:bg-orange-500">
            Active Packages ({packages.active.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-orange-500">
            Upcoming Services ({packages.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-orange-500">
            Completed Services ({packages.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {packages.active.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} showProgress={true} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {packages.upcoming.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {packages.completed.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
