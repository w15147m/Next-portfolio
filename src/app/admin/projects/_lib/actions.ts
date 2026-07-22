"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { projectSchema, ProjectFieldErrors, ProjectFormState } from "./schema";
import { getSession } from "@/lib/session";
import { commitImage, replaceImage, deleteImage } from "@/lib/image-service";

// CREATE
export async function createProject(
  userId: string,
  data: { name: string; desc?: string; image?: string; images?: string[]; skillIds?: number[] }
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

  const rawImages = parsed.data.images || (parsed.data.image ? [parsed.data.image] : []);
  
  // Commit all temp images to public/uploads/projects folder
  const committedImages = await Promise.all(
    rawImages.map((img) => commitImage(img, "projects"))
  );

  const mainImage = committedImages.length > 0 ? committedImages[0] : null;
  const secondaryImages = committedImages.length > 1 ? committedImages.slice(1) : [];

  try {
    const created = await prisma.project.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        desc: parsed.data.desc || null,
        image: mainImage,
        projectSkills: parsed.data.skillIds && parsed.data.skillIds.length > 0
          ? {
              create: parsed.data.skillIds.map((skillId) => ({
                skillId: BigInt(skillId),
              })),
            }
          : undefined,
        projectImages: secondaryImages.length > 0
          ? {
              create: secondaryImages.map((imgUrl) => ({
                image: imgUrl,
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
        projectImages: true,
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
        images: committedImages,
        skills,
        skillIds: skills.map((s) => s.id),
      },
    };
  } catch (error) {
    console.error("Create project DB error:", error);
    // Cleanup committed files if DB create failed
    await Promise.all(committedImages.map((img) => deleteImage(img)));
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateProject(
  id: number,
  data: { name: string; desc?: string; image?: string; images?: string[]; skillIds?: number[] }
): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.project.findUnique({
    where: { id: BigInt(id) },
    include: { projectImages: true },
  });
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

  const rawImages = parsed.data.images || (parsed.data.image ? [parsed.data.image] : []);

  // Commit any new temp images to public/uploads/projects
  const committedImages = await Promise.all(
    rawImages.map((img) => commitImage(img, "projects"))
  );

  const mainImage = committedImages.length > 0 ? committedImages[0] : null;
  const secondaryImages = committedImages.length > 1 ? committedImages.slice(1) : [];

  // Track old images to delete those no longer present in committedImages
  const oldMainImage = existing.image;
  const oldSecondaryImages = existing.projectImages.map((pi) => pi.image);
  const allOldImages = oldMainImage ? [oldMainImage, ...oldSecondaryImages] : oldSecondaryImages;

  const imagesToDelete = allOldImages.filter((img) => !committedImages.includes(img));

  try {
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing skill and image relations
      await tx.projectSkill.deleteMany({
        where: { projectId: BigInt(id) },
      });
      await tx.projectImage.deleteMany({
        where: { projectId: BigInt(id) },
      });

      // Update project & recreate relations
      return await tx.project.update({
        where: { id: BigInt(id) },
        data: {
          name: parsed.data.name,
          desc: parsed.data.desc || null,
          image: mainImage,
          projectSkills: parsed.data.skillIds && parsed.data.skillIds.length > 0
            ? {
                create: parsed.data.skillIds.map((skillId) => ({
                  skillId: BigInt(skillId),
                })),
              }
            : undefined,
          projectImages: secondaryImages.length > 0
            ? {
                create: secondaryImages.map((imgUrl) => ({
                  image: imgUrl,
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
          projectImages: true,
        },
      });
    });

    // Clean up removed image files from filesystem
    await Promise.all(imagesToDelete.map((img) => deleteImage(img)));

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
        images: committedImages,
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

  const existing = await prisma.project.findUnique({
    where: { id: BigInt(id) },
    include: { projectImages: true },
  });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or project not found." };
  }

  try {
    // Delete physical files
    if (existing.image) {
      await deleteImage(existing.image);
    }
    await Promise.all(existing.projectImages.map((pi) => deleteImage(pi.image)));

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
