import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import  prisma  from "@/lib/prismadb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")

    const whereClause: any = {
      userId: session.user.id,
    }

    if (status && status !== "all") {
      whereClause.status = status
    }

    if (priority && priority !== "all") {
      whereClause.priority = priority
    }

    const tickets = await prisma.supportTicket.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("Error fetching tickets:", error)
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
    const { title, description, category, priority, attachments = [] } = body

    // Generate ticket number
    const ticketCount = await prisma.supportTicket.count()
    const ticketNumber = `TKT-${new Date().getFullYear()}-${String(ticketCount + 1).padStart(3, "0")}`

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        title,
        description,
        priority: priority || "medium",
        attachments,
        userId: session.user.id,
        status: "open",
        responses: [
          {
            id: Date.now().toString(),
            content: description,
            sender: "customer",
            timestamp: new Date().toISOString(),
            attachments,
          },
        ],
      },
    })

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error("Error creating ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
