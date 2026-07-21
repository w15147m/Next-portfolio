"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { socialSchema, SocialFieldErrors, SocialFormState } from "./schema";

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
    const created = await prisma.social.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return {
      success: true,
      message: "Social link created successfully.",
      data: { ...created, id: Number(created.id) },
    };
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
    const updated = await prisma.social.update({
      where: { id: BigInt(id) },
      data: {
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return {
      success: true,
      message: "Social link updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
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