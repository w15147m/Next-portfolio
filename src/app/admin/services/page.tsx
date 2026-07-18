"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Services" />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
          Services Coming Soon
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is currently under development.
        </p>
      </div>
    </div>
  );
}
