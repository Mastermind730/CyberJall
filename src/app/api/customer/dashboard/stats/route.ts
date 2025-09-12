import { NextResponse } from "next/server";

// Mock data for the dashboard
export async function GET() {
  try {
    // This would normally come from a database
    const mockStats = {
      cyberHealth: {
        score: 78,
        status: "good",
        lastScan: new Date().toISOString(),
      },
      packages: {
        active: 3,
        upcoming: 1,
        completed: 5,
        total: 9,
      },
      tickets: {
        open: 2,
        resolved: 15,
      },
      invoices: {
        totalAmount: 15000,
        paidAmount: 13750,
        unpaidAmount: 1250,
        count: 5,
      },
      recentActivity: {
        packages: [
          {
            id: 1,
            name: "Vulnerability Assessment",
            status: "active",
            provider: { company_name: "SecureCorp" },
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 2,
            name: "Penetration Testing",
            status: "upcoming",
            provider: { company_name: "CyberShield" },
            updatedAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
        messages: [
          {
            id: 1,
            package: { name: "Vulnerability Assessment" },
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
      },
    };

    return NextResponse.json({ stats: mockStats });
  } catch (error) {
    console.error("Error in GET /api/customer/dashboard/stats:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
