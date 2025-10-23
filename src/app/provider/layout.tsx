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
  Briefcase,
  FileText,
  LogOut,
  ChevronDown,
} from "lucide-react";

const navigation = [
  {
    name: "My Profile",
    href: "/provider/profile",
    icon: User,
    description: "Manage your provider profile and company details",
  },
  {
    name: "My Packages",
    href: "/provider/packages",
    icon: Package,
    description: "View and manage your service packages",
  },
  {
    name: "Business Bids",
    href: "/provider/bids",
    icon: Briefcase,
    description: "View and respond to business opportunities",
  },
  {
    name: "CyberJall Insights",
    href: "/provider/insights",
    icon: BarChart3,
    description: "Business insights and performance analytics",
  },
  {
    name: "Account Settings",
    href: "/provider/settings",
    icon: Settings,
    description: "Security settings and business information",
  },
  {
    name: "Help & Support",
    href: "/provider/support",
    icon: HelpCircle,
    description: "Get help and contact support",
  },
];

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useUser();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

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
    return "P";
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-gray-800">
          <div className="flex h-16 shrink-0 items-center justify-between px-6">
            <Link href="/provider" className="flex items-center">
              <Shield className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">
                CyberJall
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-gray-700 text-orange-500"
                            : "text-gray-300 hover:text-white hover:bg-gray-700",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? "text-orange-500"
                              : "text-gray-400 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <div>
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/provider" className="flex items-center">
              <Shield className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">
                CyberJall
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-gray-700 text-orange-500"
                            : "text-gray-300 hover:text-white hover:bg-gray-700",
                          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? "text-orange-500"
                              : "text-gray-400 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <div>
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-16 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-600" />
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              {user && (
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-x-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(user.name, user.work_email)}
                    </div>
                    <span className="hidden sm:block">
                      {user.name ||
                        user.work_email?.split("@")[0] ||
                        "Provider"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                      <div className="p-4">
                        <div className="flex items-center gap-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                            {getInitials(user.name, user.work_email)}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {user.name || "Provider"}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {user.work_email}
                            </p>
                            {user.company_name && (
                              <p className="text-gray-500 text-xs">
                                {user.company_name}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 space-y-2">
                          <Link
                            href="/provider/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                          <Link
                            href="/provider/settings"
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
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
