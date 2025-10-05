import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    // Clear the auth token cookie
    const serializedCookie = serialize('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    response.headers.set('Set-Cookie', serializedCookie);
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}