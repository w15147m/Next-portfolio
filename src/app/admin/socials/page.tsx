"use client";

import React, { useCallback, useEffect, useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import ComponentCard from "@/components/common/ComponentCard";
import SocialsHeader from "./_components/SocialsTable/components/SocialsHeader";

import { authClient } from "@/lib/auth-client";
import { apiService } from "@/lib/api-service";
import type { Social, SocialFormState } from "./actions";
import CustomToaster, { type ToastType } from "@/components/common/CustomToaster";
import SocialsTable from "./_components/SocialsTable/SocialsTable";

type ToastState = {
  message: string;
  type: ToastType;
  // Incrementing key so CustomToaster re-fires even when two consecutive
  // actions produce the exact same message (e.g. deleting two items in a
  // row both say "Social link deleted.").
  key: number;
};

export default function SocialsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userId = session?.user?.id;

  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ message: "", type: "default", key: 0 });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToastState((prev) => ({ message, type, key: prev.key + 1 }));
  }, []);

  // Only used for the initial load and manual "retry after error" — NOT
  // called after create/update/delete anymore.
  const fetchSocials = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      // apiService.fetchData attaches the auth headers and already handles
      // 401/403 (session cleanup + redirect) and 451 (toast) globally, so
      // we only need to handle the "show a persistent banner" case here.
      const data = await apiService.fetchData<Social[]>(`/api/socials?userId=${userId}`);
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
      <CustomToaster
        message={toastState.message}
        type={toastState.type}
        trigger={toastState.key}
      />

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