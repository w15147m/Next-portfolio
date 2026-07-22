"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { testimonialSchema, TestimonialFieldErrors, TestimonialFormState } from "./schema";
import { getSession } from "@/lib/session";

// CREATE
export async function createTestimonial(
  userId: string,
  data: { name: string; role?: string; company?: string; content: string; image?: string }
): Promise<TestimonialFormState> {
  const session = await getSession();
  if (!session?.user || session.user.id !== userId) {
    return { success: false, message: "Unauthorized action." };
  }
  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as TestimonialFieldErrors,
    };
  }

  try {
    const created = await prisma.testimonial.create({
      data: {
        userId: userId,
        name: parsed.data.name,
        role: parsed.data.role || null,
        company: parsed.data.company || null,
        content: parsed.data.content,
        image: parsed.data.image || null,
      },
    });
    revalidatePath("/admin/testimonials");
    return {
      success: true,
      message: "Testimonial created successfully.",
      data: { ...created, id: Number(created.id) },
    };
  } catch (error) {
    console.error("Create testimonial DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// UPDATE
export async function updateTestimonial(
  id: number,
  data: { name: string; role?: string; company?: string; content: string; image?: string }
): Promise<TestimonialFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.testimonial.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or testimonial not found." };
  }

  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as TestimonialFieldErrors,
    };
  }

  try {
    const updated = await prisma.testimonial.update({
      where: { id: BigInt(id) },
      data: {
        name: parsed.data.name,
        role: parsed.data.role || null,
        company: parsed.data.company || null,
        content: parsed.data.content,
        image: parsed.data.image || null,
      },
    });
    revalidatePath("/admin/testimonials");
    return {
      success: true,
      message: "Testimonial updated successfully.",
      data: { ...updated, id: Number(updated.id) },
    };
  } catch (error) {
    console.error("Update testimonial DB error:", error);
    return { success: false, message: "A database error occurred. Please try again." };
  }
}

// DELETE
export async function deleteTestimonial(id: number): Promise<TestimonialFormState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  const existing = await prisma.testimonial.findUnique({ where: { id: BigInt(id) } });
  if (!existing || existing.userId !== session.user.id) {
    return { success: false, message: "Unauthorized or testimonial not found." };
  }

  try {
    await prisma.testimonial.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/testimonials");
    return { success: true, message: "Testimonial deleted." };
  } catch (error) {
    console.error("Delete testimonial DB error:", error);
    return { success: false, message: "Failed to delete testimonial." };
  }
}
