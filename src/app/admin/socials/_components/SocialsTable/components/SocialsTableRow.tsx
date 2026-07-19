"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import SkillIcon from "@/components/ui/SkillIcon";
import SocialFormModal from "../../SocialFormModal";
import DeleteSocialModal from "../../DeleteSocialModal";
import type { Social, SocialFormState } from "../../../actions";

interface SocialsTableRowProps {
  social: Social;
  userId: string;
  onUpdated: (social: Social, result: SocialFormState) => void;
  onDeleted: (id: number, result: SocialFormState) => void;
}

export default function SocialsTableRow({ social, userId, onUpdated, onDeleted }: SocialsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4 ">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          <SkillIcon icon={social.name} size={50} />
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {social.name}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        {social.link ? (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline text-sm truncate max-w-xs block"
          >
            {social.link}
          </a>
        ) : (
          <Badge color="warning" size="sm">No URL</Badge>
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {social.desc || "—"}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <SocialFormModal
            userId={userId}
            social={social}
            onDone={onUpdated}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteSocialModal
            socialId={social.id}
            socialName={social.name}
            onDone={onDeleted}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}