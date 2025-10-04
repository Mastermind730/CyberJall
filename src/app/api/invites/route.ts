import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prismadb";
import { jwtVerify } from 'jose';


const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');

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
    const userId = payload.userId as string;
    const userRole = payload.role as string;

    // Check if user is a customer
    if (userRole !== 'customer') {
      return NextResponse.json(
        { error: 'Only customers can send invites' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { providerId, message, serviceTypes, urgency, budget } = body;

    // Validate required fields
    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // Check if provider exists
    const provider = await prisma.user.findUnique({
      where: { id: providerId, role: 'provider' }
    });

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    // Get customer details
    const customer = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Check if there's already a pending invite
    const existingInvite = await prisma.invite.findFirst({
      where: {
        customerId: userId,
        providerId: providerId,
        status: 'pending'
      }
    });

    if (existingInvite) {
      return NextResponse.json(
        { error: 'You already have a pending invite with this provider' },
        { status: 409 }
      );
    }

    // Create the invite
    const invite = await prisma.invite.create({
      data: {
        customerId: userId,
        providerId: providerId,
        message: message || '',
        serviceTypes: serviceTypes || [],
        urgency: urgency || 'standard',
        budget: budget || null,
        status: 'pending'
      },
      include: {
        customer: {
          select: {
            id: true,
            company_name: true,
            work_email: true
          }
        },
        provider: {
          select: {
            id: true,
            company_name: true,
            work_email: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Invite sent successfully',
      invite
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating invite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

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
    const userId = payload.userId as string;
    const userRole = payload.role as string;

    // Get invites based on user role
    let invites;
    if (userRole === 'customer') {
      // Customer sees invites they sent
      invites = await prisma.invite.findMany({
        where: { customerId: userId },
        include: {
          provider: {
            select: {
              id: true,
              company_name: true,
              work_email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else if (userRole === 'provider') {
      // Provider sees invites they received
      invites = await prisma.invite.findMany({
        where: { providerId: userId },
        include: {
          customer: {
            select: {
              id: true,
              company_name: true,
              work_email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid user role' },
        { status: 403 }
      );
    }

    return NextResponse.json({ invites });

  } catch (error) {
    console.error('Error fetching invites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}