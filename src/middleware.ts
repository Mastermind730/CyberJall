import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || ''
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore  = await  cookies();
  const token = cookieStore.get('auth_token')?.value;
  // 1. Define public paths that do NOT require authentication
  const publicPaths = ['/login', '/register', '/'];

  // 2. If the current path is a public path, allow it without a token check.
  //    Also, if a user has a valid token and tries to access the login page, redirect them.
  if (publicPaths.includes(pathname)) {
    if (token) {
      try {
        await jwtVerify(token, secret);
        // User is authenticated, redirect to a protected page (e.g., dashboard)
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (e) {
        // Token is invalid, allow them to proceed to the login page to log in again.
        return NextResponse.next();
      }
    }
    // No token, on a public path, so allow the request to proceed.
    return NextResponse.next();
  }

  // 3. For all other (protected) paths, check for a token.
  if (!token) {
    // No token found, redirect to the login page.
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Verify the token on protected paths.
  try {
    await jwtVerify(token, secret);
    // Token is valid, allow the request to proceed.
    return NextResponse.next();
  } catch (e) {
    console.error('Token verification failed:', e);
    // Token is invalid or expired, redirect to the login page and clear the cookie.
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
    return response;
  }
}

export const config = {
  // Use a matcher to run the middleware only on specific paths
  // You should list all paths you want to protect here, plus the login page itself.
  matcher: [
    '/dashboard/:path*', // Match /dashboard and any sub-paths
    '/ourPartners',
    '/settings',
    '/login' // Include the login page to handle the redirect if a user is already authenticated
  ]
};