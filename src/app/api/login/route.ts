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
        // Parse and validate the request body
        const body = await req.json();
        const validationResult = loginSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        const { email, password } = validationResult.data;

        // Find the user by email
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

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.work_email },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        // Set the token in a cookie
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
        // Handle known errors
        if (error instanceof Error) {
            console.error("Login failed:", error.message);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        } else {
            // Handle unknown errors
            console.error("Unknown error occurred:", error);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }
    }
}