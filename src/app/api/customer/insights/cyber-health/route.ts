import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cyberHealth = await prisma.cyberHealthScore.findUnique({
      where: { userId: session.user.id },
    })

    if (!cyberHealth) {
      // Create default cyber health score if doesn't exist
      const defaultCyberHealth = await prisma.cyberHealthScore.create({
        data: {
          userId: session.user.id,
          score: 75,
          lastAssessment: new Date(),
          improvements: [
            {
              title: "Enable Multi-Factor Authentication",
              description: "Implement MFA for all administrative accounts",
              priority: "high",
              impact: "+8 points",
            },
            {
              title: "Update Email Security Policies",
              description: "Strengthen email filtering and user training",
              priority: "medium",
              impact: "+5 points",
            },
          ],
          riskFactors: [
            {
              factor: "Email Security",
              severity: "medium",
              description: "Current email security measures need improvement",
            },
          ],
          recommendations: [
            {
              category: "Access Control",
              suggestion: "Implement MFA for all admin accounts",
              priority: "high",
            },
          ],
        },
      })
      return NextResponse.json({ cyberHealth: defaultCyberHealth })
    }

    return NextResponse.json({ cyberHealth })
  } catch (error) {
    console.error("Error fetching cyber health:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { score, improvements, riskFactors, recommendations } = body

    const updatedCyberHealth = await prisma.cyberHealthScore.upsert({
      where: { userId: session.user.id },
      update: {
        score,
        improvements,
        riskFactors,
        recommendations,
        lastAssessment: new Date(),
      },
      create: {
        userId: session.user.id,
        score,
        improvements,
        riskFactors,
        recommendations,
        lastAssessment: new Date(),
      },
    })

    return NextResponse.json({ cyberHealth: updatedCyberHealth })
  } catch (error) {
    console.error("Error updating cyber health:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
