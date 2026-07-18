"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { commitImage, deleteTempImage } from "@/lib/file-utils";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  image: z.string().optional().or(z.literal("")),
});

export type ProfileFieldErrors = {
  name?: string[];
  image?: string[];
};

export type ProfileFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ProfileFieldErrors;
};

// UPDATE PROFILE
export async function updateProfile(
  userId: string,
  data: { name: string; image?: string }
): Promise<ProfileFormState> {
  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ProfileFieldErrors,
    };
  }

  let finalImageUrl = parsed.data.image;

  try {
    // If a new temporary image was uploaded, commit it to the "profile" directory
    if (finalImageUrl && finalImageUrl.startsWith("/uploads/temp/")) {
      finalImageUrl = await commitImage(finalImageUrl, "profile");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: parsed.data.name,
        ...(finalImageUrl !== undefined && { image: finalImageUrl }), // Only update if provided
      },
    });

    revalidatePath("/admin/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Update profile DB error:", error);
    
    // If we failed after uploading a temp image, try to clean it up
    if (parsed.data.image && parsed.data.image.startsWith("/uploads/temp/")) {
        await deleteTempImage(parsed.data.image);
    }
    
    return { success: false, message: "A database error occurred. Please try again." };
  }
}
