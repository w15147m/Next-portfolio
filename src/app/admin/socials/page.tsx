"use client";

import React, { useCallback, useEffect, useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import ComponentCard from "@/components/common/ComponentCard";
import SocialsHeader from "./_components/SocialsTable/components/SocialsHeader";

import { authClient } from "@/lib/auth-client";
import { apiService } from "@/lib/api-service";
import type { Social, SocialFormState } from "./actions";
import CustomToaster, { showToast }  from "@/components/common/CustomToaster";
import SocialsTable from "./_components/SocialsTable/SocialsTable";
import {ToastState, type ToastType } from "@/lib/types/types";



export default function SocialsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userId = session?.user?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [socials, setSocials] = useState<Social[]>([]);
  const [error, setError] = useState<string | null>(null);

const fetchSocials = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {  const data = await apiService.fetchData<Social[]>(`/api/socials?userId=${userId}`);
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
      fetchSocials();
    }
  }, [userId, fetchSocials]);

  // --- Local state patches (no network round-trip / no full re-render of unrelated rows) ---

  const handleCreated = useCallback((social: Social, result: SocialFormState) => {
    setSocials((prev) => [social, ...prev]);
    showToast(result.message, "success");
  
  }, [showToast]);

  const handleUpdated = useCallback((social: Social, result: SocialFormState) => {
    setSocials((prev) => prev.map((s) => (s.id === social.id ? social : s)));
    showToast(result.message, "success");
  }, [showToast]);

  const handleDeleted = useCallback((id: number, result: SocialFormState) => {
    setSocials((prev) => prev.filter((s) => s.id !== id));
    showToast(result.message, "success");
  }, [showToast]);

  if (sessionLoading) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Loading session...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-10 text-center text-error-500">
        Unauthorized. Please sign in.
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 sm:p-6">
      {/* Exactly one CustomToaster (and therefore one <Toaster/>) in the
          whole tree — mounting it more than once duplicates every toast,
          since react-hot-toast's queue is global. */}
     <CustomToaster />

      <SocialsHeader userId={userId} onCreated={handleCreated} />

      {/* Persistent error banner (separate from the transient toast above) —
          this stays visible until a retry succeeds, so the user has a way
          to act on it even after the toast disappears. */}
      {error && (
        <Alert variant="error" title="Error" message={error} />
      )}

      <ComponentCard title={null}>
        <SocialsTable
          socials={socials}
          isLoading={isLoading}
          userId={userId}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />
      </ComponentCard>
    </div>
  );
}