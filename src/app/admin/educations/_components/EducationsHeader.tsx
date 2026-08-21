"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import EducationFormModal from "./EducationFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function EducationsHeader({ userId }: useridInterface) {
  return (
    <div className="px-8 flex items-center justify-between">
      <PageBreadcrumb pageTitle="Educations" />

      <EducationFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Education
          </Button>
        }
      />
    </div>
  );
}
