import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const educations = await prisma.education.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });

    const serialized = educations.map((e) => ({
      id: Number(e.id),
      userId: e.userId,
      institution: e.institution,
      degree: e.degree,
      fieldOfStudy: e.fieldOfStudy,
      startDate: e.startDate,
      endDate: e.endDate,
      desc: e.desc,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get educations error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch educations" }, { status: 500 });
  }
}
