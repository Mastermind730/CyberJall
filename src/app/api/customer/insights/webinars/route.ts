import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get("upcoming") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (upcoming) {
      whereClause.scheduledAt = {
        gte: new Date(),
      }
    }

    const webinars = await prisma.webinar.findMany({
      where: whereClause,
      orderBy: { scheduledAt: upcoming ? "asc" : "desc" },
      take: limit,
    })

    return NextResponse.json({ webinars })
  } catch (error) {
    console.error("Error fetching webinars:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
