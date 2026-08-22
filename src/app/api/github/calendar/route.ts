import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { fetchGithubCalendarForYear } from "@/lib/github";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const year = yearParam ? parseInt(yearParam, 10) : undefined;

    const calendar = await fetchGithubCalendarForYear(userId, year);

    if (!calendar) {
      return NextResponse.json({ error: "Failed to load calendar" }, { status: 500 });
    }

    return NextResponse.json({ calendar });
  } catch (error: any) {
    console.error("API /api/github/calendar error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
