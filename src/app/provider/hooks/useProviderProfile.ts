import { useState, useEffect } from "react";

interface User {
  role: string;
  company_name?: string;
  work_email: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    lastLogin?: string;
  };
}

interface Company {
  logo?: string;
  company_name: string;
  overview?: string;
  year_founded?: string;
  headquarters_city?: string;
  headquarters_country?: string;
  team_size?: string;
  website?: string;
  industries_served?: string[];
  geographic_coverage?: string[];
  target_business_size?: string[];
  certifications?: string[];
  contact_email?: string;
  contact_phone?: string;
}

interface UseProviderProfileResult {
  user: User | null;
  company: Company | null;
  hasCompany: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProviderProfile(): UseProviderProfileResult {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [hasCompany, setHasCompany] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate user data fetch - replace with actual API call
      const userData: User = {
        role: "provider",
        work_email: "provider@example.com",
        profile: {
          firstName: "John",
          lastName: "Smith",
          phone: "+1 (555) 123-4567",
          lastLogin: new Date().toISOString(),
        },
      };
      setUser(userData);

      // Fetch company data
      const response = await fetch("/api/getCompany");
      if (response.ok) {
        const data = await response.json();
        setCompany(data.company);
        setHasCompany(!!data.company);
      } else {
        setHasCompany(false);
      }
    } catch (err) {
      setError("Error fetching profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refetch = () => {
    fetchProfile();
  };

  return {
    user,
    company,
    hasCompany,
    loading,
    error,
    refetch,
  };
}