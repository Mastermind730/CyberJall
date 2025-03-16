import { NextRequest,NextResponse } from "next/server";
import { verifyToken } from "@/middleware";

export async function GET(req:NextRequest){
    const user = await verifyToken(req);

    if(user instanceof NextResponse){
        return user;
    }

    return NextResponse.json({user},{status:200});

}