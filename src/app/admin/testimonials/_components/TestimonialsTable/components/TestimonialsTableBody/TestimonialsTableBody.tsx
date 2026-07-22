"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import TestimonialsTableRow from "./TestimonialsTableRow";
import { Testimonial } from "@/app/admin/testimonials/_lib/schema";

interface TestimonialsTableBodyProps {
  userId: string;
  testimonials: Testimonial[];
  isError: Error | undefined;
}

export default function TestimonialsTableBody({ userId, testimonials, isError }: TestimonialsTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load testimonials. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (testimonials.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No testimonials added yet. Click &ldquo;Add Testimonial&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {testimonials.map((testimonial) => (
        <TestimonialsTableRow
          key={testimonial.id}
          testimonial={testimonial}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
