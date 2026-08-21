"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import EducationsTableRow from "./EducationsTableRow";
import { Education } from "@/app/admin/educations/_lib/schema";

interface EducationsTableBodyProps {
  userId: string;
  educations: Education[];
  isError: Error | undefined;
}

export default function EducationsTableBody({ userId, educations, isError }: EducationsTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load education records. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (educations.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No education records added yet. Click &ldquo;Add Education&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {educations.map((education) => (
        <EducationsTableRow
          key={education.id}
          education={education}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
