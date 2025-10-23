import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prismadb";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

async function getUserIdFromRequest(req: NextRequest): Promise<string | null> {
  try {
    const authToken = req.cookies.get("auth_token")?.value;
    if (!authToken) return null;
    const result = await jwtVerify(authToken, secret);
    const payload = result.payload as any;
    return payload.userId as string;
  } catch (e) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        work_email: user.work_email,
        company_name: user.company_name,
        contact: user.contact,
        role: user.role,
      },
      profile: user.profile ?? null,
    });
  } catch (error) {
    console.error("GET /api/customer/profile failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      jobTitle,
      phone,
      avatar,
      company_name,
      contact,
    }: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      phone?: string;
      avatar?: string;
      company_name?: string;
      contact?: string;
    } = body || {};

    // Upsert the Profile on userId (unique)
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(jobTitle !== undefined ? { jobTitle } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(avatar !== undefined ? { avatar } : {}),
      },
      create: {
        userId,
        firstName: firstName ?? null,
        lastName: lastName ?? null,
        jobTitle: jobTitle ?? null,
        phone: phone ?? null,
        avatar: avatar ?? null,
      },
    });

    // Optionally update User basic fields
    if (company_name !== undefined || contact !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          ...(company_name !== undefined ? { company_name } : {}),
          ...(contact !== undefined ? { contact } : {}),
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    return NextResponse.json({
      user: user
        ? {
            id: user.id,
            work_email: user.work_email,
            company_name: user.company_name,
            contact: user.contact,
            role: user.role,
          }
        : null,
      profile,
      updated: true,
    });
  } catch (error) {
    console.error("PUT /api/customer/profile failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
