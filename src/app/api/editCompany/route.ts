import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    // First check if request has a body
    if (!req.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    // Parse the body as JSON
    let data;
    try {
      data = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Now check for company_name
    if (!data?.company_name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Rest of your existing code...
    const arrayFields = [
      'industries_served',
      'target_business_size',
      'geographic_coverage'
    ];
    
    const updateData = { ...data };
    
    arrayFields.forEach(field => {
      if (typeof updateData[field] === 'string') {
        updateData[field] = updateData[field]
          .split(',')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      }
    });
    console.log(data,"data",updateData);

    const updatedCompany = await prisma.company.upsert({
      where: { company_name: data.company_name },
      update: updateData,
      create: {
        ...updateData,
        logo: data.logo || '',
        overview: data.overview || '',
        year_founded: data.year_founded || 0,
        headquarters_city: data.headquarters_city || '',
        headquarters_country: data.headquarters_country || '',
        team_size: data.team_size || '',
        website: data.website || '',
        services_offered: data.services_offered || {},
        expertise_and_certifications: data.expertise_and_certifications || {},
        case_studies: data.case_studies || {},
        client_reviews: data.client_reviews || {},
        social_links: data.social_links || {},
        products: data.products || {}
      }
    });
    console.log(updatedCompany,"updatedCompany")

    return NextResponse.json({
      message: 'Company updated successfully',
      company: updatedCompany
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Failed to update company data' },
      { status: 500 }
    );
  }
}