import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const skills = await prisma.skill.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    // Serialize BigInt fields (like id) to numbers for JSON
    const serialized = skills.map((s) => ({
      id: Number(s.id),
      userId: s.userId,
      name: s.name, 
      proficiency: s.proficiency, 
      desc: s.desc,


    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get skills error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch skills" }, { status: 500 });
  }
}
