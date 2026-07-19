"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const socialSchema = z.object({
  name: z.string().min(1, "Platform name is required").max(100, "Name is too long"),
  link: z
    .string()
    .url("Please enter a valid URL (e.g. https://github.com/user)")
    .optional()
    .or(z.literal("")),
  desc: z.string().max(255, "Description is too long").optional().or(z.literal("")),
});

export type SocialFieldErrors = {
  name?: string[];
  link?: string[];
  desc?: string[];
};

export type SocialFormState = {
  success: boolean;
  message: string;
  fieldErrors?: SocialFieldErrors;
};

// CREATE
export async function createSocial(
  userId: string,
  data: { name: string; link?: string; desc?: string }
): Promise<SocialFormState> {
  const parsed = socialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as SocialFieldErrors,
    };
  }

  try {
    await prisma.social.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return { success: true, message: "Social link created successfully." };
  } catch (error) {
    console.error("Create social DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateSocial(
  id: number,
  data: { name: string; link?: string; desc?: string }
): Promise<SocialFormState> {
  const parsed = socialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as SocialFieldErrors,
    };
  }

  try {
    await prisma.social.update({
      where: { id: BigInt(id) },
      data: {
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return { success: true, message: "Social link updated successfully." };
  } catch (error) {
    console.error("Update social DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteSocial(id: number): Promise<SocialFormState> {
  try {
    await prisma.social.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/socials");
    return { success: true, message: "Social link deleted." };
  } catch (error) {
    console.error("Delete social DB error:", error);
    return { success: false, message: "Failed to delete social link." };
  }
}

