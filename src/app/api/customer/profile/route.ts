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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching profile:", error)
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
    const { firstName, lastName, jobTitle, phone, companyName, industry, companySize, website, address } = body

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        company_name: companyName || undefined,
        contact: phone || undefined,
      },
    })

    // Update or create profile
    const updatedProfile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        jobTitle: jobTitle || undefined,
        phone: phone || undefined,
      },
      create: {
        userId: session.user.id,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        jobTitle: jobTitle || undefined,
        phone: phone || undefined,
      },
    })

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
