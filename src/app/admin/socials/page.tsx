import ComponentCard from "@/components/common/ComponentCard";
import SocialsHeader from "./_components/SocialsTable/components/SocialsHeader";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CustomToaster from "@/components/common/CustomToaster";
import SocialsTable from "./_components/SocialsTable/SocialsTable";

export default async function SocialsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-10 text-center text-error-500">
        Unauthorized. Please sign in.
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <CustomToaster />
      <SocialsHeader userId={userId} />
      <ComponentCard title={null}>
        <SocialsTable userId={userId} />
      </ComponentCard>
    </div>
  );
}