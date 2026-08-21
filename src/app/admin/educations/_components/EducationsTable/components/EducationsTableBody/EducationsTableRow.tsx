"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import EducationFormModal from "../../../EducationFormModal";
import DeleteEducationModal from "../../../DeleteEducationModal";
import type { Education } from "../../../../_lib/schema";

interface EducationsTableRowProps {
  education: Education;
  userId: string;
}

const formatDateStr = (dateVal: Date | string | null | undefined) => {
  if (!dateVal) return "Present";
  const d = new Date(dateVal);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export default function EducationsTableRow({ education, userId }: EducationsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          {education.id}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {education.institution}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {education.degree}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {education.fieldOfStudy || "—"}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {formatDateStr(education.startDate)} - {formatDateStr(education.endDate)}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {education.desc || "—"}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <EducationFormModal
            userId={userId}
            education={education}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteEducationModal
            educationId={education.id}
            institutionName={education.institution}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
