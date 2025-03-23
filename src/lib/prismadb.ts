import { PrismaClient } from "@prisma/client";

// Extend the global namespace to include `prisma`
declare global {
  let prisma: PrismaClient | undefined;
}

// Initialize PrismaClient
// const client = globalThis.prisma || new PrismaClient();
const client = new PrismaClient();

// In development, store the PrismaClient instance in `globalThis` to avoid multiple instances
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;