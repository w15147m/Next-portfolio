"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import TestimonialsTableHeader from "./components/TestimonialsTableHeader";
import TestimonialsTableBody from "./components/TestimonialsTableBody/TestimonialsTableBody";
import { useTestimonials } from "../../_lib/useTestimonials";
import Loading from "@/components/ui/loaders/Loading";

interface TestimonialsTableProps {
  userId: string;
}

export default function TestimonialsTable({ userId }: TestimonialsTableProps) {
  const { testimonials, isLoading, isError } = useTestimonials(userId);
  const headers = ["Avatar", "Name", "Role", "Company", "Content", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TestimonialsTableHeader headers={headers} />
            <TestimonialsTableBody userId={userId} testimonials={testimonials} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
