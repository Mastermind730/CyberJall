import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import type { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters with type safety
    const search = searchParams.get('search') ?? '';
    const industry = searchParams.get('industry') ?? '';
    const service = searchParams.get('service') ?? '';
    const certification = searchParams.get('certification') ?? '';
    const location = searchParams.get('location') ?? '';
    const teamSize = searchParams.get('teamSize') ?? '';
    const minExperience = searchParams.get('minExperience') ?? '';

    // Build the where clause with proper typing
    const where: Prisma.Validated_CompanyWhereInput = {};

    // Search filter (company name)
    if (search) {
      where.company_name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Industry filter
    if (industry) {
      where.industries_served = {
        has: industry,
      };
    }

    // Service filter (checking services_offered JSON)
    if (service) {
      where.services_offered = {
        path: ['services'],
        array_contains: [service],
      } as Prisma.JsonFilter; // Explicit type for JSON filter
    }

    // Certification filter (checking expertise_and_certifications JSON)
    if (certification) {
      where.expertise_and_certifications = {
        path: ['certifications'],
        array_contains: [certification],
      } as Prisma.JsonFilter;
    }

    // Location filter (city or country)
    if (location) {
      where.OR = [
        {
          headquarters_city: {
            contains: location,
            mode: 'insensitive',
          },
        },
        {
          headquarters_country: {
            contains: location,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Team size filter
    if (teamSize) {
      where.team_size = teamSize;
    }

    // Minimum experience filter (based on year founded)
    if (minExperience) {
      const currentYear = new Date().getFullYear();
      const minYear = currentYear - parseInt(minExperience, 10);
      where.year_founded = {
        lte: minYear,
      };
    }

    // Define the select type for the response
    type CompanyResponse = Pick<
      Prisma.Validated_CompanyGetPayload<{}>,
      | 'id'
      | 'company_name'
      | 'logo'
      | 'website'
      | 'year_founded'
      | 'headquarters_city'
      | 'headquarters_country'
      | 'industries_served'
      | 'team_size'
      | 'services_offered'
      | 'expertise_and_certifications'
    >;

    // Query the database with proper typing
    const companies: CompanyResponse[] = await prisma.validated_Company.findMany({
      where,
      select: {
        id: true,
        company_name: true,
        logo: true,
        website: true,
        year_founded: true,
        headquarters_city: true,
        headquarters_country: true,
        industries_served: true,
        team_size: true,
        services_offered: true,
        expertise_and_certifications: true,
      },
      orderBy: {
        company_name: 'asc',
      },
    });

    return NextResponse.json(companies);
  } catch (error: unknown) {
    console.error('Error fetching companies:', error);
    
    // Type-safe error handling
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch companies';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}