import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting seed...");

  const databaseUrl = process.env.DATABASE_URL!;
  const adapter = new PrismaMariaDb(databaseUrl);
  const prisma = new PrismaClient({ adapter });

  try {
    // Hash the password "123"
    const hashedPassword = await bcrypt.hash("123", 10);

    // Upsert admin — safe to run multiple times
    const admin = await prisma.user.upsert({
      where: { email: "admin@admin.com" },
      update: {},
      create: {
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Seeded admin user:", {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
