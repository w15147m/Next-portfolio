import React from "react";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";

export default function SocialsTableHeader() {
  const headerCellClass = "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400";
  const headerCellClassRight = "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400";

  return (
    <TableHeader>
      <TableRow className="border-b border-gray-200 dark:border-neutral-900 ">
        <TableCell isHeader className={headerCellClass}>
          Icon
        </TableCell>
        <TableCell isHeader className={headerCellClass}>
          Platform
        </TableCell>
        <TableCell isHeader className={headerCellClass}>
          Link
        </TableCell>
        <TableCell isHeader className={headerCellClass}>
          Description
        </TableCell>
        <TableCell isHeader className={headerCellClassRight}>
          Actions
        </TableCell>
      </TableRow>
    </TableHeader>
  );
}
