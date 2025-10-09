import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    console.log('Logout API called');
    
    // Clear the auth token cookie with multiple variations to ensure it's removed
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 0, // Expire immediately
      path: '/',
    };

    // Create multiple cookie clearing headers to handle different scenarios
    const clearCookies = [
      serialize('auth_token', '', cookieOptions),
      serialize('auth_token', '', { ...cookieOptions, path: '' }),
      serialize('auth_token', '', { ...cookieOptions, domain: '' }),
      // Also clear any potential variations
      serialize('authToken', '', cookieOptions),
      serialize('token', '', cookieOptions),
    ];

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Set multiple Set-Cookie headers to ensure clearing
    clearCookies.forEach((cookie, index) => {
      if (index === 0) {
        response.headers.set('Set-Cookie', cookie);
      } else {
        response.headers.append('Set-Cookie', cookie);
      }
    });

    console.log('Logout successful, cookies cleared');
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}