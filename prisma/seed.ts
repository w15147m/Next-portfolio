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
      update: {
        password: hashedPassword,
      },
      create: {
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: true,
      },
    });

    // Create the better-auth credential account so it can verify the password
    const existingAccount = await prisma.account.findFirst({
      where: { userId: admin.id, providerId: "credential" }
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          accountId: admin.email,
          providerId: "credential",
          userId: admin.id,
          password: hashedPassword,
        }
      });
    } else {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword }
      });
    }

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
