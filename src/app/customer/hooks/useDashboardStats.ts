"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type DashboardStatsHook = {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  user: User | null;
  company: Company | null;
  refetch: () => Promise<void>;
};

interface User {
  id: string;
  work_email: string;
  company_name: string;
  contact: string;
  message: string;
  password: string;
  role: "customer" | "provider" | "admin";
  profile?: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    phone?: string;
    avatar?: string;
    lastLogin?: string;
  };
}

interface Company {
  id: string;
  company_name: string;
  logo: string;
  overview: string;
  year_founded: number;
  headquarters_city: string;
  headquarters_country: string;
  industries_served: string[];
  target_business_size: string[];
  geographic_coverage: string[];
  team_size: string;
  services_offered: Record<string, unknown>;
  expertise_and_certifications: Record<string, unknown>;
  case_studies: Record<string, unknown>;
  client_reviews: Record<string, unknown>;
  social_links: Record<string, unknown>;
  website: string;
  products: Record<string, unknown>;
}

interface Package {
  id: number;
  name: string;
  status: "active" | "upcoming" | "completed";
  provider?: {
    company_name: string;
  };
  updatedAt: string;
  createdAt?: string;
}

interface Message {
  id: number;
  package: {
    name: string;
  };
  createdAt: string;
}

interface DashboardStats {
  packages: {
    active: number;
    upcoming: number;
    completed: number;
    total: number;
  };
  invoices: {
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    count: number;
  };
  tickets: {
    open: number;
    resolved: number;
  };
  cyberHealth: {
    score: number;
    status?: string;
    lastScan?: string;
  };
  recentActivity: {
    packages: Package[];
    messages: Message[];
  };
}

export function useDashboardStats(): DashboardStatsHook {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  
  const isFetchingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearPollingInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fetchStats = useCallback(async () => {
    if (isFetchingRef.current || !user?.id) return;

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Always fetch dashboard stats
      const statsResponse = await fetch("/api/customer/dashboard/stats", {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!statsResponse.ok) {
        throw new Error(`Failed to fetch dashboard stats: ${statsResponse.status}`);
      }

      const statsData = await statsResponse.json();
      setStats(statsData.stats);

      // For providers, try to get company data via getCompany endpoint
      if (user?.role === "provider") {
        try {
          const companyResponse = await fetch("/api/getCompany", {
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          });

          if (companyResponse.ok) {
            const companyData = await companyResponse.json();
            setCompany(companyData.company);
          }
        } catch (companyError) {
          console.log("Company fetch failed (this is expected for new providers):", companyError);
          setCompany(null);
        }
      }

    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [user?.id, user?.role]);

  // Get user data from local storage - only once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to load user data");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch stats when user changes
  useEffect(() => {
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id, fetchStats]);

  // Setup polling only when user exists and not in development
  useEffect(() => {
    if (!user?.id) {
      clearPollingInterval();
      return;
    }

    // Don't set up polling in development to avoid multiple requests
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    clearPollingInterval();
    intervalRef.current = setInterval(fetchStats, 30000);

    return () => {
      clearPollingInterval();
    };
  }, [user?.id, fetchStats, clearPollingInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPollingInterval();
    };
  }, [clearPollingInterval]);

  return {
    stats,
    loading,
    error,
    user,
    company,
    refetch: fetchStats,
  };
}