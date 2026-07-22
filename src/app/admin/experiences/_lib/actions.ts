"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { experienceSchema, ExperienceFieldErrors, ExperienceFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createExperience(
  userId: string,
  data: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    desc?: string;
    image?: string;
  }
): Promise<ExperienceFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = experienceSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ExperienceFieldErrors,
    };
  }

  try {
    const created = await prisma.experience.create({
      data: {
        userId: userId,
        company: parsed.data.company,
        position: parsed.data.position,
        startDate: new Date(parsed.data.startDate),
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        desc: parsed.data.desc || null,
        image: parsed.data.image || null,
      },
    });
    revalidatePath("/admin/experiences");
    return {
      success: true,
      message: "Experience record created successfully.",
      data: { ...created, id: Number(created.id) },
    };
  } catch (error) {
    console.error("Create experience DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateExperience(
  id: number,
  data: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    desc?: string;
    image?: string;
  }
): Promise<ExperienceFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.experience.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or experience record not found." };
  }

  const parsed = experienceSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ExperienceFieldErrors,
    };
  }

  try {
    const updated = await prisma.experience.update({
      where: { id: BigInt(id) },
      data: {
        company: parsed.data.company,
        position: parsed.data.position,
        startDate: new Date(parsed.data.startDate),
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        desc: parsed.data.desc || null,
        image: parsed.data.image || null,
      },
    });
    revalidatePath("/admin/experiences");
    return {
      success: true,
      message: "Experience record updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
  } catch (error) {
    console.error("Update experience DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteExperience(id: number): Promise<ExperienceFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.experience.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or experience record not found." };
  }

  try {
    await prisma.experience.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/experiences");
    return { success: true, message: "Experience record deleted." };
  } catch (error) {
    console.error("Delete experience DB error:", error);
    return { success: false, message: "Failed to delete experience record." };
  }
}
