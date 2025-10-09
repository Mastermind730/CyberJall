import { useState, useEffect } from "react";

interface BusinessBid {
  id: string;
  companyName: string;
  industry: string;
  serviceTypes: string[];
  description: string;
  urgency: "standard" | "urgent" | "critical";
  status: "approved" | "pending_review" | "closed";
  createdAt: string;
}

interface UseBidsResult {
  bids: BusinessBid[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBids(): UseBidsResult {
  const [bids, setBids] = useState<BusinessBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBids = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/getAllBids");
      if (response.ok) {
        const data = await response.json();
        setBids(data.bids || []);
      } else {
        setError("Failed to fetch business bids");
      }
    } catch (err) {
      setError("Error fetching business bids");
      console.error("Error fetching bids:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  const refetch = () => {
    fetchBids();
  };

  return {
    bids,
    loading,
    error,
    refetch,
  };
}