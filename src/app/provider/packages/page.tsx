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
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Package,
  Search,
  Filter,
  Loader2,
  DollarSign,
  Calendar,
  User,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
} from "lucide-react";

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

export default function ProviderPackages() {
  const [packages, setPackages] = useState<ProviderPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchProviderPackages();
  }, []);

  const fetchProviderPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/provider/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
      }
    } catch (error) {
      console.error("Error fetching provider packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.clientCompany &&
        pkg.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "completed":
        return "bg-gray-500/20 text-gray-400";
      case "upcoming":
        return "bg-blue-500/20 text-blue-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "upcoming":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <PauseCircle className="h-4 w-4" />;
    }
  };

  const totalRevenue = packages
    .filter((pkg) => pkg.status === "completed")
    .reduce((sum, pkg) => sum + pkg.totalAmount, 0);

  const activeProjects = packages.filter(
    (pkg) => pkg.status === "active"
  ).length;
  const completedProjects = packages.filter(
    (pkg) => pkg.status === "completed"
  ).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-gray-400">
            Manage your cybersecurity service packages and client projects
          </p>
        </div>
        <Button
          onClick={() => router.push("/provider/packages/create")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Create New Package
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">
                  {packages.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-green-400">
                  {activeProjects}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-blue-400">
                  {completedProjects}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-400">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Packages List */}
      <div className="space-y-4">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="bg-gray-900 border-gray-800 hover:border-orange-500/30 transition-colors"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-white text-lg">
                        {pkg.name}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(pkg.status)}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(pkg.status)}
                          {pkg.status}
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {pkg.clientCompany && (
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {pkg.clientCompany}
                        </span>
                      )}
                      {pkg.projectCategory && (
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {pkg.projectCategory}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(pkg.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />$
                        {pkg.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() =>
                        router.push(`/provider/packages/${pkg.id}`)
                      }
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Description</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {pkg.services.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.services.slice(0, 4).map((service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                        {pkg.services.length > 4 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            +{pkg.services.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {pkg.startDate && (
                        <span>
                          Start: {new Date(pkg.startDate).toLocaleDateString()}
                        </span>
                      )}
                      {pkg.endDate && (
                        <span>
                          End: {new Date(pkg.endDate).toLocaleDateString()}
                        </span>
                      )}
                      <span>
                        Updated: {new Date(pkg.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Reports
                      </Button>
                      {pkg.status === "active" && (
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Update Progress
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "You haven't created any projects yet."}
              </p>
              <Button
                onClick={() => router.push("/provider/packages/create")}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination/Load More */}
      {filteredPackages.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={fetchProviderPackages}
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
}
