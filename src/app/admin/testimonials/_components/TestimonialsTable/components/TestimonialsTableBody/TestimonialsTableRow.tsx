"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import SkillIcon from "@/components/ui/SkillIcon";
import TestimonialFormModal from "../../../TestimonialFormModal";
import DeleteTestimonialModal from "../../../DeleteTestimonialModal";
import type { Testimonial } from "../../../../_lib/schema";

interface TestimonialsTableRowProps {
  testimonial: Testimonial;
  userId: string;
}

export default function TestimonialsTableRow({ testimonial, userId }: TestimonialsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          <SkillIcon icon={testimonial.name} size={40} />
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {testimonial.name}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {testimonial.role || "—"}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {testimonial.company || "—"}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {testimonial.content}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <TestimonialFormModal
            userId={userId}
            testimonial={testimonial}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteTestimonialModal
            testimonialId={testimonial.id}
            testimonialName={testimonial.name}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
