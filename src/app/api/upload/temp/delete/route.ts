import { NextRequest, NextResponse } from "next/server";
import { deleteTempImage } from "@/lib/file-utils";

/**
 * DELETE /api/upload/temp
 * Body: { url: "/uploads/temp/filename.jpg" }
 *
 * Used by the client to clean up a temp image when the user replaces it
 * before submitting the form.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Only allow temp image deletion from this endpoint
    if (!url.startsWith("/uploads/temp/")) {
      return NextResponse.json(
        { error: "Only temporary image URLs can be deleted via this endpoint" },
        { status: 403 }
      );
    }

    await deleteTempImage(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting temp image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
