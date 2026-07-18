import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "portfolioId is required" }, { status: 400 });
    }

    const socials = await prisma.social.findMany({
      where: { portfolioId: BigInt(portfolioId) },
      orderBy: { createdAt: "asc" },
    });

    // Serialize BigInt fields to numbers for JSON
    const serialized = socials.map((s) => ({
      id: Number(s.id),
      portfolioId: Number(s.portfolioId),
      name: s.name,
      link: s.link,
      desc: s.desc,
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("Get socials error:", error);
    return NextResponse.json({ error: "Failed to fetch socials" }, { status: 500 });
  }
}
