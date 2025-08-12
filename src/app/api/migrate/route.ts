import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    // 1. Parse and validate request body
    const body: LoginRequest = await req.json();
    
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Find user in database
    const user = await prisma.user.findUnique({
      where: { work_email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 4. Prepare JWT payload
    const tokenPayload = {
      userId: user.id,
      email: user.work_email,
      role: user.role
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // 5. Generate JWT token
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    // 6. Prepare response data
    const userData = {
      id: user.id,
      email: user.work_email,
      companyName: user.company_name,
      role: user.role,
      contact: user.contact,
      createdAt: user.createdAt.toISOString()
    };

    return NextResponse.json(
      { 
        token, 
        user: userData 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}