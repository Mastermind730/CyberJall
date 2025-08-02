"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Badge } from "@/app/components/ui/badge"
import { Switch } from "@/app/components/ui/switch"
import { Separator } from "@/app/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import {
  Shield,
  CreditCard,
  AlertTriangle,
  Eye,
  EyeOff,
  Download,
  DollarSign,
  FileText,
  Trash2,
  Lock,
  Plus,
} from "lucide-react"

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-01",
    description: "Penetration Testing Service",
    amount: 15000,
    paidAmount: 15000,
    status: "paid",
    dueDate: "2024-01-15",
  },
  {
    id: "INV-2024-002",
    date: "2024-01-10",
    description: "Compliance Audit Service",
    amount: 25000,
    paidAmount: 12500,
    status: "partial",
    dueDate: "2024-01-25",
  },
  {
    id: "INV-2024-003",
    date: "2024-01-15",
    description: "Security Awareness Training",
    amount: 8000,
    paidAmount: 0,
    status: "pending",
    dueDate: "2024-01-30",
  },
]

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-400"
      case "partial":
        return "bg-yellow-500/20 text-yellow-400"
      case "pending":
        return "bg-orange-500/20 text-orange-400"
      case "overdue":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
  const unpaidAmount = totalAmount - paidAmount

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400">Manage your security settings and billing information</p>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="security" className="data-[state=active]:bg-orange-500">
            Login & Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-orange-500">
            Billing & Invoices
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-orange-500">
            Account Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          {/* Password Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="mr-2 h-5 w-5 text-orange-500" />
                Password Settings
              </CardTitle>
              <CardDescription className="text-gray-400">Update your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-300">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-800 border-gray-700 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">Update Password</Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-orange-500" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription className="text-gray-400">
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white font-medium">Enable 2FA</p>
                  <p className="text-sm text-gray-400">Secure your account with two-factor authentication</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  <Badge
                    variant="secondary"
                    className={twoFactorEnabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                  >
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
              {twoFactorEnabled && (
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">
                    Two-factor authentication is currently enabled using your authenticator app.
                  </p>
                  <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                    View Recovery Codes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive updates about your packages and security alerts</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-400">Get critical security alerts via text message</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Billing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${totalAmount.toLocaleString()}</div>
                <p className="text-xs text-gray-400">All time billing</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Paid Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${paidAmount.toLocaleString()}</div>
                <p className="text-xs text-green-400">Successfully paid</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Unpaid Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${unpaidAmount.toLocaleString()}</div>
                <p className="text-xs text-red-400">Outstanding balance</p>
              </CardContent>
            </Card>
          </div>

          {/* Invoices */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-5 w-5 text-orange-500" />
                Recent Invoices
              </CardTitle>
              <CardDescription className="text-gray-400">View and manage your billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-white font-medium">{invoice.id}</p>
                          <p className="text-sm text-gray-400">{invoice.description}</p>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>Date: {invoice.date}</span>
                        <span>Due: {invoice.dueDate}</span>
                        <span>
                          Paid: ${invoice.paidAmount.toLocaleString()} / ${invoice.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      {invoice.status === "pending" || invoice.status === "partial" ? (
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Pay Now
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-orange-500" />
                Payment Methods
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your payment methods and billing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-400">Expires 12/25</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    Primary
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                  Edit
                </Button>
              </div>
              <Button variant="outline" className="w-full border-gray-700 bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          {/* Account Information */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription className="text-gray-400">Basic information about your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Account ID</Label>
                  <p className="text-white">CUST-2024-001</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Account Type</Label>
                  <p className="text-white">Enterprise Customer</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Member Since</Label>
                  <p className="text-white">January 15, 2023</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Last Login</Label>
                  <p className="text-white">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-gray-900 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-gray-400">Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Deactivate Account</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Permanently deactivate your account and delete all data
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deactivate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Confirm Account Deactivation</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          This action cannot be undone. This will permanently deactivate your account and remove all
                          your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirmText" className="text-gray-300">
                            Type "DEACTIVATE" to confirm
                          </Label>
                          <Input
                            id="confirmText"
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="DEACTIVATE"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="destructive" className="flex-1">
                            Deactivate Account
                          </Button>
                          <Button variant="outline" className="flex-1 border-gray-700 bg-transparent">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
