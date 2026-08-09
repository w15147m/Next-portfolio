"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import SocialFormModal from "./SocialFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";



export default function SocialsHeader({ userId }: useridInterface) {
  return (
    <div className="px-8 flex items-center justify-between">

      <PageBreadcrumb pageTitle="Socials" />

      <SocialFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Social
          </Button>
        }
      />
    </div>
  );
}