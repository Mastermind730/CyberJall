"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NavbarNew() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user exists in localStorage when component mounts
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    router.push('/login')
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
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

  return (
    <div className="relative w-full bg-white shadow-sm dark:bg-gray-900">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            CyberJall
          </Link>
        </div>
        
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link 
                href={item.link} 
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
              
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute left-0 mt-2 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                    {item.dropdownItems.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.category}
                        </h4>
                        <div className="space-y-1">
                          {category.items.map((dropdownItem, ddIndex) => (
                            <Link
                              key={ddIndex}
                              href={dropdownItem.link}
                              className="block p-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
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
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Login
            </button>
          )}
          <button
            onClick={() => router.push('/contact_us')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
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
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-inner">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link 
                  href={item.link} 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                
                {item.hasDropdown && item.dropdownItems && (
                  <div className="pl-4 mt-2 space-y-4 border-l border-gray-200 dark:border-gray-700">
                    {item.dropdownItems.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
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
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    router.push('/login')
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => {
                  router.push('/contact_us')
                  setIsMobileMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
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