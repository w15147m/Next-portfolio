"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { serviceSchema, ServiceFieldErrors, ServiceFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createService(
  userId: string,
  data: { name: string; link?: string; desc?: string }
): Promise<ServiceFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ServiceFieldErrors,
    };
  }

  try {
    const created = await prisma.service.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/services");
    return {
      success: true,
      message: "Service created successfully.",
      data: { ...created, id: Number(created.id) },
    };
  } catch (error) {
    console.error("Create service DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateService(
  id: number,
  data: { name: string; link?: string; desc?: string }
): Promise<ServiceFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.service.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or service not found." };
  }

  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as ServiceFieldErrors,
    };
  }

  try {
    const updated = await prisma.service.update({
      where: { id: BigInt(id) },
      data: {
        name: parsed.data.name,
        link: parsed.data.link || null,
        desc: parsed.data.desc || null,
      },
    });
    revalidatePath("/admin/services");
    return {
      success: true,
      message: "Service updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
  } catch (error) {
    console.error("Update service DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteService(id: number): Promise<ServiceFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.service.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or service not found." };
  }

  try {
    await prisma.service.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/services");
    return { success: true, message: "Service deleted." };
  } catch (error) {
    console.error("Delete service DB error:", error);
    return { success: false, message: "Failed to delete service." };
  }
}
