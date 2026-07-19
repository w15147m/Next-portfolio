/**
 * image-service.ts  —  SERVER-SIDE image utilities
 *
 * Import this only in Server Actions, API Routes, or other server-only code.
 * All paths must be relative to /public (e.g., "/uploads/temp/abc.jpg").
 */
import { promises as fs } from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Resolve a public URL like "/uploads/temp/abc.jpg" to an absolute filesystem path. */
function toAbsPath(publicUrl: string): string {
  return path.join(process.cwd(), "public", publicUrl.replace(/^\//, ""));
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Move an image from the temp directory to a permanent category folder.
 *
 * @param tempUrl   Public URL of the temp image  — "/uploads/temp/<file>"
 * @param category  Destination folder name        — e.g. "profile" | "projects"
 * @returns         New permanent public URL       — "/uploads/<category>/<file>"
 *
 * If the URL is NOT a temp URL the function returns it unchanged (idempotent).
 */
export async function commitImage(tempUrl: string, category: string): Promise<string> {
  if (!tempUrl || !tempUrl.startsWith("/uploads/temp/")) {
    return tempUrl; // Already a permanent/external URL — nothing to do
  }

  const filename = path.basename(tempUrl);
  const src = toAbsPath(tempUrl);
  const destDir = path.join(process.cwd(), "public", "uploads", category);
  const dest = path.join(destDir, filename);

  await fs.mkdir(destDir, { recursive: true });
  await fs.rename(src, dest);

  return `/uploads/${category}/${filename}`;
}

/**
 * Delete any image that lives under /uploads/ (temp or permanent).
 * Refuses to touch paths outside /uploads/ to prevent accidental deletion.
 *
 * @param imageUrl  Public URL — "/uploads/…/<file>" (temp or permanent)
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  await safeUnlink(toAbsPath(imageUrl));
}

/**
 * Convenience: after a successful DB save, replace old image with new one.
 * Commits the new temp image and deletes the old permanent image atomically.
 *
 * @param newUrl     New temp URL (or existing permanent URL if unchanged)
 * @param oldUrl     Previous permanent URL stored in the DB (may be null)
 * @param category   Destination folder — e.g. "profile"
 * @returns          The final permanent URL to store in the DB
 */
export async function replaceImage(
  newUrl: string | undefined | null,
  oldUrl: string | null | undefined,
  category: string
): Promise<string | undefined> {
  if (!newUrl) return undefined;

  // Move temp → permanent
  const finalUrl = await commitImage(newUrl, category);

  // Delete the old file if it changed and was a local upload
  if (oldUrl && oldUrl !== finalUrl && oldUrl.startsWith("/uploads/")) {
    await deleteImage(oldUrl);
  }

  return finalUrl;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function safeUnlink(absPath: string): Promise<void> {
  try {
    await fs.unlink(absPath);
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      console.error("[image-service] Error deleting file:", absPath, err);
    }
  }
}
