import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Define Zod schema for input validation
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = loginSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        const { email, password } = validationResult.data;

        const user = await prisma.user.findFirst({
            where: {
                work_email: email,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user.id, email: user.work_email },
            process.env.JWT_SECRET!,
            { expiresIn: "4h" }
        );

        const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
    sameSite: "strict",
    maxAge: 3600, // 1 hour
    path: "/",
  });

  return response;
      

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login failed:", error.message);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        } else {
            console.error("Unknown error occurred:", error);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }
    }
}