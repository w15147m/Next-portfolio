"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import ServicesTableRow from "./ServicesTableRow";
import { Service } from "@/app/admin/services/_lib/schema";

interface ServicesTableBodyProps {
  userId: string;
  services: Service[];
  isError: Error | undefined;
}

export default function ServicesTableBody({ userId, services, isError }: ServicesTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load services. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (services.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No services added yet. Click &ldquo;Add Service&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {services.map((service) => (
        <ServicesTableRow
          key={service.id}
          service={service}
          userId={userId}
        />
      ))}
    </TableBody>
  );
}
