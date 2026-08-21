import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serialized = messages.map((m) => ({
      id: Number(m.id),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      isRead: m.isRead,
      createdAt: m.createdAt,
    }));

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get messages error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch messages" }, { status: 500 });
  }
}
