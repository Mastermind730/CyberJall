import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const bids = await prisma.businessBid.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Correct check for empty array
    if (bids.length === 0) {
      return NextResponse.json(
        { message: "No bids found", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { bids: bids, count: bids.length },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching bids:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
