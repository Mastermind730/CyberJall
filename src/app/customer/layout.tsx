"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import {
  User,
  Package,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Shield,
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
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
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
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
