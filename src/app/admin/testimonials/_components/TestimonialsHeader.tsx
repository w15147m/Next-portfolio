"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import TestimonialFormModal from "./TestimonialFormModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useridInterface } from "@/lib/schema/common";

export default function TestimonialsHeader({ userId }: useridInterface) {
  return (
    <div className="flex items-center justify-between">
      <PageBreadcrumb pageTitle="Testimonials" />

      <TestimonialFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Testimonial
          </Button>
        }
      />
    </div>
  );
}
