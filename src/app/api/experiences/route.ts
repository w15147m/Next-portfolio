import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });

    const serialized = experiences.map((e) => ({
      id: Number(e.id),
      userId: e.userId,
      company: e.company,
      position: e.position,
      image: e.image,
      startDate: e.startDate,
      endDate: e.endDate,
      desc: e.desc,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get experiences error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch experiences" }, { status: 500 });
  }
}
