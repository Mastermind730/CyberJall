// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(secret,"secret");

  // Get token from cookies in the request
  const token = request.cookies.get("auth_token")?.value;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/", "/api/login"];

  // API routes that don't require auth
  const publicApiPaths = ["/api/login", "/api/register"];

  // Check if current path is public
  const isPublicPath = publicPaths.some(
    (path) =>
      pathname === path ||
      (pathname.startsWith("/api/") &&
        publicApiPaths.some((apiPath) => pathname.startsWith(apiPath)))
  );

  // If it's a public path, handle accordingly
  if (isPublicPath) {
    if (token) {
      try {
        await jwtVerify(token, secret);
        console.log("Valid token for public path");
        // If user has valid token and tries to access login, redirect to dashboard
        if (pathname === "/login" || pathname === "/register") {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (e) {
        // Token invalid, allow access to public pages
      }
    }
    return NextResponse.next();
  }

  // For protected paths, verify token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Valid token payload:", payload);
    return NextResponse.next();
  } catch (e) {
    console.error("Token verification failed:", e);
    // Redirect to login and clear invalid cookie
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
