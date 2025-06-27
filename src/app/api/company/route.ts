import { NextResponse } from 'next/server';
import prisma  from '@/lib/prismadb';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const search = searchParams.get('search') || '';
    const industry = searchParams.get('industry') || '';
    const service = searchParams.get('service') || '';
    const certification = searchParams.get('certification') || '';
    const location = searchParams.get('location') || '';
    const teamSize = searchParams.get('teamSize') || '';
    const minExperience = searchParams.get('minExperience') || '';

    // Build the where clause for Prisma
    const where: any = {};

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
      };
    }

    // Certification filter (checking expertise_and_certifications JSON)
    if (certification) {
      where.expertise_and_certifications = {
        path: ['certifications'],
        array_contains: [certification],
      };
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
      const minYear = currentYear - parseInt(minExperience);
      where.year_founded = {
        lte: minYear,
      };
    }

    // Query the database
    const companies = await prisma.company.findMany({
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
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}