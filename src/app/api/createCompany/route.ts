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
      industries_served,
      target_business_size,
      geographic_coverage,
      team_size,
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
        logo,
        overview,
        year_founded: parseInt(year_founded),
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
        website
        // createdAt and updatedAt are automatically handled by Prisma
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
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const companies = await prisma.company.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       },
//       take: 100
//     });

//     return NextResponse.json(companies, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching companies:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }