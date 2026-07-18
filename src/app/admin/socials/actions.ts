"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type SocialFormState = {
  success: boolean;
  message: string;
};

// CREATE
export async function createSocial(
  portfolioId: number,
  data: { name: string; link?: string; desc?: string }
): Promise<SocialFormState> {
  try {
    await prisma.social.create({
      data: {
        portfolioId: BigInt(portfolioId),
        name: data.name,
        link: data.link || null,
        desc: data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return { success: true, message: "Social link created successfully." };
  } catch (error) {
    console.error("Create social error:", error);
    return { success: false, message: "Failed to create social link." };
  }
}

// UPDATE
export async function updateSocial(
  id: number,
  data: { name: string; link?: string; desc?: string }
): Promise<SocialFormState> {
  try {
    await prisma.social.update({
      where: { id: BigInt(id) },
      data: {
        name: data.name,
        link: data.link || null,
        desc: data.desc || null,
      },
    });
    revalidatePath("/admin/socials");
    return { success: true, message: "Social link updated successfully." };
  } catch (error) {
    console.error("Update social error:", error);
    return { success: false, message: "Failed to update social link." };
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
    console.error("Delete social error:", error);
    return { success: false, message: "Failed to delete social link." };
  }
}
