"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { educationSchema, EducationFieldErrors, EducationFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createEducation(
  userId: string,
  data: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    desc?: string;
  }
): Promise<EducationFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as EducationFieldErrors,
    };
  }

  try {
    const created = await prisma.education.create({
      data: {
        userId: userId,
        institution: parsed.data.institution,
        degree: parsed.data.degree,
        fieldOfStudy: parsed.data.fieldOfStudy || null,
        startDate: new Date(parsed.data.startDate),
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/educations");
    return {
      success: true,
      message: "Education record created successfully.",
      data: { ...created, id: Number(created.id) },
    };
  } catch (error) {
    console.error("Create education DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateEducation(
  id: number,
  data: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    desc?: string;
  }
): Promise<EducationFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.education.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or education record not found." };
  }

  const parsed = educationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as EducationFieldErrors,
    };
  }

  try {
    const updated = await prisma.education.update({
      where: { id: BigInt(id) },
      data: {
        institution: parsed.data.institution,
        degree: parsed.data.degree,
        fieldOfStudy: parsed.data.fieldOfStudy || null,
        startDate: new Date(parsed.data.startDate),
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/educations");
    return {
      success: true,
      message: "Education record updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
  } catch (error) {
    console.error("Update education DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteEducation(id: number): Promise<EducationFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.education.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or education record not found." };
  }

  try {
    await prisma.education.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/educations");
    return { success: true, message: "Education record deleted." };
  } catch (error) {
    console.error("Delete education DB error:", error);
    return { success: false, message: "Failed to delete education record." };
  }
}
