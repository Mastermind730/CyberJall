// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prismadb";

// const protectedPaths = ["/dashboard", "/profile", "/settings"];

// export default async function verifyToken(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   if (!protectedPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Get the token from cookies
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       email: string;
//     };

//     const user = await prisma.user.findUnique({
//       where: {
//         id: decoded.userId,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     req.user = user;
//     return NextResponse.next();
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }