import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 });
    }

    const authToken = cookieHeader
      .split(';')
      .find(c => c.trim().startsWith('auth_token='))
      ?.split('=')[1];

    if (!authToken) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 });
    }

    // Verify JWT token
    let payload;
    try {
      const result = await jwtVerify(authToken, secret);
      payload = result.payload;
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = payload.userId as string;

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        work_email: true,
        company_name: true,
        role: true,
        validatedCompanyId: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has a company profile
    let company = null;
    if (user.role === "provider") {
      // For providers, check if they have created a company profile
      company = await prisma.company.findFirst({
        where: {
          // You might need to adjust this based on how you link users to companies
          // For now, assuming company_name is used as a link
          company_name: user.company_name
        }
      });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.work_email,
        company_name: user.company_name,
        role: user.role,
        companyId: user.validatedCompanyId,
      },
      company: company,
      hasCompany: !!company
    }, { status: 200 });

  } catch (error: unknown) {
    console.error("GetCompany error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company_name } = body;

    const company = await prisma.validated_Company.findFirst({
      where: {
        company_name: company_name
      }
    });

    if (!company) {
      return NextResponse.json("Company not found", { status: 404 });
    }

    const company_logo = company.logo;

    return NextResponse.json({ "company_logo": company_logo }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ "error": error }, { status: 500 });
  }
}