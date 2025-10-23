/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Loader2, Building2, Mail, Phone } from "lucide-react";
import { useCustomerProfile } from "@/app/customer/hooks/useCustomerProfile";

export default function ProfilePage() {
  const { data, loading, error, save } = useCustomerProfile(4000);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = useMemo(
    () => data?.user ?? { company_name: "", work_email: "", contact: "" },
    [data]
  );
  const profile = useMemo(
    () =>
      data?.profile ?? {
        firstName: "",
        lastName: "",
        jobTitle: "",
        phone: "",
        avatar: "/placeholder-user.jpg",
      },
    [data]
  );

  useEffect(() => {
    if (data?.profile) {
      setFirstName(data.profile.firstName ?? "");
      setLastName(data.profile.lastName ?? "");
      setJobTitle(data.profile.jobTitle ?? "");
      setPhone(data.profile.phone ?? "");
    }
    if (data?.user) {
      setCompanyName(data.user.company_name ?? "");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await save({
        firstName,
        lastName,
        jobTitle,
        phone,
        company_name: companyName,
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-300">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading profile...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Failed to load profile: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 text-white border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          <Button
            variant="outline"
            className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isUpdating}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-orange-500">
              <AvatarImage
                src={profile.avatar || "/placeholder-user.jpg"}
                alt="User Avatar"
              />
              <AvatarFallback className="bg-orange-500 text-white text-4xl">
                {(firstName || "U").charAt(0)}
                {(lastName || "S").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-2xl font-semibold">
                {firstName} {lastName}
              </div>
              <div className="text-gray-400">{jobTitle}</div>
              <div className="text-gray-400">{companyName}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-300">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing || isUpdating}
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing || isUpdating}
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-gray-300">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                disabled={!isEditing || isUpdating}
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing || isUpdating}
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.work_email || ""}
                disabled
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-300">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={!isEditing || isUpdating}
                className="bg-gray-800 border-gray-700 text-white focus:ring-orange-500"
              />
            </div>
          </div>

          {isEditing && (
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-900 text-white border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Company Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-orange-500" />
            <span className="text-gray-300">Company:</span>
            <span className="font-medium">{user.company_name || ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-500" />
            <span className="text-gray-300">Email:</span>
            <span className="font-medium">{user.work_email || ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-500" />
            <span className="text-gray-300">Contact:</span>
            <span className="font-medium">{user.contact || phone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
