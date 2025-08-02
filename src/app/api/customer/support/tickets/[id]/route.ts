import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import  prisma  from "@/lib/prismadb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ticket = await prisma.supportTicket.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error("Error fetching ticket:", error)
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
    const { response, attachments = [] } = body

    const ticket = await prisma.supportTicket.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Add new response to existing responses
    const newResponse = {
      id: Date.now().toString(),
      content: response,
      sender: "customer",
      timestamp: new Date().toISOString(),
      attachments,
    }

    const updatedResponses = [...(ticket.responses as any[]), newResponse]

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: params.id },
      data: {
        responses: updatedResponses,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ ticket: updatedTicket })
  } catch (error) {
    console.error("Error updating ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
