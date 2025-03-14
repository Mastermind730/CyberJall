import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
// import {PrismaClient} from "@/prisma/client"


export async function POST(req:Request){

    const {name,email,password} = await req.json();

try{
    if(!name || !email || !password){
        return NextResponse.json("Enter valid credentials...!!",{status:400});
    }
    else{


       const user = await prisma.validated_users.findFirst({
        where:{
            email:email
        }
       })

        if(user){
            return NextResponse.json("user already exists",{status:401});
        }else{
            const hashedPasswd =  await bcrypt.hash(password,12);

            const new_user  = await  prisma.user.create({
                name:name,
                email:email,
                password:hashedPasswd
            });

            return NextResponse.json(new_user,{status:200});

        }



    }
}
    catch(error:unknown){
        return NextResponse.json(`Error registering user , ${error}`,{status:500})
    }


    }




