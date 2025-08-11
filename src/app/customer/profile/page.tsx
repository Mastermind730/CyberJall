/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Loader2, UserIcon, Building2, Mail, Phone } from "lucide-react"

export default function ProfilePage() {
  // Dummy state for profile data
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [jobTitle, setJobTitle] = useState("Software Engineer")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [companyName, setCompanyName] = useState("Acme Inc.")
  const [isUpdating, setIsUpdating] = useState(false)

  // Dummy user data
  const user = {
    company_name: "Acme Inc.",
    work_email: "john.doe@acme.com",
    contact: "+1 (555) 123-4567"
  }

  const profile = {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Software Engineer",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder-user.jpg"
  }

  const handleSave = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      setIsEditing(false)
      // In a real app, you would show a toast notification here
      console.log("Profile updated successfully!")
    }, 1000)
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
                src={profile.avatar}
                alt="User Avatar"
              />
              <AvatarFallback className="bg-orange-500 text-white text-4xl">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
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
                value={user.work_email}
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
            <span className="font-medium">{user.company_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-500" />
            <span className="text-gray-300">Email:</span>
            <span className="font-medium">{user.work_email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-500" />
            <span className="text-gray-300">Contact:</span>
            <span className="font-medium">{user.contact}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}