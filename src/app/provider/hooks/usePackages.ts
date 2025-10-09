import { useState, useEffect } from "react";

interface ProviderPackage {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "cancelled";
  startDate?: string;
  endDate?: string;
  userId: string;
  providerId?: string;
  services: string[];
  totalAmount: number;
  projectCategory?: string;
  clientCompany?: string;
  summary?: string;
  reports: unknown;
  createdAt: string;
  updatedAt: string;
}

interface UsePackagesResult {
  packages: ProviderPackage[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePackages(): UsePackagesResult {
  const [packages, setPackages] = useState<ProviderPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/provider/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
      } else {
        setError("Failed to fetch packages");
      }
    } catch (err) {
      setError("Error fetching packages");
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const refetch = () => {
    fetchPackages();
  };

  return {
    packages,
    loading,
    error,
    refetch,
  };
}