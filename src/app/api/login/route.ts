import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcyprt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json("These fields cannot be empty!!", {
        status: 400,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json("Invalid email", { status: 404 });
    } else {
      const isPasswordValid = await bcyprt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json("Invalid Credentials", { status: 401 });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "4h" }
      );

      return NextResponse.json(token, { status: 200 });
    }
  } catch (error: unknown) {
    return NextResponse.json(`login failed: ${error}`, { status: 500 });
  }
}
