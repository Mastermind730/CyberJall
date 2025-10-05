// app/api/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { serialize } from "cookie";

// Generate a secure secret key and store it in your .env file
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { work_email: email },
        select: {
          id: true,
          work_email: true,
          validatedCompanyId: true,
          company_name: true,
          contact: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to query user data" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    let passwordMatch;
    try {
      passwordMatch = await bcrypt.compare(password, user.password);
    } catch (hashError) {
      console.error("Password comparison error:", hashError);
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 500 }
      );
    }

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔐 Generate JWT token
    const token = await new jose.SignJWT({
      userId: user.id,
      email: user.work_email,
      role: user.role,
      companyId: user.validatedCompanyId,
      companyName: user.company_name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h") // Token expires in 2 hours
      .setIssuedAt()
      .setJti(crypto.randomUUID()) // Unique JWT ID
      .sign(secret);

    // 🍪 Set the JWT as an HTTP-only cookie
    const serializedCookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2, // 2 hours
      path: "/",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.work_email,
        companyName: user.company_name,
        companyId: user.validatedCompanyId,
        contact: user.contact,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    response.headers.set("Set-Cookie", serializedCookie);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
