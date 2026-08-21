import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const services = await prisma.service.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const serialized = services.map((s) => ({
      id: Number(s.id),
      userId: s.userId,
      name: s.name,
      link: s.link,
      desc: s.desc,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get services error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch services" }, { status: 500 });
  }
}
