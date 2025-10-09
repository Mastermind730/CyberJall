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
  Briefcase,
  Search,
  Filter,
  Plus,
  Loader2,
  ExternalLink,
  Clock,
  Building,
  MapPin,
  FileText,
} from "lucide-react";

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
}

export default function ProviderBids() {
  const [bids, setBids] = useState<BusinessBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchBusinessBids();
  }, []);

  const fetchBusinessBids = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getAllBids");
      if (response.ok) {
        const data = await response.json();
        setBids(data.bids || []);
      }
    } catch (error) {
      console.error("Error fetching business bids:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBids = bids.filter((bid) => {
    const matchesSearch =
      bid.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || bid.status === statusFilter;
    const matchesUrgency =
      urgencyFilter === "all" || bid.urgency === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "urgent":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "pending_review":
        return "bg-yellow-500/20 text-yellow-400";
      case "closed":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Business Opportunities
          </h1>
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
          <h1 className="text-2xl font-bold text-white">
            Business Opportunities
          </h1>
          <p className="text-gray-400">
            Browse and respond to business opportunities from potential clients
          </p>
        </div>
        <Button
          onClick={() => router.push("/bid/create")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post Opportunity
        </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by company, industry, or description..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending_review">Pending Review</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Opportunities</p>
                <p className="text-2xl font-bold text-white">{bids.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400">
                  {bids.filter((bid) => bid.status === "approved").length}
                </p>
              </div>
              <Building className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {bids.filter((bid) => bid.status === "pending_review").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {filteredBids.length > 0 ? (
          filteredBids.map((bid) => (
            <Card
              key={bid.id}
              className="bg-gray-900 border-gray-800 hover:border-orange-500/30 transition-colors"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-white text-lg">
                        {bid.companyName}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(bid.status)}
                      >
                        {bid.status.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getUrgencyColor(bid.urgency)}
                      >
                        {bid.urgency}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {bid.industry}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {bid.infrastructureSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      View Details
                    </Button>
                    {bid.status === "approved" && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Description</h4>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {bid.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Services Required
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {bid.serviceTypes.slice(0, 3).map((service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                        {bid.serviceTypes.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            +{bid.serviceTypes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Compliance Goals
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {bid.complianceGoals.slice(0, 2).map((goal, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {goal}
                          </Badge>
                        ))}
                        {bid.complianceGoals.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            +{bid.complianceGoals.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Contact: {bid.contactName}</span>
                      {bid.budget && <span>Budget: {bid.budget}</span>}
                      {bid.documents.length > 0 && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {bid.documents.length} document(s)
                        </span>
                      )}
                    </div>
                    {bid.website && (
                      <a
                        href={bid.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 text-sm flex items-center gap-1"
                      >
                        Company Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No opportunities found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ||
                statusFilter !== "all" ||
                urgencyFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "There are currently no business opportunities available."}
              </p>
              <Button
                onClick={() => router.push("/bid/create")}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Opportunity
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More Button */}
      {filteredBids.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={fetchBusinessBids}
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
