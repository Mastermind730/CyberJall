/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    const { 
      company_name, 
      logo, 
      overview, 
      year_founded,
      headquarters_city,
      headquarters_country,
      services_offered, 
      expertise_and_certifications, 
      case_studies,
      client_reviews,
      social_links,
      website 
    } = data;

    // Validate required fields
    if (!company_name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    // Create the new company record
    const new_company = await prisma.company.create({
      data: {
        company_name,
        logo,
        overview,
        year_founded: parseInt(year_founded),
        headquarters_city,
        headquarters_country,
        services_offered,
        expertise_and_certifications,
        case_studies,
        client_reviews,
        social_links,
        website,
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
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}