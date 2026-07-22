"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import ExperienceFormModal from "./ExperienceFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function ExperiencesHeader({ userId }: useridInterface) {
  return (
    <div className="flex items-center justify-between">
      <PageBreadcrumb pageTitle="Experiences" />

      <ExperienceFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Experience
          </Button>
        }
      />
    </div>
  );
}
