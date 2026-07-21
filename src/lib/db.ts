import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Prevent multiple PrismaClient instances during Next.js hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL!;

  const adapter = new PrismaMariaDb(databaseUrl, {
    // Pool settings to prevent timeout exhaustion during hot-reload in dev
    connectionLimit: 5,
    acquireTimeout: 30000,
    connectTimeout: 10000,
    idleTimeout: 60000,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : [],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
