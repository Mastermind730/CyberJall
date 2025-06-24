/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // First check if request body exists
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Parse the request body
    let data;
    try {
      data = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // Validate data exists
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: "Payload must be a valid JSON object" },
        { status: 400 }
      );
    }

    const { 
      company_name, 
      logo, 
      overview, 
      year_founded,
      headquarters_city,
      headquarters_country,
      industries_served,
      target_business_size,
      geographic_coverage,
      team_size,
      services_offered, 
      expertise_and_certifications, 
      case_studies,
      client_reviews,
      social_links,
      website,
      products = [] // Default to empty array if not provided
    } = data;

    // Validate required fields
    if (!company_name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    if (!industries_served || industries_served.length === 0) {
      return NextResponse.json(
        { error: "At least one industry must be selected" },
        { status: 400 }
      );
    }

    if (!team_size) {
      return NextResponse.json(
        { error: "Team size is required" },
        { status: 400 }
      );
    }

    // Create the new company record
    const new_company = await prisma.company.create({
      data: {
        company_name,
        logo: logo || "", // Default to empty string if not provided
        overview: overview || "", // Default to empty string if not provided
        year_founded: parseInt(year_founded) || 2000, // Default year if not provided
        headquarters_city: headquarters_city || "",
        headquarters_country: headquarters_country || "",
        industries_served: industries_served || [],
        target_business_size: target_business_size || [],
        geographic_coverage: geographic_coverage || [],
        team_size,
        services_offered: services_offered || [],
        expertise_and_certifications: expertise_and_certifications || [],
        case_studies: case_studies || [],
        client_reviews: client_reviews || [],
        social_links: social_links || [],
        website: website || "",
        products: products || [], // Ensure products is always an array
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(new_company, { status: 201 });
  } catch (error: any) {
    console.error("Error creating company:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A company with this name already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}