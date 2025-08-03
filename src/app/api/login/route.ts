import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        work_email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // Generic message for security
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // Generic message for security
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.work_email,
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: "4h" }
    );

    // Return user data without sensitive information
    const userData = {
      id: user.id,
      email: user.work_email,
      companyName: user.company_name,
      role: user.role,
      contact: user.contact
    };

    return NextResponse.json(
      { 
        token, 
        user: userData 
      }, 
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}