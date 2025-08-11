import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create the bid in the database
    const bid = await prisma.businessBid.create({
      data: {
        companyName: data.companyName,
        industry: data.industry,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || null,
        website: data.website || null,
        serviceTypes: data.serviceTypes,
        description: data.description,
        infrastructureSize: data.infrastructureSize,
        urgency: data.urgency,
        complianceGoals: data.complianceGoals,
        budget: data.budget ? parseFloat(data.budget) : null,
        additionalNotes: data.additionalNotes || null,
        documents: data.documents,
        status: 'pending_review',
      },
    });

    // Here you would typically:
    // 1. Notify admin about the new bid
    // 2. Broadcast to selected providers if any were selected
    // 3. Trigger any other business logic

    return NextResponse.json({ success: true, bid }, { status: 201 });
  } catch (error) {
    console.error('Error creating bid:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bid' },
      { status: 500 }
    );
  }
}