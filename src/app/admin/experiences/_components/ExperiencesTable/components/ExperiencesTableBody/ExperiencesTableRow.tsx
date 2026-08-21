"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import SkillIcon from "@/components/ui/SkillIcon";
import Image from "next/image";
import ExperienceFormModal from "../../../ExperienceFormModal";
import DeleteExperienceModal from "../../../DeleteExperienceModal";
import type { Experience } from "../../../../_lib/schema";

interface ExperiencesTableRowProps {
  experience: Experience;
  userId: string;
}

const formatDateStr = (dateVal: Date | string | null | undefined) => {
  if (!dateVal) return "Present";
  const d = new Date(dateVal);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export default function ExperiencesTableRow({ experience, userId }: ExperiencesTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          {experience.image ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-800">
              <Image
                src={experience.image}
                alt={experience.company}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <SkillIcon icon={experience.company} size={40} />
          )}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {experience.company}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {experience.position}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {formatDateStr(experience.startDate)} - {formatDateStr(experience.endDate)}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {experience.desc || "—"}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <ExperienceFormModal
            userId={userId}
            experience={experience}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteExperienceModal
            experienceId={experience.id}
            companyName={experience.company}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
