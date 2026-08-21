"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { MessageActionState } from "./schema";

export async function markMessageAsRead(id: number): Promise<MessageActionState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  try {
    await prisma.contactMessage.update({
      where: { id: BigInt(id) },
      data: { isRead: true },
    });
    revalidatePath("/admin/messages");
    return { success: true, message: "Message marked as read." };
  } catch (error) {
    console.error("Mark message as read error:", error);
    return { success: false, message: "Failed to update message." };
  }
}

export async function deleteMessage(id: number): Promise<MessageActionState> {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, message: "Unauthorized action." };
  }

  try {
    await prisma.contactMessage.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/messages");
    return { success: true, message: "Message deleted." };
  } catch (error) {
    console.error("Delete message error:", error);
    return { success: false, message: "Failed to delete message." };
  }
}
