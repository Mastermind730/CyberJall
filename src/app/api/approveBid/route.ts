import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prismadb";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function POST(req: NextRequest) {
  try {
    // Get token from cookies
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 });
    }

    const authToken = cookieHeader
      .split(';')
      .find(c => c.trim().startsWith('auth_token='))
      ?.split('=')[1];

    if (!authToken) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 });
    }

    // Verify JWT token
    const result = await jwtVerify(authToken, secret);
    const payload = result.payload as any;

    // Check if user is a provider
    if (payload.role !== 'provider') {
      return NextResponse.json({ error: "Only providers can approve bids" }, { status: 403 });
    }

    const { bidId } = await req.json();

    if (!bidId) {
      return NextResponse.json({ error: "Bid ID is required" }, { status: 400 });
    }

    // Update the bid status to approved
    const updatedBid = await prisma.businessBid.update({
      where: {
        id: bidId
      },
      data: {
        status: "approved",
        updatedAt: new Date()
      }
    });

    console.log(`Bid ${bidId} approved by provider ${payload.email}`);

    return NextResponse.json({
      success: true,
      message: "Bid approved successfully",
      bid: updatedBid
    });

  } catch (error) {
    console.error("Error approving bid:", error);
    return NextResponse.json(
      { error: "Failed to approve bid" },
      { status: 500 }
    );
  }
}