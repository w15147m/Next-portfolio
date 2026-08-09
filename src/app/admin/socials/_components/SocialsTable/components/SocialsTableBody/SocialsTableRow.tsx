"use client";

import { Pencil } from "lucide-react";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import SkillIcon from "@/components/ui/SkillIcon";
import SocialFormModal from "../../../SocialFormModal";
import DeleteSocialModal from "../../../DeleteSocialModal";
import type { Social } from "../../../../_lib/schema";

interface SocialsTableRowProps {
  social: Social;
  userId: string;
}

export default function SocialsTableRow({ social, userId }: SocialsTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
            trigger={
              <Button size="sm" variant="outline" className="px-2">
                <Pencil className="w-4 h-4" />
              </Button>
            }
          />
          <DeleteSocialModal
            socialId={social.id}
            socialName={social.name}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}