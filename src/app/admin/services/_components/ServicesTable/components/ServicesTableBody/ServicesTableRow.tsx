"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import SkillIcon from "@/components/ui/SkillIcon";
import ServiceFormModal from "../../../ServiceFormModal";
import DeleteServiceModal from "../../../DeleteServiceModal";
import type { Service } from "../../../../_lib/schema";

interface ServicesTableRowProps {
  service: Service;
  userId: string;
}

export default function ServicesTableRow({ service, userId }: ServicesTableRowProps) {
  return (
    <TableRow className="border-b border-gray-100 dark:border-neutral-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <TableCell className="px-4">
        <span className="font-medium text-gray-800 dark:text-white/90 flex items-center">
          <SkillIcon icon={service.name} size={40} />
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        <span className="font-medium text-gray-800 dark:text-white/90">
          {service.name}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3">
        {service.link ? (
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline text-sm truncate max-w-xs block"
          >
            {service.link}
          </a>
        ) : (
          <Badge color="warning" size="sm">No URL</Badge>
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {service.desc || "—"}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <ServiceFormModal
            userId={userId}
            service={service}
            trigger={
              <Button size="sm" variant="outline">
                Edit
              </Button>
            }
          />
          <DeleteServiceModal
            serviceId={service.id}
            serviceName={service.name}
            userId={userId}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
