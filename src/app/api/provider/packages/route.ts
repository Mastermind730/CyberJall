import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prismadb";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, secret);
    const companyId = payload.companyId;
    const userId = payload.userId as string;
    const userRole = payload.role as string;

    if (userRole !== "provider") {
      return NextResponse.json(
        { error: "Provider access required" },
        { status: 403 }
      );
    }

    // If the provider doesn't have a companyId yet, return empty packages
    if (!companyId || companyId === "null" || companyId === null) {
      return NextResponse.json({
        packages: [],
        message: "No company profile found. Please create your company profile first."
      });
    }

    // Ensure companyId is a string for the database query
    const companyIdString = String(companyId);

    const packages = await prisma.package.findMany({
      where: {
        providerId: companyIdString,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Final packages count:", packages.length);

    return NextResponse.json({
      packages: packages,
    });
  } catch (error) {
    console.error("Error in provider packages API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}