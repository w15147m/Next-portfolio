"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import SkillIcon from "@/components/ui/SkillIcon";
import { skill } from "@/app/admin/skills/_lib/schema";
// import SocialFormModal from "../../../SocialFormModal";
// import DeleteSocialModal from "../../../DeleteSocialModal";
// import type { Social } from "../../../../_lib/schema";

interface SocialsTableRowProps {
  skill: skill;
  userId: string;
}

export default function SkillsTableRow({ skill, userId }: SocialsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4 ">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          <SkillIcon icon={skill.name} size={50} />
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {skill.name}
        </span>
      </TableCell>
          <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {skill.proficiency}
        </span>
      </TableCell>
    
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {skill.desc || "—"}
      </TableCell>
      {/* <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <SocialFormModal
            userId={userId}
            social={social}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteSocialModal
            socialId={skill.id}
            socialName={skill.name}
            userId={userId}
          />
        </div>
      </TableCell> */}
    </TableRow>
  );
}