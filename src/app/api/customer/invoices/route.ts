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

    const invoices = await prisma.invoice.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })

    // Calculate totals
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidAmount = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
    const unpaidAmount = totalAmount - paidAmount

    return NextResponse.json({
      invoices,
      summary: {
        totalAmount,
        paidAmount,
        unpaidAmount,
      },
    })
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
