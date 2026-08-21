import ComponentCard from "@/components/common/ComponentCard";
import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import EducationsHeader from "./_components/EducationsHeader";
import EducationsTable from "./_components/EducationsTable/EducationsTable";

export default async function EducationsPage() {
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
      <EducationsHeader userId={userId} />
      <ComponentCard title={null}>
        <EducationsTable userId={userId} />
      </ComponentCard>
    </div>
  );
}
