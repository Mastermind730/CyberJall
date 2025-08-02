import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const packageData = await prisma.package.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        provider: {
          select: {
            id: true,
            company_name: true,
            logo: true,
            website: true,
            overview: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                work_email: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ package: packageData })
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, summary } = body

    const updatedPackage = await prisma.package.updateMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        status,
        summary,
        updatedAt: new Date(),
      },
    })

    if (updatedPackage.count === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
