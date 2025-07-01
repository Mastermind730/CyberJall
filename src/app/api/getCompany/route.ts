import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req:Request){
    try {
        const body= await req.json();
    const {company_name}= body;


    const company =await prisma.validated_Company.findFirst({
        where:{
            company_name:company_name
        }
    });

    if(!company){
        return NextResponse.json("Company not found",{status:404});
    }

    const company_logo=company.logo;

    return NextResponse.json({"company_logo":company_logo},{status:200});
    } catch (error:unknown) {
        return NextResponse.json({"error":error},{status:500})
    }
    



}