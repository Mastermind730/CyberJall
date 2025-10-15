// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-key"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies in the request
  const token = request.cookies.get("auth_token")?.value;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/", "/api/login", "/debug-auth"];

  // API routes that don't require auth
  const publicApiPaths = ["/api/login", "/api/register", "/api/logout"];

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
        const { payload } = await jwtVerify(token, secret);
        // console.log("Valid token for public path");
        
        // If user has valid token and tries to access login/register, redirect based on role
        if (pathname === "/login" || pathname === "/register") {
          const userRole = payload.role as string;
          if (userRole === "provider") {
            return NextResponse.redirect(new URL("/provider", request.url));
          } else if (userRole === "customer") {
            return NextResponse.redirect(new URL("/customer", request.url));
          } else {
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
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
    // console.log("Valid token payload:", payload);
    
    const userRole = payload.role as string;
    
    // Role-based route protection
    if (pathname.startsWith("/provider")) {
      if (userRole !== "provider") {
        // Non-providers trying to access provider routes - redirect to appropriate dashboard
        if (userRole === "customer") {
          return NextResponse.redirect(new URL("/customer", request.url));
        } else {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } else if (pathname.startsWith("/customer")) {
      if (userRole !== "customer") {
        // Non-customers trying to access customer routes - redirect to appropriate dashboard
        if (userRole === "provider") {
          return NextResponse.redirect(new URL("/provider", request.url));
        } else {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } else if (pathname === "/dashboard") {
      // Redirect dashboard access to role-specific dashboards
      if (userRole === "provider") {
        return NextResponse.redirect(new URL("/provider", request.url));
      } else if (userRole === "customer") {
        return NextResponse.redirect(new URL("/customer", request.url));
      }
    }
    
    return NextResponse.next();
  } catch (e) {
    // console.error("Token verification failed:", e);
    // Redirect to login and clear invalid cookie
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    // Protect only authenticated areas to avoid conflicts on public pages
    "/customer/:path*",
    "/provider/:path*",
    "/dashboard",
    // Still run on auth pages for redirecting logged-in users
    "/login",
    "/register",
    // APIs that require auth can be protected explicitly if needed
    // "/api/(?!login|register|logout).*"  // uncomment to enforce API auth broadly
  ],
};
