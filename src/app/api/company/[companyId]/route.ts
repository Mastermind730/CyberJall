import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";



export async function GET(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
    try {
        const { companyId } = await params
        const company = await prisma.validated_Company.findUnique({
            where: {
                id: companyId
            }
            
        });

        if (!company) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.error("Unknown error occurred:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}