import type { Metadata } from "next";
import React from "react";
import { getCurrentUserId } from "@/lib/session";
import { DashboardMetrics } from "./_components/DashboardMetrics";
import ActivityChart from "./_components/ActivityChart";
import { RecentActivity } from "./_components/RecentActivity";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio Management",
  description: "Overview of your portfolio statistics, projects, skills, and messages.",
};

async function getDashboardData(userId: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/dashboard/stats?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch dashboard data error:", error);
    return null;
  }
}

export default async function Dashboard() {
  const userId = await getCurrentUserId();
  const data = userId ? await getDashboardData(userId) : null;

  const counts = data?.counts || {
    skills: 0,
    projects: 0,
    experiences: 0,
    messages: 0,
    unreadMessages: 0,
  };

  const recentProjects = data?.recentProjects || [];
  const recentMessages = data?.recentMessages || [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-neutral-900 dark:bg-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Welcome back to your Portfolio Admin!
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here&apos;s a quick snapshot of your live portfolio stats, content metrics, and contact messages.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <DashboardMetrics counts={counts} />

      {/* Analytics Chart */}
      <ActivityChart
        skillsCount={counts.skills}
        projectsCount={counts.projects}
        experiencesCount={counts.experiences}
        messagesCount={counts.messages}
      />

      {/* Recent Projects and Messages Tables */}
      <RecentActivity projects={recentProjects} messages={recentMessages} />
    </div>
  );
}
