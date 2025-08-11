/* eslint-disable @typescript-eslint/no-unused-vars */
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
  DialogClose,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Calendar, CheckCircle, MessageSquare, Download, Plus, Shield, Loader2, Info } from "lucide-react"
import { usePackages } from "../hooks/usePackages"
import type { Package as PackageType } from "@/lib/types"

export default function PackagesPage() {
  const {
    packages: activePackages,
    loading: loadingActive,
    error: errorActive,
    refetch: refetchActive,
  } = usePackages("active")
  const {
    packages: upcomingPackages,
    loading: loadingUpcoming,
    error: errorUpcoming,
    refetch: refetchUpcoming,
  } = usePackages("upcoming")
  const {
    packages: completedPackages,
    loading: loadingCompleted,
    error: errorCompleted,
    refetch: refetchCompleted,
  } = usePackages("completed")
  const { createPackage } = usePackages() // For creating new packages

  const [newPackageName, setNewPackageName] = useState("")
  const [newPackageDescription, setNewPackageDescription] = useState("")
  const [newPackageServices, setNewPackageServices] = useState<string[]>([])
  const [newPackageProvider, setNewPackageProvider] = useState("")
  const [newPackageAmount, setNewPackageAmount] = useState("")
  const [newPackageStartDate, setNewPackageStartDate] = useState("")
  const [newPackageEndDate, setNewPackageEndDate] = useState("")
  const [isRequestingPackage, setIsRequestingPackage] = useState(false)

  const handleRequestNewPackage = async () => {
    setIsRequestingPackage(true)
    try {
      await createPackage({
        name: newPackageName,
        description: newPackageDescription,
        services: newPackageServices,
        providerId: newPackageProvider, // This would need to be a valid provider ID from your DB
        totalAmount: Number.parseFloat(newPackageAmount),
        startDate: newPackageStartDate ? new Date(newPackageStartDate) : undefined,
        endDate: newPackageEndDate ? new Date(newPackageEndDate) : undefined,
      })
      alert("Package request submitted successfully!")
      setNewPackageName("")
      setNewPackageDescription("")
      setNewPackageServices([])
      setNewPackageProvider("")
      setNewPackageAmount("")
      setNewPackageStartDate("")
      setNewPackageEndDate("")
      refetchActive()
      refetchUpcoming()
    } catch (err) {
      console.error("Failed to request new package:", err)
      alert("Failed to request new package. Please try again.")
    } finally {
      setIsRequestingPackage(false)
    }
  }

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

  const PackageCard = ({ pkg, showProgress = false }: { pkg: PackageType; showProgress?: boolean }) => (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white flex items-center">
              <Shield className="mr-2 h-5 w-5 text-orange-500" />
              {pkg.name}
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">{pkg.provider?.company_name || "N/A"}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getStatusColor(pkg.status)}>
              {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
            </Badge>
            {/* Assuming unread messages count is part of the package object from API */}
            {/* {pkg.unreadMessages > 0 && (
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                {pkg.unreadMessages} new
              </Badge>
            )} */}
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

        {showProgress && pkg.status === "active" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Progress</span>
              {/* Placeholder for progress, as it's not in the schema */}
              <span className="text-white">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {pkg.startDate ? new Date(pkg.startDate).toLocaleDateString() : "N/A"} -{" "}
                {pkg.endDate ? new Date(pkg.endDate).toLocaleDateString() : "N/A"}
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
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">{pkg.name}</DialogTitle>
                <DialogDescription className="text-gray-400">{pkg.provider?.company_name || "N/A"}</DialogDescription>
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
                      {pkg.status === "active" && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Progress:</span>
                          <span className="text-white">75%</span> {/* Placeholder */}
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
                  {pkg.reports && pkg.reports.length > 0 && (
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

  const renderContent = (packages: PackageType[], loading: boolean, error: string | null) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-48 text-white">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading packages...
        </div>
      )
    }

    if (error) {
      return <div className="flex items-center justify-center h-48 text-red-400">Error: {error}. Please try again.</div>
    }

    if (packages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <Info className="h-8 w-8 mb-2" />
          <p>No packages found in this category.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} showProgress={pkg.status === "active"} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Packages</h1>
          <p className="text-gray-400">Manage your security service engagements</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Request New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Request a New Custom Security Package</DialogTitle>
              <DialogDescription className="text-gray-400">
                Fill out the details below to request a new service package.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="packageName" className="text-gray-300">
                  Package Name
                </Label>
                <Input
                  id="packageName"
                  value={newPackageName}
                  onChange={(e) => setNewPackageName(e.target.value)}
                  placeholder="e.g., Annual Security Audit"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageDescription" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="packageDescription"
                  value={newPackageDescription}
                  onChange={(e) => setNewPackageDescription(e.target.value)}
                  placeholder="Describe your security needs and requirements."
                  className="bg-gray-800 border-gray-700 text-white min-h-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageServices" className="text-gray-300">
                  Desired Services (comma-separated)
                </Label>
                <Input
                  id="packageServices"
                  value={newPackageServices.join(", ")}
                  onChange={(e) => setNewPackageServices(e.target.value.split(",").map((s) => s.trim()))}
                  placeholder="e.g., Penetration Testing, Compliance Audit"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="packageAmount" className="text-gray-300">
                    Estimated Budget ($)
                  </Label>
                  <Input
                    id="packageAmount"
                    type="number"
                    value={newPackageAmount}
                    onChange={(e) => setNewPackageAmount(e.target.value)}
                    placeholder="e.g., 10000"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageProvider" className="text-gray-300">
                    Preferred Provider (Optional)
                  </Label>
                  <Input
                    id="packageProvider"
                    value={newPackageProvider}
                    onChange={(e) => setNewPackageProvider(e.target.value)}
                    placeholder="e.g., SecureGuard Solutions"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-300">
                    Preferred Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newPackageStartDate}
                    onChange={(e) => setNewPackageStartDate(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-gray-300">
                    Preferred End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newPackageEndDate}
                    onChange={(e) => setNewPackageEndDate(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline" className="border-gray-700 bg-transparent">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleRequestNewPackage}
                  disabled={isRequestingPackage}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isRequestingPackage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold text-white">{activePackages.length}</p>
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
                <p className="text-2xl font-bold text-white">{upcomingPackages.length}</p>
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
                <p className="text-2xl font-bold text-white">{completedPackages.length}</p>
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
                <p className="text-2xl font-bold text-white">0</p> {/* Placeholder for unread messages */}
                <p className="text-xs text-gray-400">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="active" className="data-[state=active]:bg-orange-500">
            Active Packages ({activePackages.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-orange-500">
            Upcoming Services ({upcomingPackages.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-orange-500">
            Completed Services ({completedPackages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {renderContent(activePackages, loadingActive, errorActive)}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {renderContent(upcomingPackages, loadingUpcoming, errorUpcoming)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {renderContent(completedPackages, loadingCompleted, errorCompleted)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
