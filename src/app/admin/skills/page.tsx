import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getCurrentUserId } from "@/lib/session";
import SocialsHeader from "./_components/SkillsHeader";
import ComponentCard from "@/components/common/ComponentCard";
import SkillsTableHeader from "./_components/SocialsTable/SkillsTable";

export default async function SkillsPage() {
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
      <SocialsHeader userId={userId}/>
      <ComponentCard title={null}>
        <SkillsTableHeader userId={userId} />
      </ComponentCard>
    </div>
  );
}
