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
import { Textarea } from "@/app/components/ui/textarea";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit,
  Save,
  X,
  Camera,
  Loader2,
  Shield,
  Award,
  Calendar,
} from "lucide-react";
import Image from "next/image";

interface User {
  role: string;
  work_email: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
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
  certifications?: string[];
  contact_email?: string;
  contact_phone?: string;
}

export default function ProviderProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [editedCompany, setEditedCompany] = useState<Partial<Company>>({});
  const router = useRouter();

  useEffect(() => {
    loadUserAndCompany();
  }, []);

  const loadUserAndCompany = async () => {
    setLoading(true);
    try {
      // Load user data - replace with actual API call
      const userData = {
        role: "provider",
        work_email: "provider@example.com",
        profile: {
          firstName: "John",
          lastName: "Smith",
          phone: "+1 (555) 123-4567",
          lastLogin: new Date().toISOString(),
        },
      };
      setUser(userData);
      setEditedProfile({
        firstName: userData.profile?.firstName || "",
        lastName: userData.profile?.lastName || "",
        phone: userData.profile?.phone || "",
      });

      // Load company data
      const response = await fetch("/api/getCompany");
      if (response.ok) {
        const data = await response.json();
        setCompany(data.company);
        setEditedCompany(data.company || {});
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Simulate API call to save profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      if (user) {
        setUser({
          ...user,
          profile: {
            ...user.profile,
            ...editedProfile,
          },
        });
      }

      setEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (user?.profile) {
      setEditedProfile({
        firstName: user.profile.firstName || "",
        lastName: user.profile.lastName || "",
        phone: user.profile.phone || "",
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
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
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400">
            Manage your personal and company information
          </p>
        </div>
        {!editing ? (
          <Button
            onClick={() => setEditing(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-green-500 hover:bg-green-600"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  {editing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {editing ? "Click to change photo" : "Profile Photo"}
                </p>
              </div>

              {/* Name */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    First Name
                  </label>
                  {editing ? (
                    <Input
                      value={editedProfile.firstName}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          firstName: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    <p className="text-white">
                      {user?.profile?.firstName || "Not set"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Last Name
                  </label>
                  {editing ? (
                    <Input
                      value={editedProfile.lastName}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          lastName: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    <p className="text-white">
                      {user?.profile?.lastName || "Not set"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-white">{user?.work_email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Phone
                  </label>
                  {editing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          phone: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-white">
                        {user?.profile?.phone || "Not set"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Last Login
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-white">
                      {user?.profile?.lastLogin
                        ? new Date(user.profile.lastLogin).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Information */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your company profile and business details
                  </CardDescription>
                </div>
                {!company && (
                  <Button
                    onClick={() => router.push("/createCompany")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Create Company Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {company ? (
                <div className="space-y-6">
                  {/* Company Header */}
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {company.logo && (
                      <Image
                        src={company.logo}
                        alt="Company Logo"
                        width={80}
                        height={80}
                        className="object-contain rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {company.company_name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {company.overview}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-gray-800 text-gray-300"
                        >
                          Founded {company.year_founded}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-gray-800 text-gray-300"
                        >
                          {company.team_size} employees
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Company Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Location
                        </h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-white">
                            {company.headquarters_city},{" "}
                            {company.headquarters_country}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Website
                        </h4>
                        {company.website ? (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:text-orange-400 text-sm"
                            >
                              {company.website}
                            </a>
                          </div>
                        ) : (
                          <p className="text-gray-400">Not set</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          {company.contact_email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <p className="text-white text-sm">
                                {company.contact_email}
                              </p>
                            </div>
                          )}
                          {company.contact_phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <p className="text-white text-sm">
                                {company.contact_phone}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {company.industries_served &&
                        company.industries_served.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">
                              Industries Served
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {company.industries_served.map(
                                (industry, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-800 text-gray-300 text-xs"
                                  >
                                    {industry}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {company.geographic_coverage &&
                        company.geographic_coverage.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">
                              Geographic Coverage
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {company.geographic_coverage.map(
                                (region, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-800 text-gray-300 text-xs"
                                  >
                                    {region}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {company.target_business_size &&
                        company.target_business_size.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">
                              Target Business Size
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {company.target_business_size.map(
                                (size, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-800 text-gray-300 text-xs"
                                  >
                                    {size}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {company.certifications &&
                        company.certifications.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">
                              Certifications
                            </h4>
                            <div className="space-y-2">
                              {company.certifications.map((cert, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Award className="h-4 w-4 text-orange-500" />
                                  <span className="text-white text-sm">
                                    {cert}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <Button
                      onClick={() => router.push("/editCompany")}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Company Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No Company Profile
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your company profile to showcase your cybersecurity
                    expertise and start receiving business opportunities.
                  </p>
                  <Button
                    onClick={() => router.push("/createCompany")}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Create Company Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security & Account */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security & Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage your account security and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Enable Two-Factor Authentication
              </Button>
            </div>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Download Account Data
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-600 text-red-400 hover:bg-red-900/20"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
