"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
} from "lucide-react";

export default function ProviderSettings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      bidNotifications: true,
      projectUpdates: true,
      marketingEmails: false,
      weeklyReports: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowDirectContact: true,
    },
    preferences: {
      theme: "dark",
      language: "en",
      timezone: "UTC-5",
      currency: "USD",
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    // Here you would make an API call to save the settings
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400">
            Manage your account preferences and privacy settings
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Choose how you want to be notified about activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(value) =>
                    handleSettingChange(
                      "notifications",
                      "emailNotifications",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(value) =>
                    handleSettingChange(
                      "notifications",
                      "pushNotifications",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">New Bid Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Get notified when new business opportunities are posted
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.bidNotifications}
                  onCheckedChange={(value) =>
                    handleSettingChange(
                      "notifications",
                      "bidNotifications",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Project Updates</Label>
                  <p className="text-sm text-gray-400">
                    Notifications about your active projects
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.projectUpdates}
                  onCheckedChange={(value) =>
                    handleSettingChange(
                      "notifications",
                      "projectUpdates",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Weekly Reports
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive weekly business performance reports
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(value) =>
                    handleSettingChange("notifications", "weeklyReports", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Marketing Emails</Label>
                  <p className="text-sm text-gray-400">
                    Promotional content and platform updates
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.marketingEmails}
                  onCheckedChange={(value) =>
                    handleSettingChange(
                      "notifications",
                      "marketingEmails",
                      value
                    )
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Privacy Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Control who can see your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">
                  Profile Visibility
                </Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) =>
                    handleSettingChange("privacy", "profileVisibility", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="members">Members Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-400 mt-1">
                  Who can view your company profile
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Show Email Address</Label>
                  <p className="text-sm text-gray-400">
                    Display your email on your public profile
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(value) =>
                    handleSettingChange("privacy", "showEmail", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Show Phone Number</Label>
                  <p className="text-sm text-gray-400">
                    Display your phone number on your public profile
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showPhone}
                  onCheckedChange={(value) =>
                    handleSettingChange("privacy", "showPhone", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Allow Direct Contact</Label>
                  <p className="text-sm text-gray-400">
                    Let clients contact you directly through the platform
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowDirectContact}
                  onCheckedChange={(value) =>
                    handleSettingChange("privacy", "allowDirectContact", value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance & Preferences */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Appearance & Preferences
            </CardTitle>
            <CardDescription className="text-gray-400">
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Theme</Label>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value) =>
                    handleSettingChange("preferences", "theme", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Language</Label>
                <Select
                  value={settings.preferences.language}
                  onValueChange={(value) =>
                    handleSettingChange("preferences", "language", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Timezone</Label>
                <Select
                  value={settings.preferences.timezone}
                  onValueChange={(value) =>
                    handleSettingChange("preferences", "timezone", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Currency</Label>
                <Select
                  value={settings.preferences.currency}
                  onValueChange={(value) =>
                    handleSettingChange("preferences", "currency", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Regional Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Location and regional preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Date Format</Label>
                <Select defaultValue="mm/dd/yyyy">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Number Format</Label>
                <Select defaultValue="1,234.56">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1,234.56">1,234.56</SelectItem>
                    <SelectItem value="1.234,56">1.234,56</SelectItem>
                    <SelectItem value="1 234,56">1 234,56</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="bg-gray-900 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-gray-400">
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Delete Account</h4>
              <p className="text-gray-400 text-sm">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-900/20"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
