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

    // Verify user owns the package
    const packageExists = await prisma.package.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!packageExists) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    const messages = await prisma.message.findMany({
      where: { packageId: params.id },
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
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content, attachments = [] } = body

    // Verify user owns the package
    const packageExists = await prisma.package.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!packageExists) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        attachments,
        senderId: session.user.id,
        packageId: params.id,
        isFromProvider: false,
      },
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
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
