import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { z } from "zod";

// Define Zod schema for input validation
const userSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = userSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        const { companyName, email, phoneNumber, password } = validationResult.data;

        const existingUser = await prisma.user.findFirst({
            where: {
                work_email: email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                company_name: companyName,
                work_email: email,
                contact: phoneNumber,
                password: hashedPassword,
                message: "", // Default to empty string
            },
        });

        // Return success response
        return NextResponse.json(newUser, { status: 201 });

    } catch (error: unknown) {
        // Handle errors
        if (error instanceof Error) {
            console.error("Error registering user:", error.message);
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