import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Define the temp directory
    const tempDir = path.join(process.cwd(), "public", "images", "upload", "temp");

    // Ensure the temp directory exists
    await fs.mkdir(tempDir, { recursive: true });

    // Generate a unique filename
    const extension = file.name.split(".").pop();
    const uniqueFilename = `${uuidv4()}.${extension}`;
    const filePath = path.join(tempDir, uniqueFilename);

    // Read the file buffer and save it
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Return the public URL for the temporary file
    const publicUrl = `/images/upload/temp/${uniqueFilename}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
