import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Get the first user's full portfolio data for the public site
export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findFirst({
      include: {
        skills: { orderBy: { createdAt: "asc" } },
        experiences: { orderBy: { startDate: "desc" } },
        educations: { orderBy: { startDate: "desc" } },
        services: { orderBy: { createdAt: "asc" } },
        socials: { orderBy: { createdAt: "asc" } },
        testimonials: { orderBy: { createdAt: "desc" } },
        projects: {
          orderBy: { createdAt: "desc" },
          include: {
            projectSkills: { include: { skill: true } },
            projectImages: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "No portfolio found" }, { status: 404 });
    }

    const { password, ...safeUser } = user;

    return NextResponse.json({
      user: {
        ...safeUser,
        skills: user.skills.map((s) => ({ ...s, id: Number(s.id) })),
        experiences: user.experiences.map((e) => ({ ...e, id: Number(e.id) })),
        educations: user.educations.map((e) => ({ ...e, id: Number(e.id) })),
        services: user.services.map((s) => ({ ...s, id: Number(s.id) })),
        socials: user.socials.map((s) => ({ ...s, id: Number(s.id) })),
        testimonials: user.testimonials.map((t) => ({ ...t, id: Number(t.id) })),
        projects: user.projects.map((p) => ({
          id: Number(p.id),
          name: p.name,
          desc: p.desc,
          image: p.image,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          skills: p.projectSkills.map((ps) => ps.skill.name),
          images: p.projectImages.map((pi) => pi.image),
        })),
      },
    });
  } catch (error: any) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
