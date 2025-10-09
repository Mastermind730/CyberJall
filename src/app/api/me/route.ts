import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function GET(req: NextRequest) {
  try {
    // Get token from cookies - same way as getCompany endpoint
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json(
        { error: "No authentication token" },
        { status: 401 }
      );
    }

    const authToken = cookieHeader
      .split(';')
      .find(c => c.trim().startsWith('auth_token='))
      ?.split('=')[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "No authentication token found" },
        { status: 401 }
      );
    }

    // Verify JWT token using jose (same as getCompany)
    const result = await jwtVerify(authToken, secret);
    const payload = result.payload as any;
    
    console.log("Valid token payload:", payload);

    // Extract user data from the JWT payload
    const userData = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      company_name: payload.companyName,
      validatedCompanyId: payload.companyId,
    };

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}