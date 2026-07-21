"use client";

import  { useCallback, useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { authClient } from "@/lib/auth-client";
import { apiService } from "@/lib/api-service";
import { skill } from "./actions";
import { showToast } from "@/components/common/CustomToaster";
export default function SkillsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [socials, setSocials] = useState<skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchSkills = useCallback(async () => {
      if (!userId) return;
      setIsLoading(true);
      setError(null);
      // src/app/api/skills
      try {  const data = await apiService.fetchData<skill[]>(`/api/skills?userId=${userId}`);
        setSocials(data);
      } catch {
        const message = "Could not load social links. Please try again.";
        setError(message);
        showToast(message, "error");
      } finally {
        setIsLoading(false);
      }
    }, [userId, showToast]);
  
    useEffect(() => {
      if (userId) {
        fetchSkills();
      }
    }, [userId, fetchSkills]);
  
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Skills" />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-neutral-900 dark:bg-zinc-950">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
          Skills Coming Soon
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is currently under development.
        </p>
      </div>
    </div>
  );
}
