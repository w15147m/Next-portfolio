import type { PortfolioUser } from "@/components/portfolio/types";

/**
 * Fetches the portfolio user data on the SERVER (during rendering, not in
 * the browser). This is what makes the page SEO-friendly: the HTML that
 * gets sent to crawlers already contains the name, skills, projects, etc.,
 * instead of an empty shell that fills in after a client-side fetch.
 *
 * Pick ONE of the two options below depending on how your project is set up.
 */

// ── Option A (recommended): query your database directly ──────────────────
// If you already have a Prisma client (or similar) available on the server,
// call it directly here instead of going through your own API route.
// This avoids an unnecessary network hop and is the fastest option.
//
// import { prisma } from "@/lib/prisma";
//
// export async function getPortfolioData(userId: string): Promise<PortfolioUser | null> {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     include: {
//       skills: true,
//       experiences: true,
//       educations: true,
//       services: true,
//       socials: true,
//       testimonials: true,
//       projects: true,
//     },
//   });
//   return user as unknown as PortfolioUser | null;
// }

// ── Option B: reuse your existing /api/portfolio route ─────────────────────
// Use this if you'd rather keep your current API route as the single source
// of truth. `cache: "no-store"` ensures fresh data on every request; swap to
// `next: { revalidate: 3600 }` if you want ISR-style caching instead.
export async function getPortfolioData(): Promise<PortfolioUser | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/portfolio`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user as PortfolioUser;
}
