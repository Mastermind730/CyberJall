"use client";

import { useUser } from "../hooks/useUser";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  User,
  Mail,
  Building2,
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw,
  LogOut,
} from "lucide-react";

export default function UserProfileExample() {
  const {
    user,
    isLoading,
    isAuthenticated,
    hasCompany,
    companyLoading,
    logout,
    refreshUser,
    updateUser,
  } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You must be logged in to view this page.
            </p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleRefresh = async () => {
    await refreshUser();
  };

  const handleUpdateName = () => {
    const newName = prompt("Enter new name:", user?.name || "");
    if (newName && newName.trim()) {
      updateUser({ name: newName.trim() });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            useUser Hook Demo
          </h1>
          <p className="text-gray-600">
            Demonstrating centralized user state management
          </p>
        </div>

        {/* User Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Authentication Status */}
            <div className="flex items-center justify-between">
              <span className="font-medium">Authentication Status:</span>
              <Badge variant={isAuthenticated ? "default" : "destructive"}>
                {isAuthenticated ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Authenticated
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Not Authenticated
                  </>
                )}
              </Badge>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="flex items-center justify-between">
                  <p className="text-gray-900">
                    {user?.name || "Not provided"}
                  </p>
                  <Button variant="ghost" size="sm" onClick={handleUpdateName}>
                    Edit
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <Badge variant="outline" className="capitalize">
                  {user?.role}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <p className="text-gray-900">
                  {user?.work_email || "Not provided"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contact
                </label>
                <p className="text-gray-900">
                  {user?.contact || "Not provided"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">
                    {user?.company_name || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider-specific information */}
            {user?.role === "provider" && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">
                  Provider Information
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Company Profile Status:</span>
                  {companyLoading ? (
                    <Badge variant="outline">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Checking...
                    </Badge>
                  ) : hasCompany ? (
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Incomplete
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hook Usage Information */}
        <Card>
          <CardHeader>
            <CardTitle>useUser Hook Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Available Properties:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• user - Current user object</li>
                  <li>• isLoading - Loading state</li>
                  <li>• isAuthenticated - Auth status</li>
                  <li>• hasCompany - Company profile status</li>
                  <li>• companyLoading - Company check loading</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Available Methods:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• login(userData) - Set user data</li>
                  <li>• logout() - Clear user and redirect</li>
                  <li>• updateUser(data) - Update user data</li>
                  <li>• refreshUser() - Refresh from server</li>
                  <li>• checkCompanyProfile() - Check company</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Example */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {`import { useUser } from "../hooks/useUser";

function MyComponent() {
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    logout 
  } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
