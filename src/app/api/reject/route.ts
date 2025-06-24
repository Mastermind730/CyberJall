import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export  async function POST(req: Request) {
 

  try {
    const { id } = await req.json();

    // Simply delete the user (you might want to archive instead)
    await prisma.user.delete({
      where: { id },
    });

    // return res.status(200).json({ message: 'Company rejected successfully' });
        return NextResponse.json({message:"Company rejected successfully"},{status:200});
    
  } catch (error) {
    console.error('Error rejecting company:', error);
    // return res.status(500).json({ message: 'Internal server error' });
            return NextResponse.json({message:"Internal server error"},{status:500});

  }
}