"use client"

import { useState, useEffect, useCallback } from "react"
import type { SupportTicket } from "@/lib/types"

export function useSupportTickets(status?: string, priority?: string) {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

   const fetchTickets = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (status) params.append("status", status)
      if (priority) params.append("priority", priority)

      const url = `/api/customer/support/tickets?${params.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch tickets")
      }

      const data = await response.json()
      setTickets(data.tickets)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  },[priority,status])

  useEffect(() => {
    fetchTickets()
  }, [status,fetchTickets, priority])

 

  const createTicket = async (ticketData: {
    title: string
    description: string
    category: string
    priority: string
    attachments?: string[]
  }) => {
    try {
      const response = await fetch("/api/customer/support/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      })

      if (!response.ok) {
        throw new Error("Failed to create ticket")
      }

      const data = await response.json()
      setTickets((prev) => [data.ticket, ...prev])
      return data.ticket
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const updateTicket = async (ticketId: string, response: string, attachments?: string[]) => {
    try {
      const res = await fetch(`/api/customer/support/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response, attachments }),
      })

      if (!res.ok) {
        throw new Error("Failed to update ticket")
      }

      const data = await res.json()
      setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? data.ticket : ticket)))
      return data.ticket
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return {
    tickets,
    loading,
    error,
    refetch: fetchTickets,
    createTicket,
    updateTicket,
  }
}
