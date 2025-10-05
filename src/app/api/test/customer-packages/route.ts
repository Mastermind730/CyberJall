import { NextResponse } from 'next/server';
import prisma from "@/lib/prismadb";

// TEST ENDPOINT - Remove this in production
export async function GET() {
  try {
    // For testing, let's find a user with role 'customer' and use their data
    const customerUser = await prisma.user.findFirst({
      where: { 
        role: 'customer'
      }
    });

    if (!customerUser) {
      return NextResponse.json(
        { error: 'No customer found for testing' },
        { status: 404 }
      );
    }

    console.log('Testing with customer user:', {
      id: customerUser.id,
      company_name: customerUser.company_name,
      role: customerUser.role
    });

    // Fetch packages where userId matches the customer's ID
    const packages = await prisma.package.findMany({
      where: {
        userId: customerUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Found packages for customer:', packages.length);

    return NextResponse.json({
      message: 'TEST ENDPOINT - Customer Packages',
      testUser: {
        id: customerUser.id,
        company_name: customerUser.company_name,
        role: customerUser.role
      },
      packages: packages
    });

  } catch (error) {
    console.error('Error in test customer packages API:', error);
    
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