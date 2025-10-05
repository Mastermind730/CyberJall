import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({
        hasToken: false,
        message: "No auth token found in cookies",
      });
    }

    // Simple cookie debugging
    const allCookies = request.cookies.getAll();

    return NextResponse.json({
      hasToken: true,
      tokenPreview: token.substring(0, 20) + "...",
      tokenLength: token.length,
      allCookies: allCookies.map((c) => ({
        name: c.name,
        hasValue: !!c.value,
      })),
      message: "Token found successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Debug endpoint error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
