"use client";

import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";
import { useSkills } from "../_lib/useSkills";
// import SocialFormModal from "./SocialFormModal";



export default function SocialsHeader({ userId }: useridInterface) {
  const { skills, isLoading, isError } = useSkills(userId);
   console.log('====================================');
   console.log(skills);
   console.log('====================================');
  return (
    <div className="flex items-center justify-between">
         <PageBreadcrumb pageTitle="Skills" />

      {/* <SocialFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Social
          </Button>
        }
      /> */}
    </div>
  );
}