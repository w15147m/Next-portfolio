import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const testimonials = await prisma.testimonial.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const serialized = testimonials.map((t) => ({
      id: Number(t.id),
      userId: t.userId,
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      image: t.image,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get testimonials error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}
