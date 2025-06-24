
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export  async function GET() {
 

  try {
    const pendingCount = await prisma.user.count();
    const approvedCount = await prisma.validated_User.count();
    
    // Note: Rejected count would need a separate table if you want to track it
    // For this example, we'll just use a placeholder
    const rejectedCount = 0;
    
    return NextResponse.json({
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      total: pendingCount + approvedCount + rejectedCount,
    },{status:200});
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ message: 'Internal server error' },{status:500});
  }
}