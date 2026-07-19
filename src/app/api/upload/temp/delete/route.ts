import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/image-service";

/**
 * DELETE /api/upload/temp/delete
 * Body: { url: "/uploads/…/filename.jpg" }
 *
 * Used by the client to delete any image under /uploads/ (temp or permanent).
 */
export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Only allow deletion of local /uploads/ files — never external URLs
    if (!url.startsWith("/uploads/")) {
      return NextResponse.json(
        { error: "Only /uploads/ paths can be deleted via this endpoint" },
        { status: 403 }
      );
    }

    await deleteImage(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
