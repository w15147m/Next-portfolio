"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import SocialsTableRow from "./SkillsTableRow";
import { skill } from "@/app/admin/skills/_lib/schema";

interface SocialsTableBodyProps {
  userId: string;
  skills: skill[];
  isError: Error | undefined;
}

export default function SkillsTableBody({ userId, skills, isError }: SocialsTableBodyProps) {

  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load social links. Please try again.
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
            No skills links yet. Click &ldquo;Add Social&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {skills.map((skill) => (
        <SocialsTableRow
          key={skill.id}
          skill={skill}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}