"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";

interface RecentActivityProps {
  projects: Array<{
    id: number;
    name: string;
    desc: string | null;
    image: string | null;
    skills: string[];
  }>;
  messages: Array<{
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    isRead: boolean;
    createdAt: string | Date;
  }>;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ projects, messages }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Projects */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-none dark:bg-black">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Projects
          </h3>
          <Link
            href="/admin/projects"
            className="text-xs font-medium text-brand-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-neutral-900">
          {projects.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">No projects added yet.</p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-800 flex-shrink-0 bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
                    {proj.image ? (
                      <Image src={proj.image} alt={proj.name} fill className="object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">{proj.name[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
                      {proj.name}
                    </h5>
                    <p className="text-xs text-gray-400 truncate max-w-xs">
                      {proj.desc || "No description"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-end flex-shrink-0">
                  {proj.skills.slice(0, 2).map((sk, idx) => (
                    <Badge key={idx} color="light" size="sm">
                      {sk}
                    </Badge>
                  ))}
                  {proj.skills.length > 2 && (
                    <Badge color="light" size="sm">
                      +{proj.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-none dark:bg-black">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Contact Messages
          </h3>
          <Link
            href="/admin/messages"
            className="text-xs font-medium text-brand-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-neutral-900">
          {messages.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">No contact messages received yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && (
                      <span className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0" />
                    )}
                    <h5 className={`text-sm ${!msg.isRead ? "font-semibold text-gray-800 dark:text-white" : "font-medium text-gray-600 dark:text-gray-300"} truncate`}>
                      {msg.name}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {msg.subject || msg.message}
                  </p>
                </div>

                <Badge color={msg.isRead ? "light" : "warning"} size="sm">
                  {msg.isRead ? "Read" : "New"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
