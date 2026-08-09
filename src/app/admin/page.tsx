import type { Metadata } from "next";
import React from "react";
import { getSession } from "@/lib/session";
import HeroBanner from "./_components/HeroBanner";
import RecentProjectsGrid from "./_components/RecentProjectsGrid";
import RecentMessagesList from "./_components/RecentMessagesList";
import TopSkillsWidget from "./_components/TopSkillsWidget";
import ExperienceTimelineWidget from "./_components/ExperienceTimelineWidget";

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
  const session = await getSession();
  const userId = session?.user?.id || null;
  const data = userId ? await getDashboardData(userId) : null;
  
  const userName = session?.user?.name || "Admin";
  const userImage = session?.user?.image || null;

  const counts = data?.counts || {
    skills: 0,
    projects: 0,
    experiences: 0,
    messages: 0,
    unreadMessages: 0,
  };

  const recentProjects = data?.recentProjects || [];
  const recentMessages = data?.recentMessages || [];
  const recentSkills = data?.recentSkills || [];
  const recentExperiences = data?.recentExperiences || [];

  return (
    <div className="space-y-8 px-4 sm:px-8 pt-6 pb-12 max-w-7xl mx-auto">
      {/* Hero Banner Section */}
      <HeroBanner userName={userName} userImage={userImage} counts={counts} />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Row 1: Projects (Span 2) + Skills (Span 1) */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-4 pl-1">
            <h3 className="text-xl font-bold text-white tracking-tight">Recent Projects</h3>
          </div>
          <div className="flex-1">
            <RecentProjectsGrid projects={recentProjects} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <TopSkillsWidget skills={recentSkills} />
        </div>

        {/* Row 2: Experience (Span 1) + Messages (Span 2) */}
        <div className="lg:col-span-1">
          <ExperienceTimelineWidget experiences={recentExperiences} />
        </div>

        <div className="lg:col-span-2">
          <RecentMessagesList messages={recentMessages} />
        </div>
        
      </div>
    </div>
  );
}
