"use client"

import { useState, useEffect } from "react"
import type { Invoice } from "@/lib/types"

export function useInvoices(status?: string) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [summary, setSummary] = useState({
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInvoices()
  }, [status])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const url = status ? `/api/customer/invoices?status=${status}` : "/api/customer/invoices"
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch invoices")
      }

      const data = await response.json()
      setInvoices(data.invoices)
      setSummary(data.summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return {
    invoices,
    summary,
    loading,
    error,
    refetch: fetchInvoices,
  }
}
