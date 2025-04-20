// pages/api/submit-security-assessment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prismadb"
import { z } from 'zod';
import { NextResponse } from 'next/server';


const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  companySize: z.string().min(1, { message: "Please select company size" }),
  contactName: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  services: z.array(z.string()).min(1, { message: "Select at least one service" }),
  providerPreferences: z.array(z.string()).min(1, { message: "Select at least one preference" }),
  multipleProviders: z.boolean({
    required_error: "Please select an option",
  }),
  packageDuration: z.string().min(1, { message: "Please select a package duration" }),
  specialRequirements: z.string().optional(),
  confirmSubmission: z.boolean()
    .refine(val => val === true, {
      message: "You must confirm to submit"
    })
});

export async function POST(req:Request) {
  
  try {
    // Validate the requet data
    const body = await req.json();
    const validatedData = formSchema.parse(body);
    
    const submission = await prisma.securityAssessmentRequest.create({
      data: validatedData
    });
    

    return NextResponse.json({"success":true,"message":'Security assessment request submitted successfully',"submissionId":submission.id},{status:200})
   
  } catch (error) {
    if (error instanceof z.ZodError) {
        return NextResponse.json("Error submitting form",{status:400})
     
    }
    
    console.error('Error submitting security assessment request:', error);
    return NextResponse.json("Error submitting form",{status:500})

  } finally {
    await prisma.$disconnect();
  }
}