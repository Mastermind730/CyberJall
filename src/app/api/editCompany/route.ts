import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    // Check if request has a body
    if (!req.body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    // Parse the body as JSON
    const data = await req.json();
    
    // Validate required fields
    if (!data?.company_name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Remove non-updatable fields and prepare update data
    const { id, createdAt, updatedAt, ...updateData } = data;

    // Process array fields
    const arrayFields = [
      'industries_served',
      'target_business_size',
      'geographic_coverage'
    ];
    
    arrayFields.forEach(field => {
      if (typeof updateData[field] === 'string') {
        updateData[field] = updateData[field]
          .split(',')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      } else if (!updateData[field]) {
        updateData[field] = []; // Ensure array fields are at least empty arrays
      }
    });

    // Handle nested array fields with proper typing
    if (updateData.services_offered) {
      updateData.services_offered = updateData.services_offered.map((service: any) => ({
        name: service.name || '',
        description: service.description || '',
        image: service.image || ''
      }));
    }

    if (updateData.expertise_and_certifications) {
      updateData.expertise_and_certifications = updateData.expertise_and_certifications.map((cert: any) => ({
        type: cert.type || '',
        name: cert.name || '',
        logo: cert.logo || ''
      }));
    }

    // Update the company
    const updatedCompany = await prisma.company.update({
      where: { company_name: data.company_name },
      data: updateData
    });

    return NextResponse.json({
      message: 'Company updated successfully',
      company: updatedCompany
    });

  } catch (error: any) {
    console.error('Error updating company:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Company not found', details: error.meta?.cause },
        { status: 404 }
      );
    }

    // Handle validation errors
    if (error.name === 'PrismaClientValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message.split('\n').slice(0, 5).join('\n') },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'Failed to update company data',
        details: error.message,
        ...(error.code && { code: error.code })
      },
      { status: 500 }
    );
  }
}