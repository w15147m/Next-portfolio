"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function MessagesHeader() {
  return (
    <div className="px-8 flex items-center justify-between">
      <PageBreadcrumb pageTitle="Messages" />
    </div>
  );
}
