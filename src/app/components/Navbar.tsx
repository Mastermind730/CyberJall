"use client"
import Link from "next/link"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NavbarNew() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
      name: "MarktetPlace",
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
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <NavbarButton variant="secondary" onClick={handleLogout}>
                Logout
              </NavbarButton>
            ) : (
              <Link href="/login">
                Login
                {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
              </Link>
            )}
            <Link href="/contact_us">
            Contact Us
              {/* <NavbarButton variant="primary">Contact Us</NavbarButton> */}
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <MobileNavItem key={`mobile-link-${idx}`} item={item} onClose={() => setIsMobileMenuOpen(false)} />
            ))}
            <div className="flex w-full flex-col gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              {isLoggedIn ? (
                <NavbarButton
                  onClick={handleLogout}
                  variant="secondary"
                  className="w-full justify-center"
                >
                  Logout
                </NavbarButton>
              ) : (
                <Link href="/login" className="w-full">
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full justify-center"
                  >
                    Login
                  </NavbarButton>
                </Link>
              )}
              <Link href="/contact_us" className="w-full">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Contact Us
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

interface NavItem {
  name: string
  link: string
  hasDropdown?: boolean
  dropdownItems?: {
    category: string
    items: {
      name: string
      link: string
      description: string
    }[]
  }[]
}

interface MobileNavItemProps {
  item: NavItem
  onClose: () => void
}

const MobileNavItem = ({ item, onClose }: MobileNavItemProps) => {
  const handleClick = () => {
    onClose()
  }

  if (item.hasDropdown && item.dropdownItems) {
    return (
      <div>
        <span className="block">{item.name}</span>
        {item.dropdownItems.map((category, index) => (
          <div key={index}>
            <h6 className="text-sm font-bold">{category.category}</h6>
            {category.items.map((dropdownItem, i) => (
              <Link
                key={i}
                href={dropdownItem.link}
                onClick={handleClick}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{dropdownItem.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <Link href={item.link} onClick={handleClick} className="relative text-neutral-600 dark:text-neutral-300">
        <span className="block">{item.name}</span>
      </Link>
    )
  }
}