"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import ServiceFormModal from "./ServiceFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function ServicesHeader({ userId }: useridInterface) {
  return (
    <div className="flex items-center justify-between">
      <PageBreadcrumb pageTitle="Services" />

      <ServiceFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Service
          </Button>
        }
      />
    </div>
  );
}
