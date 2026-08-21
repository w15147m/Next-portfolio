"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import ProjectFormModal from "./ProjectFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function ProjectsHeader({ userId }: useridInterface) {
  return (
    <div className="px-8 flex items-center justify-between">
      <PageBreadcrumb pageTitle="Projects" />

      <ProjectFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Project
          </Button>
        }
      />
    </div>
  );
}
