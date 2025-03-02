import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
// import {PrismaClient} from "@/prisma/client"


export async function POST(req:Request){

    const {name,email,password} = await req.json();

try{
    if(!name || !email || !password){
        return NextResponse.json("Enter valid credentials...!!",{status:400});
    }
    else{

        const hashedPasswd=  await bcrypt.hash(password,12);

    //    const user  = await  prisma.user.create({
    //         name:name,
    //         email:email,
    //         password:hashedPasswd
    //     });


        return NextResponse.json("user",{status:200});

    }
}
    catch(error:Error){
        return NextResponse.json("Error registering user",{status:500})
    }


    }




}