import ComponentCard from "@/components/common/ComponentCard";

import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import SocialsTable from "./_components/SocialsTable/SocialsTable";
import SocialsHeader from "./_components/SocialsHeader";

export default async function SocialsPage() {
  const userId = await getCurrentUserId();

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