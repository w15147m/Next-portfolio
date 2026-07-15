import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Dashboard | Starter Template",
  description: "Clean starting dashboard template",
};

export default function Dashboard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
        Welcome to your Dashboard
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        This is a clean workspace starting point. You can customize it by adding components here.
      </p>
    </div>
  );
}
