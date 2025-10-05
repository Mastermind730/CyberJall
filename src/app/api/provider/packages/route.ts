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
    const companyId = String(payload.companyId); // Ensure string
    const userRole = payload.role as string;

    // console.log("🔍 Debug Info:");
    // console.log("JWT companyId:", companyId);
    // console.log("Expected providerId:", "686baba356b033954e2440f1");
    // console.log("Match:", companyId === "686baba356b033954e2440f1");

    if (userRole !== "provider") {
      return NextResponse.json(
        { error: "Provider access required" },
        { status: 403 }
      );
    }

    // Test with exact known ID first
    // const testPackage = await prisma.package.findFirst({
    //   where: {
    //     providerId: "686baba356b033954e2440f1",
    //   },
    // });
    // console.log("Test package with known ID:", testPackage);

    // Then try with the JWT companyId
    const packages = await prisma.package.findMany({
      where: {
        providerId: companyId,
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