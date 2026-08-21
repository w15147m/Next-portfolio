"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { replaceImage, deleteImage } from "@/lib/image-service";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  image: z.string().optional().or(z.literal("")),
  address: z.string().max(255, "Address is too long").optional().or(z.literal("")),
  number: z.string().max(20, "Number is too long").optional().or(z.literal("")),
  desc: z.string().max(500, "Description is too long").optional().or(z.literal("")),
});

export type ProfileFieldErrors = {
  name?: string[];
  image?: string[];
  address?: string[];
  number?: string[];
  desc?: string[];
};

export type ProfileFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ProfileFieldErrors;
};

// UPDATE PROFILE
export async function updateProfile(
  userId: string,
  data: {
    name: string;
    image?: string;
    address?: string;
    number?: string;
    desc?: string;
  }
): Promise<ProfileFormState> {
  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ProfileFieldErrors,
    };
  }

  try {
    // Fetch the user's current image so we can delete it if it changes
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });
    const oldImageUrl = currentUser?.image ?? null;

    // Commit temp image → permanent, and delete old image in one call
    const finalImageUrl = await replaceImage(parsed.data.image, oldImageUrl, "profile");

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: parsed.data.name,
        ...(finalImageUrl !== undefined && { image: finalImageUrl }),
        address: parsed.data.address || null,
        number: parsed.data.number || null,
        desc: parsed.data.desc || null,
      },
    });

    revalidatePath("/admin/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Update profile DB error:", error);

    // If we failed after uploading a temp image, try to clean it up
    if (parsed.data.image && parsed.data.image.startsWith("/uploads/")) {
      await deleteImage(parsed.data.image);
    }

    return { success: false, message: "A database error occurred. Please try again." };
  }
}