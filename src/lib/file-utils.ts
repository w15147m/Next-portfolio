import { promises as fs } from "fs";
import path from "path";

/**
 * Moves an image from the temporary directory to a permanent category directory.
 * @param tempUrl The public URL of the temporary image (e.g., "/images/upload/temp/1234.jpg")
 * @param category The destination folder (e.g., "project")
 * @returns The new permanent public URL (e.g., "/images/upload/project/1234.jpg")
 */
export async function commitImage(tempUrl: string, category: string): Promise<string> {
  if (!tempUrl || !tempUrl.startsWith("/images/upload/temp/")) {
    return tempUrl; // It might be an existing permanent image or external URL
  }

  const filename = path.basename(tempUrl);
  
  // Define source (temp) and destination paths
  const tempPath = path.join(process.cwd(), "public", "images", "upload", "temp", filename);
  const destDir = path.join(process.cwd(), "public", "images", "upload", category);
  const destPath = path.join(destDir, filename);

  try {
    // Ensure destination directory exists
    await fs.mkdir(destDir, { recursive: true });

    // Move the file
    await fs.rename(tempPath, destPath);

    // Return the new public URL
    return `/images/upload/${category}/${filename}`;
  } catch (error) {
    console.error("Error committing image:", error);
    throw new Error("Failed to commit image to permanent storage");
  }
}

/**
 * Deletes an image from the temporary directory (used for cleanup on form failure).
 * @param tempUrl The public URL of the temporary image
 */
export async function deleteTempImage(tempUrl: string): Promise<void> {
  if (!tempUrl || !tempUrl.startsWith("/images/upload/temp/")) {
    return;
  }

  const filename = path.basename(tempUrl);
  const tempPath = path.join(process.cwd(), "public", "images", "upload", "temp", filename);

  try {
    await fs.unlink(tempPath);
  } catch (error: any) {
    // Ignore if file doesn't exist, log other errors
    if (error.code !== "ENOENT") {
      console.error("Error deleting temp image:", error);
    }
  }
}
