import ComponentCard from "@/components/common/ComponentCard";
import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import ExperiencesHeader from "./_components/ExperiencesHeader";
import ExperiencesTable from "./_components/ExperiencesTable/ExperiencesTable";

export default async function ExperiencesPage() {
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
      <ExperiencesHeader userId={userId} />
      <ComponentCard title={null}>
        <ExperiencesTable userId={userId} />
      </ComponentCard>
    </div>
  );
}
