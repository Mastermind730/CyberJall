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
    const category = searchParams.get("category")
    const industry = searchParams.get("industry")
    const severity = searchParams.get("severity")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (category && category !== "all") {
      whereClause.category = category
    }

    if (industry && industry !== "all") {
      whereClause.industry = {
        has: industry,
      }
    }

    if (severity && severity !== "all") {
      whereClause.severity = severity
    }

    const articles = await prisma.newsArticle.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
      take: limit,
    })

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
