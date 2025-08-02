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
    const status = searchParams.get("status")

    const whereClause: any = {
      userId: session.user.id,
    }

    if (status && status !== "all") {
      whereClause.status = status
    }

    const packages = await prisma.package.findMany({
      where: whereClause,
      include: {
        provider: {
          select: {
            id: true,
            company_name: true,
            logo: true,
            website: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: {
                isFromProvider: true,
                createdAt: {
                  gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ packages })
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, services, providerId, totalAmount, startDate, endDate } = body

    const newPackage = await prisma.package.create({
      data: {
        name,
        description,
        services,
        providerId,
        totalAmount,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        userId: session.user.id,
        status: "upcoming",
      },
      include: {
        provider: {
          select: {
            id: true,
            company_name: true,
            logo: true,
            website: true,
          },
        },
      },
    })

    return NextResponse.json({ package: newPackage })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
