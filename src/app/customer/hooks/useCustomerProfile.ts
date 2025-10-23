"use client";

import { useEffect, useState, useRef } from "react";

export interface CustomerProfileData {
  user: {
    id: string;
    work_email: string;
    company_name: string;
    contact: string;
    role: string;
  } | null;
  profile: {
    id: string;
    userId: string;
    firstName: string | null;
    lastName: string | null;
    jobTitle: string | null;
    phone: string | null;
    avatar: string | null;
    twoFactorEnabled?: boolean;
    lastLogin?: string | null;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

export function useCustomerProfile(pollMs = 5000) {
  const [data, setData] = useState<CustomerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/customer/profile", { credentials: "include" });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as CustomerProfileData;
      setData(json);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (pollMs > 0) {
      timerRef.current = setInterval(fetchData, pollMs);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pollMs]);

  const save = async (payload: Partial<CustomerProfileData["profile"]> & { company_name?: string; contact?: string }) => {
    const res = await fetch("/api/customer/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    const json = (await res.json()) as CustomerProfileData & { updated: boolean };
    setData({ user: json.user, profile: json.profile });
    return json;
  };

  return { data, loading, error, refresh: fetchData, save };
}
