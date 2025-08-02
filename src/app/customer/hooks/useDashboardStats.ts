"use client"

import { useState, useEffect } from "react"

interface DashboardStats {
  packages: {
    active: number
    upcoming: number
    completed: number
    total: number
  }
  invoices: {
    totalAmount: number
    paidAmount: number
    unpaidAmount: number
    count: number
  }
  tickets: {
    open: number
  }
  cyberHealth: {
    score: number
  }
  recentActivity: {
    packages: any[]
    messages: any[]
  }
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/customer/dashboard/stats")

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats")
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
