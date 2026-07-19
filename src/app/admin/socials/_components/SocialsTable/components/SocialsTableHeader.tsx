import React from "react";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";

export default function SocialsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-200 dark:border-neutral-900 ">
        <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          Icon
        </TableCell>
        <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          Platform
        </TableCell>
        <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          Link
        </TableCell>
        <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          Description
        </TableCell>
        <TableCell isHeader className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
          Actions
        </TableCell>
      </TableRow>
    </TableHeader>
  );
}
