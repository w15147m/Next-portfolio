import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        subject: subject ? String(subject).trim() : null,
        message: String(message).trim(),
      },
    });

    return NextResponse.json({ success: true, message: "Message received successfully." });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
