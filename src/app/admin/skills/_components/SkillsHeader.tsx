"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";
// import SocialFormModal from "./SocialFormModal";



export default function SocialsHeader({ userId }: useridInterface) {
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