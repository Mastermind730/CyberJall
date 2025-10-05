import { NextResponse } from 'next/server';
import prisma from "@/lib/prismadb";

// TEST ENDPOINT - Remove this in production
export async function GET() {
  try {
    // For testing, let's find a user with role 'provider' and use their data
    const providerUser = await prisma.user.findFirst({
      where: { 
        role: 'provider',
        validatedCompanyId: { not: null }
      }
    });

    if (!providerUser?.validatedCompanyId) {
      return NextResponse.json(
        { error: 'No provider found for testing' },
        { status: 404 }
      );
    }

    console.log('Testing with provider user:', {
      id: providerUser.id,
      company_name: providerUser.company_name,
      validatedCompanyId: providerUser.validatedCompanyId
    });

    // Fetch packages where providerId matches the validatedCompanyId
    const packages = await prisma.package.findMany({
      where: {
        providerId: providerUser.validatedCompanyId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Found packages:', packages.length);

    // Group packages by status for statistics
    const packageStats = {
      all: packages.length,
      ongoing: packages.filter(pkg => 
        pkg.status === 'active' || pkg.status === 'upcoming'
      ).length,
      completed: packages.filter(pkg => pkg.status === 'completed').length,
      upcoming: packages.filter(pkg => pkg.status === 'upcoming').length
    };

    // Get customer and provider details for each package
    const transformedPackages = await Promise.all(packages.map(async (pkg) => {
      // Get customer details
      const customer = await prisma.user.findUnique({
        where: { id: pkg.userId },
        select: {
          id: true,
          company_name: true,
          work_email: true
        }
      });

      // Get provider details if providerId exists
      const provider = pkg.providerId ? await prisma.validated_Company.findUnique({
        where: { id: pkg.providerId },
        select: {
          id: true,
          company_name: true
        }
      }) : null;

      return {
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        status: pkg.status,
        startDate: pkg.startDate,
        endDate: pkg.endDate,
        services: pkg.services,
        totalAmount: pkg.totalAmount,
        projectCategory: pkg.projectCategory || null,
        clientCompany: pkg.clientCompany || null,
        summary: pkg.summary,
        createdAt: pkg.createdAt.toISOString(),
        updatedAt: pkg.updatedAt.toISOString(),
        customer: customer,
        provider: provider
      };
    }));

    return NextResponse.json({
      message: 'TEST ENDPOINT - Provider Packages',
      testUser: {
        id: providerUser.id,
        company_name: providerUser.company_name,
        validatedCompanyId: providerUser.validatedCompanyId
      },
      packages: transformedPackages,
      stats: packageStats
    });

  } catch (error) {
    console.error('Error in test provider packages API:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}