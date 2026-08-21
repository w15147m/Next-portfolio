"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import ExperiencesTableRow from "./ExperiencesTableRow";
import { Experience } from "@/app/admin/experiences/_lib/schema";

interface ExperiencesTableBodyProps {
  userId: string;
  experiences: Experience[];
  isError: Error | undefined;
}

export default function ExperiencesTableBody({ userId, experiences, isError }: ExperiencesTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load experience records. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (experiences.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No experience records added yet. Click &ldquo;Add Experience&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {experiences.map((experience) => (
        <ExperiencesTableRow
          key={experience.id}
          experience={experience}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
