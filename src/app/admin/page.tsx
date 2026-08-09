import type { Metadata } from "next";
import React from "react";
import { getSession } from "@/lib/session";
import HeroBanner from "./_components/HeroBanner";
import DashboardOverviewWidget from "./_components/DashboardOverviewWidget";
import ActivityTimelineWidget from "./_components/ActivityTimelineWidget";
import RecentProjectsGrid from "./_components/RecentProjectsGrid";
import TopSkillsWidget from "./_components/TopSkillsWidget";
import ExperienceTimelineWidget from "./_components/ExperienceTimelineWidget";
import RecentMessagesList from "./_components/RecentMessagesList";
import GithubActivityWidget from "./_components/GithubActivityWidget";

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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12 w-full max-w-[1600px] mx-auto bg-gray-50 dark:bg-black min-h-screen">
      {/* Row 1: Hero Banner */}
      <div className="w-full">
        <HeroBanner userName={userName} userImage={userImage} />
      </div>

      {/* Bento Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        
        {/* Row 2 */}
        <div className="md:col-span-4 lg:col-span-8">
          <DashboardOverviewWidget counts={counts} />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <ActivityTimelineWidget />
        </div>

        {/* Row 3 */}
        <div className="md:col-span-6 lg:col-span-8">
          <RecentProjectsGrid projects={recentProjects} />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <TopSkillsWidget skills={recentSkills} />
        </div>

        {/* Row 4 */}
        <div className="md:col-span-3 lg:col-span-6">
          <ExperienceTimelineWidget experiences={recentExperiences} />
        </div>
        <div className="md:col-span-3 lg:col-span-6">
          <RecentMessagesList messages={recentMessages} />
        </div>
        
        {/* Row 5 */}
        <div className="md:col-span-6 lg:col-span-12">
          <GithubActivityWidget />
        </div>
        
      </div>
    </div>
  );
}
