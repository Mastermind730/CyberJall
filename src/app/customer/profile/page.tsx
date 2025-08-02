"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Upload,
  Globe,
  Users,
  Briefcase,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const handleEdit = (section: string) => {
    setEditingSection(section)
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    setEditingSection(null)
    // Handle save logic here
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingSection(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400">Manage your personal and company information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback className="bg-orange-500 text-white text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-white">John Doe</CardTitle>
            <CardDescription className="text-gray-400">Chief Technology Officer</CardDescription>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
              Verified Account
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">john.doe@techcorp.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">Member since Jan 2023</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-orange-500" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-400">Your personal details and contact information</CardDescription>
            </div>
            {editingSection !== "personal" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit("personal")}
                className="border-gray-700 text-gray-300 hover:text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {editingSection === "personal" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-300">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-300">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-gray-300">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    defaultValue="Chief Technology Officer"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="border-gray-700 bg-transparent">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">First Name</Label>
                    <p className="text-white">John</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Job Title</Label>
                    <p className="text-white">Chief Technology Officer</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Last Name</Label>
                    <p className="text-white">Doe</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Phone Number</Label>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company Information */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Building className="mr-2 h-5 w-5 text-orange-500" />
              Company Details
            </CardTitle>
            <CardDescription className="text-gray-400">Information about your organization</CardDescription>
          </div>
          {editingSection !== "company" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit("company")}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editingSection === "company" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-gray-300">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    defaultValue="TechCorp Inc."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-300">
                    Industry
                  </Label>
                  <Input id="industry" defaultValue="Technology" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-gray-300">
                    Company Size
                  </Label>
                  <Input
                    id="companySize"
                    defaultValue="500-1000 employees"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">
                    Website
                  </Label>
                  <Input
                    id="website"
                    defaultValue="https://techcorp.com"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Textarea
                  id="address"
                  defaultValue="123 Tech Street, Silicon Valley, CA 94000"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="border-gray-700 bg-transparent">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label className="text-gray-400 text-sm">Company Name</Label>
                    <p className="text-white">TechCorp Inc.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label className="text-gray-400 text-sm">Industry</Label>
                    <p className="text-white">Technology</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label className="text-gray-400 text-sm">Company Size</Label>
                    <p className="text-white">500-1000 employees</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label className="text-gray-400 text-sm">Website</Label>
                    <p className="text-white">techcorp.com</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <Label className="text-gray-400 text-sm">Address</Label>
                    <p className="text-white">
                      123 Tech Street
                      <br />
                      Silicon Valley, CA 94000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
