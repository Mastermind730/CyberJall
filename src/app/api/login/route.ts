// app/api/login/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 2. Find user with error handling for schema mismatches
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { work_email: email },
        select: {
          id: true,
          work_email: true,
          company_name: true,
          contact: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to query user data' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 3. Verify password with error handling
    let passwordMatch;
    try {
      passwordMatch = await bcrypt.compare(password, user.password);
    } catch (hashError) {
      console.error('Password comparison error:', hashError);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 4. Prepare response data (explicitly selecting fields)
    const userData = {
      id: user.id,
      email: user.work_email,
      companyName: user.company_name,
      contact: user.contact,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}