import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    // Check what data we have in the database
    const userCount = await prisma.user.count();
    const packageCount = await prisma.package.count();
    const companyCount = await prisma.validated_Company.count();

    // Get some sample data
    const providers = await prisma.user.findMany({
      where: { role: "provider" },
      select: {
        id: true,
        company_name: true,
        work_email: true,
        role: true,
        validatedCompanyId: true,
      },
      take: 5,
    });

    const packages = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        providerId: true,
        userId: true,
      },
      take: 5,
    });

    const companies = await prisma.validated_Company.findMany({
      select: {
        id: true,
        company_name: true,
      },
      take: 5,
    });

    return NextResponse.json({
      message: "Database Data Check",
      counts: {
        users: userCount,
        packages: packageCount,
        companies: companyCount,
      },
      sampleData: {
        providers,
        packages,
        companies,
      },
    });
  } catch (error) {
    console.error("Database check error:", error);
    return NextResponse.json(
      {
        error: "Database error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
