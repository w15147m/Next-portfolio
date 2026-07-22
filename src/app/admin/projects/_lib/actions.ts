"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { projectSchema, ProjectFieldErrors, ProjectFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createProject(
  userId: string,
  data: { name: string; desc?: string; image?: string; skillIds?: number[] }
): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ProjectFieldErrors,
    };
  }

  try {
    const created = await prisma.project.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        desc: parsed.data.desc || null,
        image: parsed.data.image || null,
        projectSkills: parsed.data.skillIds && parsed.data.skillIds.length > 0
          ? {
              create: parsed.data.skillIds.map((skillId) => ({
                skillId: BigInt(skillId),
              })),
            }
          : undefined,
      },
      include: {
        projectSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    revalidatePath("/admin/projects");
    const skills = created.projectSkills.map((ps) => ({
      id: Number(ps.skill.id),
      name: ps.skill.name,
    }));

    return {
      success: true,
      message: "Project created successfully.",
      data: {
        ...created,
        id: Number(created.id),
        skills,
        skillIds: skills.map((s) => s.id),
      },
    };
  } catch (error) {
    console.error("Create project DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateProject(
  id: number,
  data: { name: string; desc?: string; image?: string; skillIds?: number[] }
): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.project.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or project not found." };
  }

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ProjectFieldErrors,
    };
  }

  try {
    // Transaction to update project and sync projectSkills pivot entries
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing links
      await tx.projectSkill.deleteMany({
        where: { projectId: BigInt(id) },
      });

      // Update project & recreate links
      return await tx.project.update({
        where: { id: BigInt(id) },
        data: {
          name: parsed.data.name,
          desc: parsed.data.desc || null,
          image: parsed.data.image || null,
          projectSkills: parsed.data.skillIds && parsed.data.skillIds.length > 0
            ? {
                create: parsed.data.skillIds.map((skillId) => ({
                  skillId: BigInt(skillId),
                })),
              }
            : undefined,
        },
        include: {
          projectSkills: {
            include: {
              skill: true,
            },
          },
        },
      });
    });

    revalidatePath("/admin/projects");
    const skills = updated.projectSkills.map((ps) => ({
      id: Number(ps.skill.id),
      name: ps.skill.name,
    }));

    return {
      success: true,
      message: "Project updated successfully.",
      data: {
        ...updated,
        id: Number(updated.id),
        skills,
        skillIds: skills.map((s) => s.id),
      },
    };
  } catch (error) {
    console.error("Update project DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteProject(id: number): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.project.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or project not found." };
  }

  try {
    await prisma.project.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/projects");
    return { success: true, message: "Project deleted." };
  } catch (error) {
    console.error("Delete project DB error:", error);
    return { success: false, message: "Failed to delete project." };
  }
}
