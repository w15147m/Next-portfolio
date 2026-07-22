"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { skillSchema, SkillFieldErrors, SkillFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createSkill(
  userId: string,
  data: { name: string; proficiency?: string; desc?: string }
): Promise<SkillFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as SkillFieldErrors,
    };
  }

  try {
    const created = await prisma.skill.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        proficiency: parsed.data.proficiency || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/skills");
    return {
      success: true,
      message: "Skill created successfully.",
      data: { ...created, id: Number(created.id) },
    };
  } catch (error) {
    console.error("Create skill DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateSkill(
  id: number,
  data: { name: string; proficiency?: string; desc?: string }
): Promise<SkillFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.skill.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or skill not found." };
  }

  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as SkillFieldErrors,
    };
  }

  try {
    const updated = await prisma.skill.update({
      where: { id: BigInt(id) },
      data: {
        name: parsed.data.name,
        proficiency: parsed.data.proficiency || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/skills");
    return {
      success: true,
      message: "Skill updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
  } catch (error) {
    console.error("Update skill DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteSkill(id: number): Promise<SkillFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.skill.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or skill not found." };
  }

  try {
    await prisma.skill.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/skills");
    return { success: true, message: "Skill deleted." };
  } catch (error) {
    console.error("Delete skill DB error:", error);
    return { success: false, message: "Failed to delete skill." };
  }
}