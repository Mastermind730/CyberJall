import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function GET(req: NextRequest) {
  try {
    // Get token from cookies using NextRequest API
    const authToken = req.cookies.get("auth_token")?.value;

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
      // Provide both fields for client-side compatibility
      work_email: payload.email,
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