import ComponentCard from "@/components/common/ComponentCard";
import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import ServicesHeader from "./_components/ServicesHeader";
import ServicesTable from "./_components/ServicesTable/ServicesTable";

export default async function ServicesPage() {
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
      <ServicesHeader userId={userId} />
      <ComponentCard title={null}>
        <ServicesTable userId={userId} />
      </ComponentCard>
    </div>
  );
}
