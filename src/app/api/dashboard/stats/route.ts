import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const [
      skillsCount,
      projectsCount,
      experiencesCount,
      messagesCount,
      unreadMessagesCount,
      recentProjects,
      recentMessages,
    ] = await Promise.all([
      prisma.skill.count(userId ? { where: { userId } } : undefined),
      prisma.project.count(userId ? { where: { userId } } : undefined),
      prisma.experience.count(userId ? { where: { userId } } : undefined),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.project.findMany({
        ...(userId ? { where: { userId } } : {}),
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          projectSkills: {
            include: { skill: true },
          },
        },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const serializedProjects = recentProjects.map((p) => ({
      id: Number(p.id),
      name: p.name,
      desc: p.desc,
      image: p.image,
      skills: p.projectSkills.map((ps) => ps.skill.name),
      createdAt: p.createdAt,
    }));

    const serializedMessages = recentMessages.map((m) => ({
      id: Number(m.id),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      isRead: m.isRead,
      createdAt: m.createdAt,
    }));

    return NextResponse.json({
      counts: {
        skills: skillsCount,
        projects: projectsCount,
        experiences: experiencesCount,
        messages: messagesCount,
        unreadMessages: unreadMessagesCount,
      },
      recentProjects: serializedProjects,
      recentMessages: serializedMessages,
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
