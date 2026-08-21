import ComponentCard from "@/components/common/ComponentCard";
import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import MessagesHeader from "./_components/MessagesHeader";
import MessagesTable from "./_components/MessagesTable/MessagesTable";

export default async function MessagesPage() {
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
      <MessagesHeader />
      <ComponentCard title={null}>
        <MessagesTable />
      </ComponentCard>
    </div>
  );
}
