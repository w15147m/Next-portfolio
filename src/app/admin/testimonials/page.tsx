import ComponentCard from "@/components/common/ComponentCard";
import { getCurrentUserId } from "@/lib/session";
import CustomToaster from "@/components/common/CustomToaster";
import TestimonialsHeader from "./_components/TestimonialsHeader";
import TestimonialsTable from "./_components/TestimonialsTable/TestimonialsTable";

export default async function TestimonialsPage() {
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
      <TestimonialsHeader userId={userId} />
      <ComponentCard title={null}>
        <TestimonialsTable userId={userId} />
      </ComponentCard>
    </div>
  );
}
