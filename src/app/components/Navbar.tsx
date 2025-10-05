"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth" // Adjust import path as needed

interface User {
  name?: string
  email?: string
  company_name?: string
  work_email?: string
  avatarUrl?: string
  role?: string
  id?: string
}

export default function NavbarNew() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Use the useAuth hook
  const { user, loading } = useAuth()
  const isLoggedIn = !!user

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showProfileDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }
    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProfileDropdown])

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('/api/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear client-side state
      setShowProfileDropdown(false)
      setIsMobileMenuOpen(false)
      
      // Force reload to clear any cached state
      window.location.href = '/login'
    }
  }

  const navItems = [
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
    {
      name: "Services",
      link: "/services",
      hasDropdown: true,
      dropdownItems: [
        {
          category: "VAPT Services",
          items: [
            {
              name: "Web App Testing",
              link: "/services#consultation",
              description: "Comprehensive web application security testing",
            },
            {
              name: "Cloud Pen Testing",
              link: "/services/cloud",
              description: "Cloud infrastructure security assessment",
            },
            {
              name: "Network Pen Testing",
              link: "/services/network",
              description: "Network security vulnerability testing",
            },
            {
              name: "API Pen Testing",
              link: "/services/api_testing",
              description: "API security and vulnerability assessment",
            },
            {
              name: "Mobile App Testing",
              link: "/services/mobile_pentesting",
              description: "Mobile application security assessment",
            },
          ],
        },
        {
          category: "Compliance Standards",
          items: [
            { name: "ISO 27001", link: "/services/compliance", description: "Information security management certification" },
            { name: "HIPAA", link: "/services/compliance", description: "Healthcare data protection compliance" },
            { name: "SOC 2", link: "/services/compliance", description: "Service organization control compliance" },
            { name: "GDPR", link: "/services/compliance", description: "General data protection regulation" },
          ],
        },
        {
          category: "Advanced Threat Defense",
          items: [
            { name: "XDR ", link: "/service1", description: "Extended Detection & Response" },
            { name: "AI Extended Detection & Response", link: "/service2", description: "AI Extended Detection & Response" },
            { name: "ASM", link: "/service3", description: "Attack Surface Management " },
            { name: " Zero Trust Implementation", link: "/service4", description: " Zero Trust Implementation" },
          ],
        },
         {
          category: "Cloud Security Services",
          items: [
            { name: "CSPM", link: "/cspm", description: "Extended Detection & Response" },
            { name: " Cloud Data Protection & DLP", link: "/cloudPndDLP", description: "AI Extended Detection & Response" },
            { name: "Cloud Compliance Mapping", link: "/cloudCompliance", description: "Attack Surface Management " },
            { name: "DevSecOps Implementation", link: "/devSecOps", description: " Zero Trust Implementation" },
          ],
        },
      ],
    },
    {
      name: "Product",
      link: "#product",
      hasDropdown: true,
      dropdownItems: [
        {
          category: "Products",
          items: [
            {
              name: "Bug Bounty",
              link: "/products/bug_bounty",
              description: "Comprehensive web application security testing",
            },
          ]
        }
      ]
    },
  ]

  // Helper for avatar initials
  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim().length > 0) {
      return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (email && email.length > 0) {
      return email[0].toUpperCase()
    }
    return "U"
  }

  // Show loading state
  if (loading) {
    return (
      <div className="w-full bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            CyberJall
          </div>
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            CyberJall
          </Link>
        </div>
        
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link 
                href={item.link} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </Link>
              
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-3 gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                    {item.dropdownItems.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.category}
                        </h4>
                        <div className="space-y-2">
                          {category.items.map((dropdownItem, ddIndex) => (
                            <Link
                              key={ddIndex}
                              href={dropdownItem.link}
                              className="block p-3 text-xs text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100 dark:hover:border-gray-600"
                            >
                              <div className="font-medium text-gray-900 dark:text-white">
                                {dropdownItem.name}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
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
        
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown((v) => !v)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    getInitials(user.name || user.company_name, user.email || user.work_email)
                  )}
                </div>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-80 slide-in-from-top-2">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-lg backdrop-blur-sm ring-2 ring-white/30">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          getInitials(user.name || user.company_name, user.email || user.work_email)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-white truncate">
                          {user.name || user.company_name || "User"}
                        </div>
                        <div className="text-blue-100 text-sm truncate">
                          {user.email || user.work_email}
                        </div>
                        {user.role && (
                          <div className="text-blue-200 text-xs font-medium mt-0.5">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-150 group"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Dashboard</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">View your dashboard</div>
                        </div>
                      </Link>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-3 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Sign out</div>
                          <div className="text-red-500 dark:text-red-400 text-xs">Log out of your account</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-300 dark:border-gray-600"
            >
              Login
            </button>
          )}
          <button
            onClick={() => router.push('/contact_us')}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          CyberJall
        </Link>
        
        <div className="flex items-center gap-2">
          {isLoggedIn && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  getInitials(user.name || user.company_name, user.email || user.work_email)
                )}
              </button>

              {/* Mobile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-80 slide-in-from-top-2">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-md backdrop-blur-sm ring-2 ring-white/30">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          getInitials(user.name || user.company_name, user.email || user.work_email)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-md font-bold text-white truncate">
                          {user.name || user.company_name || "User"}
                        </div>
                        <div className="text-blue-100 text-sm truncate">
                          {user.email || user.work_email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-3 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150"
                      >
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-inner">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link 
                  href={item.link} 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                
                {item.hasDropdown && item.dropdownItems && (
                  <div className="pl-4 mt-2 space-y-4 border-l border-gray-200 dark:border-gray-700">
                    {item.dropdownItems.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-xs">
                          {category.category}
                        </h4>
                        <div className="space-y-2">
                          {category.items.map((dropdownItem, ddIndex) => (
                            <Link
                              key={ddIndex}
                              href={dropdownItem.link}
                              className="block p-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="font-medium">{dropdownItem.name}</div>
                              <div className="text-gray-500 dark:text-gray-400 mt-1">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    router.push('/login')
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => {
                  router.push('/contact_us')
                  setIsMobileMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}