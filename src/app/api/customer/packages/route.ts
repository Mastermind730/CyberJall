import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from "@/lib/prismadb";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, secret);
    console.log('JWT Payload:', payload);
    
    const userId = (payload.userId || payload.id) as string;
    const userRole = payload.role as string;

    // Check if user is a customer
    if (userRole !== 'customer') {
      return NextResponse.json(
        { error: 'Customer access required' },
        { status: 403 }
      );
    }

    // Get status filter from query parameters
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');

    // Build where clause
    const whereClause = {
      userId: userId,
      ...(statusFilter && { status: statusFilter as 'active' | 'upcoming' | 'completed' | 'cancelled' })
    };

    // Fetch packages where userId matches the logged-in customer's ID
    const packages = await prisma.package.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      packages: packages,
    });

  } catch (error) {
    console.error('Error in customer packages API:', error);
    
    if (error instanceof Error) {
      if (error.name === 'JWTExpired') {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }
      
      if (error.name === 'JWTInvalid') {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, secret);
    const userId = (payload.userId || payload.id) as string;
    const userRole = payload.role as string;

    // Check if user is a customer
    if (userRole !== 'customer') {
      return NextResponse.json(
        { error: 'Customer access required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      name,
      description,
      services,
      providerId,
      totalAmount,
      startDate,
      endDate,
      projectCategory,
      clientCompany,
      summary
    } = body;

    // Validate required fields
    if (!name || !description || !services || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, services, totalAmount' },
        { status: 400 }
      );
    }

    // Create new package
    const newPackage = await prisma.package.create({
      data: {
        name,
        description,
        services: Array.isArray(services) ? services : [services],
        userId,
        providerId: providerId || null,
        totalAmount: Number(totalAmount),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        projectCategory: projectCategory || null,
        clientCompany: clientCompany || null,
        summary: summary || null,
        status: 'upcoming', // Default status for newly created packages
        reports: []
      }
    });

    return NextResponse.json({
      package: newPackage,
      message: 'Package created successfully'
    });

  } catch (error) {
    console.error('Error creating customer package:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}