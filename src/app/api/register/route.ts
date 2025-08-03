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
    userType: z.enum(["customer", "provider"]),
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

        const { companyName, email, phoneNumber, password, userType } = validationResult.data;

        // Check if user already exists
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

        // Create new user with the appropriate role
        const newUser = await prisma.user.create({
            data: {
                company_name: companyName,
                work_email: email,
                contact: phoneNumber,
                password: hashedPassword,
                message: "", // Default to empty string
                role: userType === "provider" ? "provider" : "customer",
            },
        });

        // If user is a provider, create a company entry
        if (userType === "provider") {
            await prisma.company.create({
                data: {
                    company_name: companyName,
                    logo: "", // Default empty
                    overview: "", // Default empty
                    year_founded: new Date().getFullYear(),
                    headquarters_city: "", // Default empty
                    headquarters_country: "", // Default empty
                    industries_served: [], // Default empty array
                    target_business_size: [], // Default empty array
                    geographic_coverage: [], // Default empty array
                    team_size: "", // Default empty
                    services_offered: {}, // Default empty object
                    expertise_and_certifications: {}, // Default empty object
                    case_studies: {}, // Default empty object
                    client_reviews: {}, // Default empty object
                    social_links: {}, // Default empty object
                    website: "", // Default empty
                    products: {}, // Default empty object
                },
            });
        }

        // Return success response without sensitive data
        return NextResponse.json({
            id: newUser.id,
            email: newUser.work_email,
            companyName: newUser.company_name,
            role: newUser.role,
            createdAt: newUser.createdAt
        }, { status: 201 });

    } catch (error: unknown) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}