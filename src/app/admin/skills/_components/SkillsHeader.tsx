"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import SkillFormModal from "./SkillFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function SkillsHeader({ userId }: useridInterface) {
  return (
    <div className="flex items-center justify-between">
      <PageBreadcrumb pageTitle="Skills" />

      <SkillFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Skill
          </Button>
        }
      />
    </div>
  );
}