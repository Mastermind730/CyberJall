import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma  from "@/lib/prismadb"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get package stats
    const packageStats = await prisma.package.groupBy({
      by: ["status"],
      where: { userId: session.user.id },
      _count: { status: true },
    })

    // Get invoice stats
    const invoiceStats = await prisma.invoice.aggregate({
      where: { userId: session.user.id },
      _sum: {
        amount: true,
        paidAmount: true,
      },
      _count: {
        id: true,
      },
    })

    // Get open tickets count
    const openTicketsCount = await prisma.supportTicket.count({
      where: {
        userId: session.user.id,
        status: { in: ["open", "in_progress"] },
      },
    })

    // Get cyber health score
    const cyberHealth = await prisma.cyberHealthScore.findUnique({
      where: { userId: session.user.id },
      select: { score: true },
    })

    // Get recent activity
    const recentPackages = await prisma.package.findMany({
      where: { userId: session.user.id },
      include: {
        provider: {
          select: { company_name: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 3,
    })

    const recentMessages = await prisma.message.findMany({
      where: {
        package: { userId: session.user.id },
        isFromProvider: true,
      },
      include: {
        package: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    })

    // Format package stats
    const formattedPackageStats = {
      active: packageStats.find((p) => p.status === "active")?._count.status || 0,
      upcoming: packageStats.find((p) => p.status === "upcoming")?._count.status || 0,
      completed: packageStats.find((p) => p.status === "completed")?._count.status || 0,
      total: packageStats.reduce((sum, p) => sum + p._count.status, 0),
    }

    const stats = {
      packages: formattedPackageStats,
      invoices: {
        totalAmount: invoiceStats._sum.amount || 0,
        paidAmount: invoiceStats._sum.paidAmount || 0,
        unpaidAmount: (invoiceStats._sum.amount || 0) - (invoiceStats._sum.paidAmount || 0),
        count: invoiceStats._count.id || 0,
      },
      tickets: {
        open: openTicketsCount,
      },
      cyberHealth: {
        score: cyberHealth?.score || 0,
      },
      recentActivity: {
        packages: recentPackages,
        messages: recentMessages,
      },
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
