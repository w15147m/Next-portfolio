"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import SkillsTableRow from "./SkillsTableRow";
import { Skill } from "@/app/admin/skills/_lib/schema";

interface SkillsTableBodyProps {
  userId: string;
  skills: Skill[];
  isError: Error | undefined;
}

export default function SkillsTableBody({ userId, skills, isError }: SkillsTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load skills. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (skills.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No skills added yet. Click &ldquo;Add Skill&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {skills.map((skill) => (
        <SkillsTableRow
          key={skill.id}
          skill={skill}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
