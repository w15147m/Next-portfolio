"use client";

import React from "react";
import Badge from "@/components/ui/badge/Badge";
import Link from "next/link";
import { ArrowUpIcon } from "@/icons";

interface DashboardMetricsProps {
  counts: {
    skills: number;
    projects: number;
    experiences: number;
    messages: number;
    unreadMessages: number;
  };
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ counts }) => {
  const metrics = [
    {
      title: "Projects",
      value: counts.projects,
      link: "/admin/projects",
      tag: "Active",
      tagColor: "success" as const,
      icon: (
        <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Skills",
      value: counts.skills,
      link: "/admin/skills",
      tag: "Verified",
      tagColor: "success" as const,
      icon: (
        <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Experience",
      value: counts.experiences,
      link: "/admin/experiences",
      tag: "Career",
      tagColor: "info" as const,
      icon: (
        <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Messages",
      value: counts.messages,
      subText: counts.unreadMessages > 0 ? `${counts.unreadMessages} unread` : "All read",
      link: "/admin/messages",
      tag: counts.unreadMessages > 0 ? `${counts.unreadMessages} New` : "Inbox",
      tagColor: counts.unreadMessages > 0 ? ("warning" as const) : ("light" as const),
      icon: (
        <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {metrics.map((item, idx) => (
        <Link key={idx} href={item.link} className="group block">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-none dark:bg-black transition-all hover:border-brand-500 dark:hover:border-brand-500 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/10">
                {item.icon}
              </div>
              <Badge color={item.tagColor} size="sm">
                {item.tag}
              </Badge>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.title}
                </span>
                <h4 className="mt-1 font-bold text-gray-800 text-2xl dark:text-white/90">
                  {item.value}
                </h4>
              </div>
              <span className="text-xs text-brand-500 font-medium group-hover:underline flex items-center gap-1">
                Manage
                <ArrowUpIcon className="rotate-45 size-3.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
