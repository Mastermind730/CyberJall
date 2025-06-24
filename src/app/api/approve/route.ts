import prisma from "@/lib/prismadb"
import { NextResponse } from 'next/server';

export  async function POST(req: Request) {
 

  try {
    const { id } =await req.json();

    // Get the user from User table
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
    //   return res.json({ message: 'User not found' },{status:404});
      return NextResponse.json({error:"User not found"},{status:404});
    }

    // Create in Validated_User table
    await prisma.validated_User.create({
      data: {
        work_email: user.work_email,
        company_name: user.company_name,
        contact: user.contact,
        message: user.message,
        password: user.password,
      },
    });

    // Delete from User table
    await prisma.user.delete({
      where: { id },
    });

    // return res.status(200).json({ message: 'Company approved successfully' });
    return NextResponse.json({message:"Company approved successfully"},{status:200});
  } catch (error) {
    console.error('Error approving company:', error);
    // return res.status(500).json({ message: 'Internal server error' });
        return NextResponse.json({message:"Internal server error"},{status:500});

  }
}