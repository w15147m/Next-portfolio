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
    <div className="space-y-6 px-8 pt-4">
      {/* Welcome Banner */}


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
