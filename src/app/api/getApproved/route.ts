import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export  async function GET() {
  

  try {
    const users = await prisma.validated_User.findMany({
      
    });
    // return res.status(200).json(users);
    return NextResponse.json(users,{status:200});
  } catch (error) {
    console.error('Error fetching approved users:', error);
    // return res.status(500).json();
        return NextResponse.json({ message: 'Internal server error' },{status:200});

  }
}