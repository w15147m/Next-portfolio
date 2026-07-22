"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import SkillIcon from "@/components/ui/SkillIcon";
import Image from "next/image";
import ProjectFormModal from "../../../ProjectFormModal";
import DeleteProjectModal from "../../../DeleteProjectModal";
import type { Project } from "../../../../_lib/schema";

interface ProjectsTableRowProps {
  project: Project;
  userId: string;
}

export default function ProjectsTableRow({ project, userId }: ProjectsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          {project.image ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-800">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <SkillIcon icon={project.name} size={40} />
          )}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {project.name}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {project.desc || "—"}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <ProjectFormModal
            userId={userId}
            project={project}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteProjectModal
            projectId={project.id}
            projectName={project.name}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
