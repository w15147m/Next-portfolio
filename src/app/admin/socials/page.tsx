"use client";

import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import SocialsHeader from "./_components/SocialsTable/components/SocialsHeader";

import { authClient } from "@/lib/auth-client";
import CustomToaster from "@/components/common/CustomToaster";
import SocialsTable from "./_components/SocialsTable/SocialsTable";

export default function SocialsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const userId = session?.user?.id;

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

      <SocialsHeader userId={userId} />

      <ComponentCard title={null}>
        <SocialsTable userId={userId} />
      </ComponentCard>
    </div>
  );
}