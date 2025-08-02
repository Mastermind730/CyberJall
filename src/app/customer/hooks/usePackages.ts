"use client"

import { useState, useEffect } from "react"
import type { Package } from "@/lib/types"

export function usePackages(status?: string) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPackages()
  }, [status])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const url = status ? `/api/customer/packages?status=${status}` : "/api/customer/packages"
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch packages")
      }

      const data = await response.json()
      setPackages(data.packages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createPackage = async (packageData: Partial<Package>) => {
    try {
      const response = await fetch("/api/customer/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      })

      if (!response.ok) {
        throw new Error("Failed to create package")
      }

      const data = await response.json()
      setPackages((prev) => [data.package, ...prev])
      return data.package
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return {
    packages,
    loading,
    error,
    refetch: fetchPackages,
    createPackage,
  }
}
