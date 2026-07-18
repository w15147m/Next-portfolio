/**
 * image-client.ts  —  CLIENT-SIDE image utilities
 *
 * Import this only in React components / client-side code ("use client").
 */

/**
 * Upload a File to the server's temp directory.
 *
 * @param file   The File object selected / dropped by the user
 * @returns      The temp public URL — "/uploads/temp/<filename>"
 * @throws       Error if the upload fails
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload/temp", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Image upload failed");
  }

  const data = await res.json();
  return data.url as string;
}

/**
 * Ask the server to delete an image by its public URL.
 * Only /uploads/ paths are accepted — permanent or temp.
 *
 * Fire-and-forget friendly: errors are logged but never thrown.
 *
 * @param imageUrl  Public URL — "/uploads/…/<file>"
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;

  try {
    await fetch("/api/upload/temp/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: imageUrl }),
    });
  } catch (err) {
    console.error("[image-client] Failed to delete image:", err);
  }
}
