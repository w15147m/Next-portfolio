import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        projectSkills: {
          include: {
            skill: true,
          },
        },
        projectImages: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const serialized = projects.map((p) => {
      const skills = p.projectSkills.map((ps) => ({
        id: Number(ps.skill.id),
        name: ps.skill.name,
      }));

      // Combine main image and projectImages into single images array
      const additionalImages = p.projectImages.map((pi) => pi.image);
      const allImages = p.image ? [p.image, ...additionalImages] : additionalImages;

      return {
        id: Number(p.id),
        userId: p.userId,
        name: p.name,
        desc: p.desc,
        image: p.image,
        images: allImages,
        skills,
        skillIds: skills.map((s) => s.id),
      };
    });

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("Get projects error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}
