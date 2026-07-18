import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

async function run() {
  const databaseUrl = process.env.DATABASE_URL!;
  const adapter = new PrismaMariaDb(databaseUrl);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Querying users...");
    const users = await prisma.user.findMany();
    console.log("Users in DB:", users);

    console.log("Querying socials...");
    const socials = await prisma.social.findMany();
    console.log("Socials in DB:", socials);
  } catch (error) {
    console.error("Database query failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
