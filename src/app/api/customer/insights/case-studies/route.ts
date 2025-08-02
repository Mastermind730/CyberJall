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
    const industry = searchParams.get("industry")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (industry && industry !== "all") {
      whereClause.industry = industry
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return NextResponse.json({ caseStudies })
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
