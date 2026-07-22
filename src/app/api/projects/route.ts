import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const serialized = projects.map((p) => ({
      id: Number(p.id),
      userId: p.userId,
      name: p.name,
      desc: p.desc,
      image: p.image,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get projects error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}
