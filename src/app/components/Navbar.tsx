"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "../hooks/useUser";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, isAuthenticated, hasCompany, companyLoading, logout } =
    useUser();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout using useUser hook
  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  // Build navigation items dynamically based on user role and company status
  const getNavItems = () => {
    const baseNavItems = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Company",
        link: "/company",
        hasDropdown: true,
        dropdownItems: [
          {
            category: "Company",
            items: [
              {
                name: "Why Choose CyberJall",
                link: "/company#why-choose-us",
                description: "Comprehensive web application security testing",
              },
              {
                name: "Our Clients",
                link: "/company#clients",
                description: "Cloud infrastructure security assessment",
              },
              {
                name: "Our Service Partners",
                link: "/ourPartners",
                description: "Network security vulnerability testing",
              },
              {
                name: "Get Free Consultation",
                link: "/contact_us",
                description: "API security and vulnerability assessment",
              },
            ],
          },
        ],
      },
      {
        name: "MarketPlace",
        link: "/ourPartners",
      },
      {
        name: "CyberJall Insights",
        link: "/cyberjall_insights",
      },
    ];

    // Add Bids option for providers with company profiles
    if (user?.role === "provider" && hasCompany && !companyLoading) {
      baseNavItems.push({
        name: "Bids",
        link: "/provider/bids",
      });
    }

    return baseNavItems;
  };

  const navItems = getNavItems();

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
    return "U";
  }

  return (
    <nav
      className={`bg-black/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/main_logo.svg"
                alt="CyberJall"
                width={100}
                height={100}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Search services, compliance, or security solutions..."
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center space-x-1">
                    <span>{item.name}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.link}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-96 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4">
                      {item.dropdownItems?.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            {category.category}
                          </h3>
                          <div className="space-y-1">
                            {category.items.map((dropdownItem, itemIndex) => (
                              <Link
                                key={itemIndex}
                                href={dropdownItem.link}
                                className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="font-medium">
                                  {dropdownItem.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {dropdownItem.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            {/* User Profile or Login */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user.name, user.work_email)}
                  </div>
                  <span>
                    {user.name || user.work_email?.split("@")[0] || "User"}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {getInitials(user.name, user.work_email)}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {user.name || "User"}
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
                        {user.role === "provider" && (
                          <Link
                            href="/provider"
                            onClick={() => setShowProfileDropdown(false)}
                            className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200"
                          >
                            Provider Dashboard
                          </Link>
                        )}
                        {user.role === "customer" && (
                          <Link
                            href="/customer"
                            onClick={() => setShowProfileDropdown(false)}
                            className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200"
                          >
                            Customer Dashboard
                          </Link>
                        )}
                        <Link
                          href="/company"
                          onClick={() => setShowProfileDropdown(false)}
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800/50 rounded-md transition-all duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-all duration-200"
              >
                Login
              </Link>
            )}

            {/* Primary CTA Button */}
            <Link
              href="/contact_us"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Search..."
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, idx) => (
                <MobileNavItem
                  key={`mobile-nav-${idx}`}
                  item={item}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>

            {/* Mobile User Section */}
            {isAuthenticated && user && (
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user.name, user.work_email)}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {user.name || "User"}
                    </p>
                    <p className="text-gray-400 text-sm">{user.work_email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === "provider" && (
                    <Link
                      href="/provider"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      Provider Dashboard
                    </Link>
                  )}
                  {user.role === "customer" && (
                    <Link
                      href="/customer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      Customer Dashboard
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Action Buttons */}
            <div className="px-4 py-3 border-t border-gray-800 space-y-3">
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center text-base font-medium text-gray-300 border border-gray-600 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              )}
              <Link
                href="/contact_us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

interface NavItem {
  name: string;
  link: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    category: string;
    items: {
      name: string;
      link: string;
      description: string;
    }[];
  }[];
}

interface MobileNavItemProps {
  item: NavItem;
  onClose: () => void;
}

const MobileNavItem = ({ item, onClose }: MobileNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (item.hasDropdown) {
      setIsExpanded(!isExpanded);
    } else {
      onClose();
    }
  };

  if (item.hasDropdown && item.dropdownItems) {
    return (
      <div className="space-y-1">
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
        >
          <span>{item.name}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isExpanded && (
          <div className="ml-4 space-y-1">
            {item.dropdownItems.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-1">
                <h6 className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {category.category}
                </h6>
                {category.items.map((dropdownItem, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={dropdownItem.link}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    <div className="font-medium">{dropdownItem.name}</div>
                    <div className="text-xs text-gray-500">
                      {dropdownItem.description}
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link
        href={item.link}
        onClick={onClose}
        className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
      >
        {item.name}
      </Link>
    );
  }
};
