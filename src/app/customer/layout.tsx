"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import { useUser } from "../hooks/useUser";
import {
  User,
  Package,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Shield,
  LogOut,
  ChevronDown,
} from "lucide-react";

const navigation = [
  {
    name: "My Profile",
    href: "/customer/profile",
    icon: User,
    description: "Manage your profile and company details",
  },
  {
    name: "My Packages",
    href: "/customer/packages",
    icon: Package,
    description: "View and manage your security packages",
  },
  {
    name: "CyberJall Insights",
    href: "/customer/insights",
    icon: BarChart3,
    description: "Cyber health score and security insights",
  },
  {
    name: "Account Settings",
    href: "/customer/settings",
    icon: Settings,
    description: "Security settings and billing information",
  },
  {
    name: "Help & Support",
    href: "/customer/support",
    icon: HelpCircle,
    description: "Get help and contact support",
  },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isLoading, isAuthenticated } = useUser();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log("Customer Layout - User data:", user);
  console.log("Customer Layout - isLoading:", isLoading);
  console.log("Customer Layout - isAuthenticated:", isAuthenticated);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  // Logout function using useUser hook
  const handleLogout = async () => {
    await logout();
  };

  // Helper function to get user initials
  function getInitials(name?: string, email?: string): string {
    if (name && name.length > 0) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email && email.length > 0) {
      return email[0].toUpperCase();
    }
    return "C";
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-black/80"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-semibold text-white">
                Customer Portal
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
          <div className="flex items-center space-x-2 p-6 border-b border-gray-800">
            <Shield className="h-6 w-6 text-orange-500" />
            <span className="text-lg font-semibold text-white">
              Customer Portal
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header with mobile menu and user menu */}
        <header className="sticky top-16 z-30 flex h-16 items-center justify-between bg-gray-900 border-b border-gray-800 px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-x-4 ml-auto">
            {isAuthenticated && (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-x-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user?.name, user?.work_email || user?.email)}
                  </div>
                  <span className="hidden sm:block">
                    {user?.name ||
                      user?.work_email?.split("@")[0] ||
                      user?.email?.split("@")[0] ||
                      "Customer"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4">
                      <div className="flex items-center gap-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {getInitials(
                            user?.name,
                            user?.work_email || user?.email
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {user?.name || "Customer"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {user?.work_email || user?.email}
                          </p>
                          {user?.company_name && (
                            <p className="text-gray-500 text-xs">
                              {user.company_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-4 space-y-2">
                        <Link
                          href="/customer/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link
                          href="/customer/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
