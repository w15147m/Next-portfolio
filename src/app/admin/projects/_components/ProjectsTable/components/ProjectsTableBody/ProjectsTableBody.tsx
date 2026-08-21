"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import ProjectsTableRow from "./ProjectsTableRow";
import { Project } from "@/app/admin/projects/_lib/schema";

interface ProjectsTableBodyProps {
  userId: string;
  projects: Project[];
  isError: Error | undefined;
}

export default function ProjectsTableBody({ userId, projects, isError }: ProjectsTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load projects. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (projects.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No projects added yet. Click &ldquo;Add Project&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {projects.map((project) => (
        <ProjectsTableRow
          key={project.id}
          project={project}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
