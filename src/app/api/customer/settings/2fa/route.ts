import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma  from "@/lib/prismadb"

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { enabled } = body

    // Update 2FA setting in profile
    const updatedProfile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: { twoFactorEnabled: enabled },
      create: {
        userId: session.user.id,
        twoFactorEnabled: enabled,
      },
    })

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error("Error updating 2FA setting:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
